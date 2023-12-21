/* eslint-disable object-curly-newline */

import _ from 'lodash';

const isObject = (item) => (
  _.isObject(item) && !Array.isArray(item) && item !== null
);

export const getDiffItem = (key, value, depth, diffChar) => (
  { key, value, depth, diffChar }
);

const getObjectValue = (node, depth) => {
  if (isObject(node)) {
    return Object.entries(node).reduce((acc, [key, value]) => (
      [...acc, getDiffItem(key, getObjectValue(value, depth + 1), depth, '')]
    ), []);
  }
  if (Array.isArray(node)) {
    return { array: node.map((value) => getDiffItem('', getObjectValue(value, depth + 1), depth, '')) };
  }
  return node;
};

export const getObjectsDiff = (object1, object2) => {
  const iter = (item1, item2, depth) => {
    const newDepth = depth + 1;
    const keys1 = Object.keys(item1);
    const keys2 = Object.keys(item2);
    const allObjectKeys = _.sortBy(_.union(keys1, keys2));
    const result = allObjectKeys.reduce((acc, key) => {
      const value1 = item1[key];
      const value2 = item2[key];
      if (!keys1.includes(key)) {
        return [...acc, getDiffItem(key, getObjectValue(value2, newDepth), depth, '+')];
      }
      if (!keys2.includes(key)) {
        return [...acc, getDiffItem(key, getObjectValue(value1, newDepth), depth, '-')];
      }
      if (!_.isEqual(value1, value2)) {
        if (isObject(value1) && isObject(value2)) {
          return [...acc, getDiffItem(key, iter(value1, value2, newDepth), depth, '')];
        }
        return [...acc, getDiffItem(key, [getObjectValue(value1, newDepth), getObjectValue(value2, newDepth)], depth, '~')];
      }
      return [...acc, getDiffItem(key, getObjectValue(value1, newDepth), depth, '')];
    }, []);
    return result;
  };
  return [getDiffItem('', iter(object1, object2, 1), 0, '')];
};

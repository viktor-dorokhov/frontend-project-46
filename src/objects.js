import _ from 'lodash';

const isObject = (item) => (
  _.isObject(item) && !Array.isArray(item) && item !== null
);

export const getDiffItem = (key, value, state) => (
  { key, value, state }
);

const getObjectValue = (node) => {
  if (isObject(node)) {
    return Object.entries(node).reduce((acc, [key, value]) => (
      [...acc, getDiffItem(key, getObjectValue(value), '')]
    ), []);
  }
  if (Array.isArray(node)) {
    return { array: node.map((value) => getDiffItem('', getObjectValue(value), '')) };
  }
  return node;
};

export const getObjectsDiff = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const allObjectKeys = _.sortBy(_.union(keys1, keys2));
  const result = allObjectKeys.reduce((acc, key) => {
    const value1 = object1[key];
    const value2 = object2[key];
    if (!keys1.includes(key)) {
      return [...acc, getDiffItem(key, getObjectValue(value2), 'added')];
    }
    if (!keys2.includes(key)) {
      return [...acc, getDiffItem(key, getObjectValue(value1), 'removed')];
    }
    if (_.isEqual(value1, value2)) {
      return [...acc, getDiffItem(key, getObjectValue(value1), '')];
    }
    if (isObject(value1) && isObject(value2)) {
      return [...acc, getDiffItem(key, getObjectsDiff(value1, value2), '')];
    }
    return [...acc, getDiffItem(key, [getObjectValue(value1), getObjectValue(value2)], 'updated')];
  }, []);
  return result;
};

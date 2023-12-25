import _ from 'lodash';

const isObject = (item) => (
  _.isObject(item) && !Array.isArray(item) && item !== null
);

const getDiffItem = (key, value, type) => (
  { key, value, type }
);

const getObjectValue = (node) => {
  if (isObject(node)) {
    return Object.entries(node).reduce((acc, [key, value]) => (
      [...acc, getDiffItem(key, getObjectValue(value), 'nested')]
    ), []);
  }
  if (Array.isArray(node)) {
    return { array: node.map((value) => getDiffItem('', getObjectValue(value), 'array-item')) };
  }
  return node;
};

export default (object1, object2) => {
  function iter(iterObject1, iterObject2) {
    const keys1 = Object.keys(iterObject1);
    const keys2 = Object.keys(iterObject2);
    const allObjectKeys = _.sortBy(_.union(keys1, keys2));
    const result = allObjectKeys.reduce((acc, key) => {
      const value1 = iterObject1[key];
      const value2 = iterObject2[key];
      if (!keys1.includes(key)) {
        return [...acc, getDiffItem(key, getObjectValue(value2), 'added')];
      }
      if (!keys2.includes(key)) {
        return [...acc, getDiffItem(key, getObjectValue(value1), 'removed')];
      }
      if (_.isEqual(value1, value2)) {
        return [...acc, getDiffItem(key, getObjectValue(value1), 'unchanged')];
      }
      if (isObject(value1) && isObject(value2)) {
        return [...acc, getDiffItem(key, iter(value1, value2), 'changed-object')];
      }
      return [...acc, getDiffItem(key, [getObjectValue(value1), getObjectValue(value2)], 'updated')];
    }, []);
    return result;
  }
  return [getDiffItem('', iter(object1, object2), 'root')];
};

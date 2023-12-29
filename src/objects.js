import _ from 'lodash';

const getSimpleDiffItem = (type, key, value) => (
  { type, key, value }
);

export const isObject = (item) => (
  _.isObject(item) && !Array.isArray(item) && item !== null
);

export default (object1, object2) => {
  function iter(iterObject1, iterObject2) {
    const keys1 = Object.keys(iterObject1);
    const keys2 = Object.keys(iterObject2);
    const allObjectKeys = _.sortBy(_.union(keys1, keys2));
    const result = allObjectKeys.reduce((acc, key) => {
      const value1 = iterObject1[key];
      const value2 = iterObject2[key];
      if (!keys1.includes(key)) {
        return [...acc, getSimpleDiffItem('added', key, value2)];
      }
      if (!keys2.includes(key)) {
        return [...acc, getSimpleDiffItem('removed', key, value1)];
      }
      if (_.isEqual(value1, value2)) {
        return [...acc, getSimpleDiffItem('unchanged', key, value1)];
      }
      if (isObject(value1) && isObject(value2)) {
        return [...acc, { type: 'nested', key, children: iter(value1, value2) }];
      }
      return [...acc, {
        type: 'updated',
        key,
        oldValue: value1,
        newValue: value2,
      }];
    }, []);
    return result;
  }

  return [{ type: 'root', children: iter(object1, object2) }];
};

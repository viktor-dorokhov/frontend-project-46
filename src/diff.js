import _ from 'lodash';

export const getDiffLine = (key, value, diffChar) => `${diffChar || ' '} ${key}: ${value}`;

export const getObjectsDiff = (object1, object2) => {
  const keysObject1 = Object.keys(object1);
  const keysObject2 = Object.keys(object2);
  const allObjectKeys = _.sortBy(_.union(keysObject1, keysObject2));
  const result = allObjectKeys.reduce((acc, key) => {
    const value1 = object1[key];
    const value2 = object2[key];
    if (!keysObject1.includes(key)) {
      return [...acc, getDiffLine(key, value2, '+')];
    }
    if (!keysObject2.includes(key)) {
      return [...acc, getDiffLine(key, value1, '-')];
    }
    if (value1 !== value2) {
      return [...acc, getDiffLine(key, value1, '-'), getDiffLine(key, value2, '+')];
    }
    return [...acc, getDiffLine(key, value1)];
  }, []).join('\n');

  return result;
};

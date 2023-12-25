import _ from 'lodash';
import * as colors from '../colors.js';
import getMsg from '../message.js';

const getPlainValue = (value) => {
  if (value === null) {
    return 'null';
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  const type = typeof value;
  if (type === 'string') {
    return `'${value}'`;
  }
  return value.toString();
};

const getPropertyName = (key, path) => {
  if (path.length === 0) {
    return key;
  }
  return [path.join('.'), key].join('.');
};

export default (diffObject, inColor) => {
  const makeColored = (str, color) => {
    if (inColor) {
      return `${colors[color]}${str}${colors.Reset}`;
    }
    return str;
  };
  const iter = (iterNode, path = []) => (
    iterNode.reduce((acc, { key, value, type }) => {
      const propertyName = getPropertyName(key, path);
      switch (type) {
        case 'added':
          return [...acc, makeColored(getMsg('propAdd', [`'${propertyName}'`, getPlainValue(value)]), 'FgGreen')];
        case 'removed':
          return [...acc, makeColored(getMsg('propRemove', [`'${propertyName}'`]), 'FgRed')];
        case 'updated': {
          const [value1, value2] = value;
          return [...acc, getMsg(
            'propUpdate',
            [`'${propertyName}'`,
              makeColored(getPlainValue(value1), 'FgRed'),
              makeColored(getPlainValue(value2), 'FgGreen')],
          )];
        }
        case 'changed-object':
          return [...acc, iter(value, [...path, key])];
        case 'root':
          return [...acc, iter(value, path)];
        default:
          return [...acc];
      }
    }, []).flat()
  );
  return iter(diffObject).join('\n');
};

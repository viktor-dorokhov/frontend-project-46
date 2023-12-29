import _ from 'lodash';
import * as colors from '../colors.js';

const messages = {
  added: 'Property %1 was added with value: %2',
  removed: 'Property %1 was removed',
  updated: 'Property %1 was updated. From %2 to %3',
};

const getMsg = (code, values) => (
  values.reduce((acc, str, index) => acc.replace(`%${index + 1}`, str), messages[code])
);

const getPropertyName = (key, path) => {
  if (path.length === 0) {
    return key;
  }
  return [path.join('.'), key].join('.');
};

const getFormattedValue = (value) => {
  if (value === null) {
    return 'null';
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value.toString();
};

export default (diffObject, inColor) => {
  const makeColored = (str, color) => {
    if (inColor) {
      return `${colors[color]}${str}${colors.Reset}`;
    }
    return str;
  };
  const iter = (iterObject, path = []) => (
    iterObject.reduce((acc, node) => {
      const { key, type } = node;
      const propertyName = getPropertyName(key, path);
      switch (type) {
        case 'added': {
          const { value } = node;
          return [...acc, makeColored(getMsg(type, [`'${propertyName}'`, getFormattedValue(value)]), 'FgGreen')];
        }
        case 'removed':
          return [...acc, makeColored(getMsg(type, [`'${propertyName}'`]), 'FgRed')];
        case 'updated': {
          const { oldValue, newValue } = node;
          return [...acc, getMsg(
            type,
            [`'${propertyName}'`,
              makeColored(getFormattedValue(oldValue), 'FgRed'),
              makeColored(getFormattedValue(newValue), 'FgGreen')],
          )];
        }
        case 'nested': {
          const { children } = node;
          return [...acc, iter(children, [...path, key])];
        }
        case 'root': {
          const { children } = node;
          return [...acc, iter(children, path)];
        }
        default:
          return [...acc];
      }
    }, []).flat()
  );

  return iter(diffObject).join('\n');
};

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
  const lineFeed = '\n';
  const iter = (iterObject, path = []) => (
    iterObject.reduce((acc, node) => {
      const propertyName = getPropertyName(node.key, path);
      switch (node.type) {
        case 'added':
          return acc.concat(lineFeed, makeColored(getMsg(node.type, [`'${propertyName}'`, getFormattedValue(node.value)]), 'FgGreen'));
        case 'removed':
          return acc.concat(lineFeed, makeColored(getMsg(node.type, [`'${propertyName}'`]), 'FgRed'));
        case 'updated': {
          return acc.concat(lineFeed, getMsg(
            node.type,
            [`'${propertyName}'`,
              makeColored(getFormattedValue(node.oldValue), 'FgRed'),
              makeColored(getFormattedValue(node.newValue), 'FgGreen')],
          ));
        }
        case 'nested':
          return acc.concat(iter(node.children, [...path, node.key]));
        default:
          return acc;
      }
    }, '')
  );

  return iter(diffObject.children).slice(1);
};

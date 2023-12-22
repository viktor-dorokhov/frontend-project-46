/* eslint-disable object-curly-newline */

import _ from 'lodash';
import * as colors from './colors.js';
import getMsg from '../message.js';

const getPlainValue = (value) => {
  let result = '';
  if (value === null) {
    result = 'null';
  } else if (_.isObject(value)) {
    result = '[complex value]';
  } else {
    const type = typeof value;
    if (type === 'string') {
      result = `'${value}'`;
    } else {
      result = value.toString();
    }
  }
  return result;
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
    iterNode.reduce((acc, { key, value, diffChar }) => {
      let result = '';
      const propertyName = getPropertyName(key, path);
      switch (diffChar) {
        case '-':
          result = makeColored(getMsg('propRemove', `'${propertyName}'`), 'FgRed');
          break;
        case '+':
          result = makeColored(getMsg('propAdd', `'${propertyName}'`, getPlainValue(value)), 'FgGreen');
          break;
        case '~': {
          const [value1, value2] = value;
          result = getMsg(
            'propUpdate',
            `'${propertyName}'`,
            makeColored(getPlainValue(value1), 'FgRed'),
            makeColored(getPlainValue(value2), 'FgGreen'),
          );
          break;
        }
        default:
          if (Array.isArray(value)) {
            result = iter(value, key ? [...path, key] : path);
          }
      }
      if (result) {
        return [...acc, result];
      }
      return [...acc];
    }, []).flat()
  );
  return iter(diffObject).join('\n');
};

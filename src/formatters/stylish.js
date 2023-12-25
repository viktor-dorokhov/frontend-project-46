import _ from 'lodash';
import * as colors from '../colors.js';

const shiftCount = 4;
const shiftChar = ' ';

export default (diffObject, inColor) => {
  const endColorStr = inColor ? colors.Reset : '';
  const getFormattedValueArr = (iterFn, value, depth, shiftStr, beginStr, endStr) => {
    if (_.isObject(value)) {
      const isArray = Array.isArray(value);
      const beginBracket = isArray ? '{' : '[';
      const endBracket = isArray ? '}' : ']';
      return [
        `${beginStr}${beginBracket}`,
        iterFn(isArray ? value : value.array, depth + 1),
        `${shiftStr}${endBracket}${endStr}`,
      ];
    }
    const valueStr = value === null ? 'null' : value.toString();
    return [`${beginStr}${valueStr}${endStr}`];
  };
  const iter = (iterNode, depth) => {
    const shiftStr = shiftChar.repeat(depth * shiftCount);
    const shiftStrCropped = shiftStr.slice(2);
    return iterNode.reduce((acc, { key, value, type }) => {
      const keyStr = `${key}: `;
      switch (type) {
        case 'added': {
          const beginStr = `${shiftStrCropped}${inColor ? colors.FgGreen : ''}+ ${keyStr}`;
          return [
            ...acc,
            ...getFormattedValueArr(iter, value, depth, shiftStr, beginStr, endColorStr),
          ];
        }
        case 'removed': {
          const beginStr = `${shiftStrCropped}${inColor ? colors.FgRed : ''}- ${keyStr}`;
          return [
            ...acc,
            ...getFormattedValueArr(iter, value, depth, shiftStr, beginStr, endColorStr),
          ];
        }
        case 'updated': {
          const [value1, value2] = value;
          const beginStr1 = `${shiftStrCropped}${inColor ? colors.FgRed : ''}- ${keyStr}`;
          const beginStr2 = `${shiftStrCropped}${inColor ? colors.FgGreen : ''}+ ${keyStr}`;
          return [
            ...acc,
            ...getFormattedValueArr(iter, value1, depth, shiftStr, beginStr1, endColorStr),
            ...getFormattedValueArr(iter, value2, depth, shiftStr, beginStr2, endColorStr),
          ];
        }
        case 'nested':
        case 'unchanged': {
          const beginStr = `${shiftStr}${keyStr}`;
          return [...acc, ...getFormattedValueArr(iter, value, depth, shiftStr, beginStr, '')];
        }
        case 'array-item':
          return [
            ...acc,
            `${shiftStr}${value}`,
          ];
        case 'changed-object':
          return [
            ...acc,
            `${shiftStr}${keyStr}{`,
            iter(value, depth + 1),
            `${shiftStr}}`,
          ];
        default: // type = root
          return [
            ...acc,
            '{',
            iter(value, depth + 1),
            '}',
          ];
      }
    }, []).flat();
  };
  return iter(diffObject, 0).join('\n');
};

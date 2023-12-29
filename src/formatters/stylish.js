import * as colors from '../colors.js';
import { isObject } from '../objects.js';

const shiftCount = 4;
const shiftChar = ' ';

const getFormattedNode = (key, value, depth, prefix = '', beginColorStr = '') => {
  const shiftStr = shiftChar.repeat(depth * shiftCount);
  const shiftStrCropped = shiftStr.slice(prefix.length);
  const beginStr = `${shiftStrCropped}${beginColorStr}${prefix}${key}: `;
  const endColorStr = beginColorStr ? colors.Reset : '';
  if (isObject(value)) {
    const valueKeys = Object.keys(value);
    return [
      `${beginStr}{`,
      ...valueKeys.reduce((valueAcc, valueKey) => [
        ...valueAcc,
        getFormattedNode(valueKey, value[valueKey], depth + 1),
      ], []).flat(),
      `${shiftStr}}${endColorStr}`,
    ];
  }
  if (Array.isArray(value)) {
    return [`${beginStr}[${value.join(', ')}]${endColorStr}`];
  }
  const valueStr = value === null ? 'null' : value.toString();
  return [`${beginStr}${valueStr}${endColorStr}`];
};

export default (diffObject, inColor) => {
  const iter = (iterNode, depth) => (
    iterNode.reduce((acc, node) => {
      const { key, type } = node;
      switch (type) {
        case 'added': {
          const { value } = node;
          return [
            ...acc,
            ...getFormattedNode(key, value, depth, '+ ', inColor ? colors.FgGreen : ''),
          ];
        }
        case 'removed': {
          const { value } = node;
          return [
            ...acc,
            ...getFormattedNode(key, value, depth, '- ', inColor ? colors.FgRed : ''),
          ];
        }
        case 'updated': {
          const { oldValue, newValue } = node;
          return [
            ...acc,
            ...getFormattedNode(key, oldValue, depth, '- ', inColor ? colors.FgRed : ''),
            ...getFormattedNode(key, newValue, depth, '+ ', inColor ? colors.FgGreen : ''),
          ];
        }
        case 'unchanged': {
          const { value } = node;
          return [
            ...acc,
            ...getFormattedNode(key, value, depth),
          ];
        }
        case 'nested': {
          const { children } = node;
          const shiftStr = shiftChar.repeat(depth * shiftCount);
          return [
            ...acc,
            `${shiftStr}${key}: {`,
            iter(children, depth + 1),
            `${shiftStr}}`,
          ];
        }
        case 'root': {
          const { children } = node;
          return [
            ...acc,
            '{',
            iter(children, depth + 1),
            '}',
          ];
        }
        default:
          return [...acc];
      }
    }, []).flat()
  );

  return iter(diffObject, 0).join('\n');
};

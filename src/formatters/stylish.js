import * as colors from '../colors.js';
import { isObject } from '../objects.js';

const shiftCount = 4;
const shiftChar = ' ';
const lineFeed = '\n';

const getFormattedNode = (key, value, depth, prefix = '', beginColorStr = '') => {
  const shiftStr = shiftChar.repeat(depth * shiftCount);
  const shiftStrCropped = shiftStr.slice(prefix.length);
  const beginStr = `${shiftStrCropped}${beginColorStr}${prefix}${key}: `;
  const endColorStr = beginColorStr ? colors.Reset : '';
  if (isObject(value)) {
    const valueKeys = Object.keys(value);
    return `${lineFeed}${beginStr}{`.concat(
      valueKeys.reduce((valueAcc, valueKey) => (
        valueAcc.concat(
          getFormattedNode(valueKey, value[valueKey], depth + 1),
        )
      ), ''),
      `${lineFeed}${shiftStr}}${endColorStr}`,
    );
  }
  if (Array.isArray(value)) {
    return `${lineFeed}${beginStr}[${value.join(', ')}]${endColorStr}`;
  }
  const valueStr = value === null ? 'null' : value.toString();
  return `${lineFeed}${beginStr}${valueStr}${endColorStr}`;
};

export default (diffObject, inColor) => {
  const iter = (iterNode, depth) => (
    iterNode.reduce((acc, node) => {
      switch (node.type) {
        case 'added':
          return acc.concat(
            getFormattedNode(node.key, node.value, depth, '+ ', inColor ? colors.FgGreen : ''),
          );
        case 'removed':
          return acc.concat(
            getFormattedNode(node.key, node.value, depth, '- ', inColor ? colors.FgRed : ''),
          );
        case 'updated':
          return acc.concat(
            getFormattedNode(node.key, node.oldValue, depth, '- ', inColor ? colors.FgRed : ''),
            getFormattedNode(node.key, node.newValue, depth, '+ ', inColor ? colors.FgGreen : ''),
          );
        case 'unchanged':
          return acc.concat(
            getFormattedNode(node.key, node.value, depth),
          );
        case 'nested': {
          const shiftStr = shiftChar.repeat(depth * shiftCount);
          return acc.concat(
            `${lineFeed}${shiftStr}${node.key}: {`,
            iter(node.children, depth + 1),
            `${lineFeed}${shiftStr}}`,
          );
        }
        default:
          return acc;
      }
    }, '')
  );

  return `{${iter(diffObject.children, 1)}${lineFeed}}`;
};

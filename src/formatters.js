/* eslint-disable object-curly-newline */

import _ from 'lodash';
import { getDiffItem } from './objects.js';

const COLOR_GREEN = '\x1b[32m';
const COLOR_RED = '\x1b[31m';
const COLOR_RESET = '\x1b[0m';

const formatStylish = (diffObject, inColor) => {
  // console.log(inColor)
  // console.log(JSON.stringify(diffObject, null ,2));
  const iter = (iterNode) => (
    iterNode.flatMap((item) => {
      const { key, value, depth, diffChar } = item;
      if (diffChar === '~') {
        const [value1, value2] = value;
        return [getDiffItem(key, value1, depth, '-'), getDiffItem(key, value2, depth, '+')];
      }
      return item;
    }).reduce((acc, { key, value, depth, diffChar }) => {
      const shiftStr = depth > 0 ? ' '.repeat(depth * 4 - 2) : '';
      const diffStr = depth > 0 ? `${diffChar || ' '} ` : '';
      const keyStr = key ? `${key}: ` : '';
      let colorStrBegin = '';
      if (inColor && !!diffChar) {
        colorStrBegin = diffChar === '+' ? COLOR_GREEN : COLOR_RED;
      }
      const colorStrEnd = colorStrBegin ? COLOR_RESET : '';
      let resultStr = `${colorStrBegin}${shiftStr}${diffStr}${keyStr}`;
      if (Array.isArray(value)) {
        return [
          ...acc,
          `${resultStr}{`,
          iter(value),
          `${' '.repeat(depth * 4)}}${colorStrEnd}`,
        ];
      }
      if (_.isObject(value) && value.array) {
        return [
          ...acc,
          `${resultStr}[`,
          iter(value.array),
          `${' '.repeat(depth * 4)}]${colorStrEnd}`,
        ];
      }
      if (value === null) {
        resultStr += 'null';
      } else {
        resultStr += value.toString();
      }
      return [...acc, `${resultStr}${colorStrEnd}`];
    }, []).flat()
  );
  const ii = iter(diffObject);
  return ii.join('\n');
};

/* const formatPlain = (diffObject) => {
  const result = JSON.stringify(diffObject, null, 2);
  return result;
}; */

const formatDiffObject = (diffObject, formatType, inColor) => {
  let result = null;
  switch (formatType) {
    case 'stylish':
      result = formatStylish(diffObject, inColor);
      break;
    /* case 'plain':
      result = formatPlain(diffObject, inColor);
      break; */
    default:
      console.log('Please use the following format types: stylish'); // plain
  }
  return result;
};

export default formatDiffObject;

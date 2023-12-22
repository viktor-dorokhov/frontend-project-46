/* eslint-disable object-curly-newline */

import _ from 'lodash';
import { getDiffItem } from '../objects.js';
import * as colors from './colors.js';

const shiftCount = 4;
const shiftChar = ' ';

export default (diffObject, inColor) => {
  const iter = (iterNode) => (
    iterNode.flatMap((item) => {
      const { key, value, depth, diffChar } = item;
      if (diffChar === '~') {
        const [value1, value2] = value;
        return [getDiffItem(key, value1, depth, '-'), getDiffItem(key, value2, depth, '+')];
      }
      return item;
    }).reduce((acc, { key, value, depth, diffChar }) => {
      const diffStr = depth > 0 ? `${diffChar || shiftChar}${diffChar ? ' ' : shiftChar}` : '';
      const shiftStr = depth > 0 ? shiftChar.repeat(depth * shiftCount - diffStr.length) : '';
      const keyStr = key ? `${key}: ` : '';
      let colorStrBegin = '';
      if (inColor && !!diffChar) {
        colorStrBegin = diffChar === '+' ? colors.FgGreen : colors.FgRed;
      }
      const colorStrEnd = colorStrBegin ? colors.Reset : '';
      let resultStr = `${shiftStr}${colorStrBegin}${diffStr}${keyStr}`;
      if (Array.isArray(value)) {
        return [
          ...acc,
          `${resultStr}{`,
          iter(value),
          `${shiftChar.repeat(depth * shiftCount)}}${colorStrEnd}`,
        ];
      }
      if (_.isObject(value) && value.array) {
        return [
          ...acc,
          `${resultStr}[`,
          iter(value.array),
          `${shiftChar.repeat(depth * shiftCount)}]${colorStrEnd}`,
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

  return iter(diffObject).join('\n');
};

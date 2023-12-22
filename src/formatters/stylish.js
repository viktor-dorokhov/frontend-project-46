/* eslint-disable object-curly-newline */

import _ from 'lodash';
import { getDiffItem } from '../objects.js';
import * as colors from './colors.js';

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
      const shiftStr = depth > 0 ? ' '.repeat(depth * 4 - 2) : '';
      const diffStr = depth > 0 ? `${diffChar || ' '} ` : '';
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

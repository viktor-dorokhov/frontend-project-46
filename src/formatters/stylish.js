import _ from 'lodash';
import { getDiffItem } from '../objects.js';
import * as colors from './colors.js';

const shiftCount = 4;
const shiftChar = ' ';

const diffStateMap = new Map([['added', '+'], ['removed', '-']]);
const getDiffChar = (state) => diffStateMap.get(state);

export default (diffObject, inColor) => {
  const iter = (iterNode, depth) => (
    iterNode.flatMap((item) => {
      const { key, value, state } = item;
      if (state === 'updated') {
        const [value1, value2] = value;
        return [getDiffItem(key, value1, 'removed'), getDiffItem(key, value2, 'added')];
      }
      return item;
    }).reduce((acc, { key, value, state }) => {
      const diffChar = getDiffChar(state);
      const diffStr = depth > 0 ? `${diffChar || shiftChar}${diffChar ? ' ' : shiftChar}` : '';
      const fullShiftCount = depth * shiftCount;
      const shiftStr = depth > 0 ? shiftChar.repeat(fullShiftCount - diffStr.length) : '';
      const keyStr = key ? `${key}: ` : '';
      let colorStrBegin = '';
      if (inColor && diffChar) {
        colorStrBegin = diffChar === '+' ? colors.FgGreen : colors.FgRed;
      }
      const colorStrEnd = colorStrBegin ? colors.Reset : '';
      let resultStr = `${shiftStr}${colorStrBegin}${diffStr}${keyStr}`;
      if (_.isObject(value)) {
        const isArray = Array.isArray(value);
        const bracketBegin = isArray ? '{' : '[';
        const bracketEnd = isArray ? '}' : ']';
        return [
          ...acc,
          `${resultStr}${bracketBegin}`,
          iter(isArray ? value : value.array, depth + 1),
          `${shiftChar.repeat(fullShiftCount)}${bracketEnd}${colorStrEnd}`,
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

  return iter([getDiffItem('', diffObject, 0, '')], 0).join('\n');
};

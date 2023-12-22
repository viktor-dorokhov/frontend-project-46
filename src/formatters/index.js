/* eslint-disable object-curly-newline */

import formatStylish from './stylish.js';

/* const formatPlain = (diffObject) => {
  const result = JSON.stringify(diffObject, null, 2);
  return result;
}; */

export default (diffObject, formatType, inColor) => {
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

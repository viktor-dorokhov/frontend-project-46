import getMsg from '../message.js';
import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

export default (diffObject, formatType, inColor) => {
  let result = null;
  switch (formatType) {
    case 'stylish':
      result = formatStylish(diffObject, inColor);
      break;
    case 'plain':
      result = formatPlain(diffObject, inColor);
      break;
    case 'json':
      result = formatJSON(diffObject);
      break;
    default:
      console.log(getMsg('formatTypeError', 'stylish, plain, json'));
  }
  return result;
};

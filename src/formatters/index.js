import getMsg from '../message.js';
import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

export default (diffObject, formatType, inColor) => {
  switch (formatType) {
    case 'stylish':
      return formatStylish(diffObject, inColor);
    case 'plain':
      return formatPlain(diffObject, inColor);
    case 'json':
      return formatJSON(diffObject);
    default:
      console.log(getMsg('formatTypeError', 'stylish, plain, json'));
      return null;
  }
};

import getMsg from '../message.js';
import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const formatterFns = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJSON,
};

export default (diffObject, formatType, inColor) => {
  const formatterFn = formatterFns[formatType];
  if (!formatterFn) {
    console.log(getMsg('formatTypeError', [Object.keys(formatterFns).join(', ')]));
    return null;
  }
  return formatterFn(diffObject, inColor);
};

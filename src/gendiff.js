import { getObjectsDiff } from './diff.js';
import getDataObject from './parsers.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const object1 = getDataObject(filepath1);
  if (!object1) {
    return null;
  }
  const object2 = getDataObject(filepath2);
  if (!object2) {
    return null;
  }
  const result = getObjectsDiff(object1, object2, format);

  return result;
};

export default genDiff;

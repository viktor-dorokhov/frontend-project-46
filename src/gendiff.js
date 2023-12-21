import { getObjectsDiff } from './objects.js';
import formatDiffObject from './formatters.js';
import getDataObject from './parsers.js';

const genDiff = (filepath1, filepath2, format = 'stylish', inColor = false) => {
  const object1 = getDataObject(filepath1);
  if (!object1) {
    return null;
  }
  const object2 = getDataObject(filepath2);
  if (!object2) {
    return null;
  }
  const diffObject = getObjectsDiff(object1, object2);

  return formatDiffObject(diffObject, format, inColor);
};

export default genDiff;

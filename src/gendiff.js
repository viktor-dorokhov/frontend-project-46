import { getExt, getFileContent } from './filesystem.js';
import getObjectsDiff from './objects.js';
import formatDiffObject from './formatters/index.js';
import parseData from './parsers/index.js';
import getMsg from './message.js';

const extMapping = {
  '.json': 'json',
  '.yml': 'yaml',
  '.yaml': 'yaml',
};

const getFileType = (filepath) => {
  const ext = getExt(filepath).toLowerCase();
  const type = extMapping[ext];
  if (!type) {
    console.log(getMsg('fileTypeError', ['json, yaml']));
    return null;
  }
  return type;
};

const getObjectFromFile = (filepath) => {
  const type = getFileType(filepath);
  if (!type) {
    return null;
  }
  const fileData = getFileContent(filepath);
  if (!fileData) {
    return null;
  }
  const object = parseData(fileData, type);
  if (!object) {
    return null;
  }
  return object;
};

const genDiff = (filepath1, filepath2, formatType = 'stylish', inColor = false) => {
  const object1 = getObjectFromFile(filepath1);
  if (!object1) {
    return null;
  }
  const object2 = getObjectFromFile(filepath2);
  if (!object2) {
    return null;
  }
  const diffObject = getObjectsDiff(object1, object2);
  return formatDiffObject(diffObject, formatType, inColor);
};

export default genDiff;

import _ from 'lodash';
import { getExt, getFileContent } from './filesystem.js';

const parseJSON = (data) => {
  try {
    const json = JSON.parse(data);
    return json;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getDiffLine = (key, value, diffChar) => `${diffChar || ' '} ${key}: ${value}`;

const getDiffObjects = (object1, object2) => {
  const keysObject1 = Object.keys(object1);
  const keysObject2 = Object.keys(object2);
  const allObjectKeys = _.sortBy(_.union(keysObject1, keysObject2));
  const result = allObjectKeys.reduce((acc, key) => {
    const value1 = object1[key];
    const value2 = object2[key];
    if (!keysObject1.includes(key)) {
      return [...acc, getDiffLine(key, value2, '+')];
    }
    if (!keysObject2.includes(key)) {
      return [...acc, getDiffLine(key, value1, '-')];
    }
    if (value1 !== value2) {
      return [...acc, getDiffLine(key, value1, '-'), getDiffLine(key, value2, '+')];
    }
    return [...acc, getDiffLine(key, value1)];
  }, []).join('\n');

  return result;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const ext1 = getExt(filepath1);
  const ext2 = getExt(filepath2);
  if (ext1 !== '.json' || ext2 !== '.json') {
    console.log('Please use the following file types: json');
    return null;
  }
  const fileData1 = getFileContent(filepath1);
  if (!fileData1) {
    return null;
  }
  const fileData2 = getFileContent(filepath2);
  if (!fileData2) {
    return null;
  }
  const json1 = parseJSON(fileData1);
  if (!json1) {
    return null;
  }
  const json2 = parseJSON(fileData2);
  if (!json2) {
    return null;
  }
  const result = getDiffObjects(json1, json2, format);

  return result;
};

export default genDiff;

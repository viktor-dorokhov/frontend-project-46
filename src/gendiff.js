import { getExt, getFileContent } from './filesystem.js';
import { parseJSON, getObjectsDiff } from './diff.js';

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
  const json1 = parseJSON(fileData1, filepath1);
  if (!json1) {
    return null;
  }
  const json2 = parseJSON(fileData2, filepath2);
  if (!json2) {
    return null;
  }
  const result = getObjectsDiff(json1, json2, format);

  return result;
};

export default genDiff;

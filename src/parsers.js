import yaml from 'js-yaml';
import { getExt, getFileContent } from './filesystem.js';

const allowedExts = ['.json', '.yml', '.yaml'];

const getDataObject = (filepath) => {
  const ext = getExt(filepath).toLowerCase();
  if (!allowedExts.includes(ext)) {
    console.log('Please use the following file types: json, yaml');
    return null;
  }
  const fileData = getFileContent(filepath);
  if (!fileData) {
    return null;
  }
  let parseFn;
  let type;
  switch (ext) {
    case '.json':
      parseFn = JSON.parse;
      type = 'JSON';
      break;
    default:
      parseFn = yaml.load;
      type = 'YAML';
  }
  try {
    const result = parseFn(fileData);
    return result;
  } catch (err) {
    console.log(`Incorrect ${type} content. Please check file: ${filepath}`);
    return null;
  }
};

export default getDataObject;

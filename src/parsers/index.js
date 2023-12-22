import { getExt, getFileContent } from '../filesystem.js';
import getMsg from '../message.js';
import parseJSON from './json.js';
import parseYAML from './yaml.js';

const allowedExts = ['.json', '.yml', '.yaml'];

const getDataObject = (filepath) => {
  const ext = getExt(filepath).toLowerCase();
  if (!allowedExts.includes(ext)) {
    console.log(getMsg('fileTypeError', 'json, yaml'));
    return null;
  }
  const fileData = getFileContent(filepath);
  if (!fileData) {
    return null;
  }
  let result;
  let type;
  switch (ext) {
    case '.json':
      result = parseJSON(fileData);
      type = 'JSON';
      break;
    case '.yml':
    case '.yaml':
      result = parseYAML(fileData);
      type = 'YAML';
    // no default
  }
  if (result === null) {
    console.log(getMsg('parseError', type, filepath));
  }
  return result;
};

export default getDataObject;

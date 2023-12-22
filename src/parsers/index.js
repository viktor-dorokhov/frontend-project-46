import { getExt, getFileContent } from '../filesystem.js';
import getMsg from '../message.js';
import parseJSON from './json.js';
import parseYAML from './yaml.js';

const allowedExts = ['.json', '.yml', '.yaml'];

const getDataObject = (filepath) => {
  const ext = getExt(filepath).toLowerCase();
  if (!allowedExts.includes(ext)) {
    console.log(getMsg('fileTypeError', ['json, yaml']));
    return null;
  }
  const fileData = getFileContent(filepath);
  if (!fileData) {
    return null;
  }
  const type = ext === '.json' ? 'JSON' : 'YAML';
  const result = type === 'JSON' ? parseJSON(fileData) : parseYAML(fileData);
  if (result === null) {
    console.log(getMsg('parseError', [type, filepath]));
  }
  return result;
};

export default getDataObject;

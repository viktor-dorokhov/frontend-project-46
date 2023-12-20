import yaml from 'js-yaml';
import { getExt, getFileContent } from './filesystem.js';

const allowedExts = ['.json', '.yml', '.yaml'];

export const parseJSON = (data, filepath) => {
  try {
    const result = JSON.parse(data);
    return result;
  } catch (err) {
    console.log(`Wrong JSON format. Please check file: ${filepath}`);
    return null;
  }
};

export const parseYAML = (data, filepath) => {
  try {
    const result = yaml.load(data);
    return result;
  } catch (err) {
    console.log(`Wrong YAML format. Please check file: ${filepath}`);
    return null;
  }
};

export const getDataObject = (filepath) => {
  const ext = getExt(filepath).toLowerCase();
  if (!allowedExts.includes(ext)) {
    console.log('Please use the following file types: json, yaml');
    return null;
  }
  const fileData = getFileContent(filepath);
  if (!fileData) {
    return null;
  }
  switch (ext) {
    case '.json':
      return parseJSON(fileData);
    default:
      return parseYAML(fileData);
  }
};

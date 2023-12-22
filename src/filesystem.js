import path from 'path';
import fs from 'fs';
import getMsg from './message.js';

export const getFileContent = (filepath) => {
  const absolutePath = path.isAbsolute(filepath) ? filepath : path.resolve(filepath);
  try {
    const data = fs.readFileSync(absolutePath, 'utf8');
    return data;
  } catch (err) {
    console.log(getMsg('fileError', filepath));
    return null;
  }
};

export const getExt = (filepath) => path.extname(filepath);

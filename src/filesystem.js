import path from 'path';
import fs from 'fs';

export const getFileContent = (filepath) => {
  let absolutePath = filepath;
  if (!path.isAbsolute(absolutePath)) {
    absolutePath = path.resolve(absolutePath);
  }
  try {
    const data = fs.readFileSync(absolutePath, 'utf8');
    return data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const getExt = (filepath) => path.extname(filepath);

import path from 'path';
import fs from 'fs';

export const getFileContent = (filepath) => {
  const absolutePath = path.isAbsolute(filepath) ? filepath : path.resolve(filepath);
  try {
    const data = fs.readFileSync(absolutePath, 'utf8');
    return data;
  } catch (err) {
    console.log(`The file cannot be opened: ${filepath}`);
    return null;
  }
};

export const getExt = (filepath) => path.extname(filepath);

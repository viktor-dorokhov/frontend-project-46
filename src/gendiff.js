import { getExt, getFileContent } from './filesystem.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  console.log(`format ${format}`);
  const ext1 = getExt(filepath1);
  console.log(ext1);
  const c1 = getFileContent(filepath1);
  console.log(c1);
  const ext2 = getExt(filepath2);
  console.log(ext2);
  const c2 = getFileContent(filepath2);
  console.log(c2);
}

export default genDiff;
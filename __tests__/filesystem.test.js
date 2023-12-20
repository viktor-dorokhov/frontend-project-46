import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';
import { test, expect } from '@jest/globals';
import { getFileContent, getExt } from '../src/filesystem.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dirA = `${__dirname}${sep}..${sep}__fixtures__${sep}`;
const dirR = `__fixtures__${sep}`;
const testContent = `{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}`;

test('getExt', () => {
  expect(getExt('file1.json')).toEqual('.json');
  expect(getExt('/home/user/file2.txt')).toEqual('.txt');
  expect(getExt('/home/user/.gitignore')).toEqual('');
});

test('getFileContent success absolute path', () => {
  expect(getFileContent(`${dirA}file1.json`)).toEqual(testContent);
});

test('getFileContent success relative path', () => {
  expect(getFileContent(`${dirR}file1.json`)).toEqual(testContent);
});

test('getFileContent failure', () => {
  expect(getFileContent(`${dirA}file3.json`)).toBeNull();
});

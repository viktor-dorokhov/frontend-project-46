import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { test, expect } from '@jest/globals';
import { getFileContent, getExt } from '../src/filesystem.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dir = `${__dirname}/../__fixtures__/`;

test('getExt', () => {
  expect(getExt('file1.json')).toEqual('.json');
  expect(getExt('/home/user/file2.txt')).toEqual('.txt');
  expect(getExt('/home/user/.gitignore')).toEqual('');
});

test('getFileContent success relative path', () => {
  expect(getFileContent('file1.json')).toBeNull();
});

test('getFileContent success absolute path', () => {
  expect(getFileContent(`${dir}file2.json`)).toEqual(
    `{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}`,
  );
});

test('getFileContent failure', () => {
  expect(getFileContent(`${dir}file3.json`)).toBeNull();
});

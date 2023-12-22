import { test, expect } from '@jest/globals';
import { getFileContent, getExt } from '../src/filesystem.js';
import { dirA, dirR, testFileContent } from '../__fixtures__/constants.js';

test('getExt', () => {
  expect(getExt('file1.json')).toEqual('.json');
  expect(getExt('/home/user/file2.txt')).toEqual('.txt');
  expect(getExt('/home/user/.gitignore')).toEqual('');
});

test('getFileContent success absolute path', () => {
  expect(getFileContent(`${dirA}file1.json`)).toEqual(testFileContent);
});

test('getFileContent success relative path', () => {
  expect(getFileContent(`${dirR}file1.json`)).toEqual(testFileContent);
});

test('getFileContent failure', () => {
  expect(getFileContent(`${dirA}file11.json`)).toBeNull();
});

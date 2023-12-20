import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dirA = `${__dirname}${sep}..${sep}__fixtures__${sep}`;
const dirR = `__fixtures__${sep}`;
const testResult1 = `- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true`;

test('gendiff absolute path success', () => {
  expect(genDiff(`${dirA}file1.json`, `${dirA}file2.json`)).toEqual(testResult1);
});

test('gendiff relative path success', () => {
  expect(genDiff(`${dirR}file1.json`, `${dirR}file2.json`)).toEqual(testResult1);
});

test('file1 not found', () => {
  expect(genDiff(`${dirA}file3.json`, `${dirA}file2.json`)).toBeNull();
});

test('file2 not found', () => {
  expect(genDiff(`${dirA}file1.json`, `${dirA}file4.json`)).toBeNull();
});

test('wrong files type', () => {
  expect(genDiff('file1.json', 'file2.txt')).toBeNull();
  expect(genDiff('file1.docx', 'file2.json')).toBeNull();
  expect(genDiff('file1', 'file2')).toBeNull();
});

test('wrong files content', () => {
  expect(genDiff(`${dirA}file1.json`, `${dirA}file_wrong.json`)).toBeNull();
  expect(genDiff(`${dirA}file_wrong.json`, `${dirA}file2.json`)).toBeNull();
});

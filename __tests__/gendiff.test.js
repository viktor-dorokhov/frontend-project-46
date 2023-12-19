import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dir = `${__dirname}/../__fixtures__/`;

test('gendiff absolute path success', () => {
  expect(genDiff(`${dir}file1.json`, `${dir}file2.json`)).toEqual(
    `- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true`,
  );
});

test('gendiff relative path success', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(
    `- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true`,
  );
});

test('file1 not found', () => {
  expect(genDiff(`${dir}file3.json`, `${dir}file2.json`)).toBeNull();
});

test('file2 not found', () => {
  expect(genDiff(`${dir}file1.json`, `${dir}file4.json`)).toBeNull();
});

test('wrong files type', () => {
  expect(genDiff('file1.json', 'file2.txt')).toBeNull();
  expect(genDiff('file1.docx', 'file2.json')).toBeNull();
  expect(genDiff('file1', 'file2')).toBeNull();
});

test('wrong files content', () => {
  expect(genDiff(`${dir}file1.json`, `${dir}file_wrong.json`)).toBeNull();
  expect(genDiff(`${dir}file_wrong.json`, `${dir}file2.json`)).toBeNull();
});

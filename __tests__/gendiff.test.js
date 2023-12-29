import { fileURLToPath } from 'url';
import { resolve, dirname, sep } from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dirA = `${__dirname}${sep}..${sep}__fixtures__${sep}`;
const dirR = `__fixtures__${sep}`;

const getFileContent = (filename) => {
  const absolutePath = resolve(`${dirR}${filename}`);
  try {
    const data = fs.readFileSync(absolutePath, 'utf8');
    return data;
  } catch (err) {
    return null;
  }
};

test('file type JSON, output format stylish', () => {
  expect(genDiff(`${dirA}file1.json`, `${dirA}file2.json`)).toEqual(getFileContent('testDiffTextStylish'));
});

test('file type YAML, output format stylish', () => {
  expect(genDiff(`${dirA}file1.yml`, `${dirA}file2.yml`)).toEqual(getFileContent('testDiffTextStylish'));
});

test('file type JSON, output format plain', () => {
  expect(genDiff(`${dirR}file1.json`, `${dirR}file2.json`, 'plain')).toEqual(getFileContent('testDiffTextPlain'));
});

test('file type YAML, output format plain', () => {
  expect(genDiff(`${dirR}file1.yml`, `${dirR}file2.yml`, 'plain')).toEqual(getFileContent('testDiffTextPlain'));
});

test('file type JSON, output format json', () => {
  expect(genDiff(`${dirR}file1.json`, `${dirR}file2.json`, 'json')).toEqual(getFileContent('testDiffTextJSON'));
});

test('file type YAML, output format json', () => {
  expect(genDiff(`${dirR}file3.yaml`, `${dirR}file2.yml`, 'json')).toEqual(getFileContent('testDiffTextJSON'));
});

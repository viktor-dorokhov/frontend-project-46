import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';
import { test, expect } from '@jest/globals';
import { getDataObject, parseJSON, parseYAML } from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dirA = `${__dirname}${sep}..${sep}__fixtures__${sep}`;
const testObject = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

test('getDataObject correct data JSON', () => {
  expect(getDataObject(`${dirA}file1.json`)).toEqual(testObject);
});

test('getDataObject correct data YAML', () => {
  expect(getDataObject(`${dirA}file1.yml`)).toEqual(testObject);
});

test('getDataObject correct data YAML with yaml ext', () => {
  expect(getDataObject(`${dirA}file3.yaml`)).toEqual(testObject);
});

test('getDataObject incorrect ext', () => {
  expect(getDataObject(`${dirA}file3.docx`)).toBeNull();
});

test('getDataObject file not found', () => {
  expect(getDataObject(`${dirA}file0.json`)).toBeNull();
});

test('parseJSON correct data', () => {
  expect(parseJSON(`{
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  }`, 'file1.json')).toEqual(testObject);
});

test('parseJSON incorrect data', () => {
  expect(parseJSON(`{
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false`, 'file_wrong.json')).toBeNull();
});

test('parseYAML correct data', () => {
  expect(parseYAML(`---
  host: hexlet.io
  timeout: 50
  proxy: 123.234.53.22
  follow: false
  `, 'file1.yml')).toEqual(testObject);
});

test('parseYAML incorrect data', () => {
  expect(parseYAML(`---
  host: hexlet.io
  timeout: :
  proxy: 123.234.53.22
  follow: false
  `, 'file_wrong.yml')).toBeNull();
});

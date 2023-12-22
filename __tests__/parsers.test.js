import { test, expect } from '@jest/globals';
import getDataObject from '../src/parsers/index.js';
import { dirA, testObject } from '../__fixtures__/constants.js';

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

test('getDataObject incorrect JSON', () => {
  expect(getDataObject(`${dirA}file_wrong.json`)).toBeNull();
});

test('getDataObject incorrect YAML', () => {
  expect(getDataObject(`${dirA}file_wrong.yml`)).toBeNull();
});

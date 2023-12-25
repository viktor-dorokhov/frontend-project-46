import { test, expect } from '@jest/globals';
import genDiff from '../src/gendiff.js';
import {
  dirA,
  dirR,
  testDiffTextStylish,
  testDiffTextStylishColored,
  testDiffTextPlain,
  testDiffTextPlainColored,
  testDiffTextJSON,
} from '../__fixtures__/constants.js';

test('gendiff absolute path success', () => {
  expect(genDiff(`${dirA}file1.json`, `${dirA}file2.json`)).toEqual(testDiffTextStylish);
});

test('gendiff relative path success', () => {
  expect(genDiff(`${dirR}file1.json`, `${dirR}file2.json`)).toEqual(testDiffTextStylish);
});

test('gendiff yaml files', () => {
  expect(genDiff(`${dirR}file1.yml`, `${dirR}file2.yml`)).toEqual(testDiffTextStylish);
});

test('gendiff format stylish colored', () => {
  expect(genDiff(`${dirR}file1.json`, `${dirR}file2.json`, 'stylish', true)).toEqual(testDiffTextStylishColored);
});

test('gendiff format plain', () => {
  expect(genDiff(`${dirR}file1.json`, `${dirR}file2.json`, 'plain')).toEqual(testDiffTextPlain);
});

test('gendiff format plain colored', () => {
  expect(genDiff(`${dirR}file1.json`, `${dirR}file2.json`, 'plain', true)).toEqual(testDiffTextPlainColored);
});

test('gendiff format type json', () => {
  expect(genDiff(`${dirR}file1.json`, `${dirR}file2.json`, 'json')).toEqual(testDiffTextJSON);
});

test('gendiff file1 not found', () => {
  expect(genDiff(`${dirA}file11.json`, `${dirA}file2.json`)).toBeNull();
});

test('gendiff file2 not found', () => {
  expect(genDiff(`${dirA}file1.json`, `${dirA}file22.json`)).toBeNull();
});

test('gendiff wrong files type', () => {
  expect(genDiff('file1.json', 'file2.txt')).toBeNull();
  expect(genDiff('file1.docx', 'file2.json')).toBeNull();
  expect(genDiff('file1', 'file2')).toBeNull();
});

test('gendiff wrong files content', () => {
  expect(genDiff(`${dirA}file1.json`, `${dirA}file_wrong.json`)).toBeNull();
  expect(genDiff(`${dirA}file_wrong.json`, `${dirA}file2.json`)).toBeNull();
  expect(genDiff(`${dirA}file_wrong.yml`, `${dirA}file2.json`)).toBeNull();
});

test('gendiff wrong format', () => {
  expect(genDiff(`${dirA}file1.json`, `${dirA}file2.json`, 'some')).toBeNull();
});

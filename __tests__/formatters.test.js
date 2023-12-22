import { test, expect } from '@jest/globals';
import formatDiffObject from '../src/formatters/index.js';
import { testDiffObject, testDiffTextStylish, testDiffTextPlain } from '../__fixtures__/constants.js';

test('formatDiffObject type stylish', () => {
  expect(formatDiffObject(testDiffObject, 'stylish')).toEqual(testDiffTextStylish);
});

test('formatDiffObject type plain', () => {
  expect(formatDiffObject(testDiffObject, 'plain')).toEqual(testDiffTextPlain);
});

test('formatDiffObject type json', () => {
  expect(formatDiffObject(testDiffObject, 'json')).toEqual(JSON.stringify(testDiffObject));
});

test('formatDiffObject incorrect type', () => {
  expect(formatDiffObject(testDiffObject, 'some')).toBeNull();
});

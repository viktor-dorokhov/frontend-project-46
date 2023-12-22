import { test, expect } from '@jest/globals';
import formatDiffObject from '../src/formatters/index.js';
import { testDiffObject, testDiffTextStylish } from '../__fixtures__/constants.js';

test('formatDiffObject correct type stylish', () => {
  expect(formatDiffObject(testDiffObject, 'stylish')).toEqual(testDiffTextStylish);
});

test('formatDiffObject incorrect type', () => {
  expect(formatDiffObject(testDiffObject, 'some')).toBeNull();
});

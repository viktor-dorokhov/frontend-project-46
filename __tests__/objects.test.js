import { test, expect } from '@jest/globals';
import { getObjectsDiff } from '../src/objects.js';
import { testObject, testObject2, testDiffObject } from '../__fixtures__/constants.js';

test('getObjectsDiff', () => {
  expect(getObjectsDiff(testObject, testObject2)).toEqual(testDiffObject);
});

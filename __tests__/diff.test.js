import { test, expect } from '@jest/globals';
import { getDiffLine } from '../src/diff.js';

test('getDiffLine', () => {
  expect(getDiffLine('timeout', 50, '+')).toEqual('+ timeout: 50');
  expect(getDiffLine('proxy', '123.234.53.22', '-')).toEqual('- proxy: 123.234.53.22');
  expect(getDiffLine('follow', 'false')).toEqual('  follow: false');
});

import { test, expect } from '@jest/globals';
import { parseJSON, getDiffLine } from '../src/diff.js';

test('parseJSON correct data', () => {
  expect(parseJSON(`{
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  }`)).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});

test('parseJSON incorrect data', () => {
  expect(parseJSON(`{
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false`)).toBeNull();
});

test('getDiffLine', () => {
  expect(getDiffLine('timeout', 50, '+')).toEqual('+ timeout: 50');
  expect(getDiffLine('proxy', '123.234.53.22', '-')).toEqual('- proxy: 123.234.53.22');
  expect(getDiffLine('follow', 'false')).toEqual('  follow: false');
});

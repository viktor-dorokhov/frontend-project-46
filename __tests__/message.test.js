import { test, expect } from '@jest/globals';
import getMsg from '../src/message.js';

test('getMsg', () => {
  const msg1 = getMsg('propAdd', '\'common.setting4\'', '\'blah blah\'');
  expect(msg1).toEqual('Property \'common.setting4\' was added with value: \'blah blah\'');
  const msg2 = getMsg('propUpdate', '\'group1.nest\'', '[complex value]', '\'str\'');
  expect(msg2).toEqual('Property \'group1.nest\' was updated. From [complex value] to \'str\'');
});

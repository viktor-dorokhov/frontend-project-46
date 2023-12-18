#! /usr/bin/env node

import { program } from 'commander';

const genDiff = (filepath1, filepath2) => {
  // some logic
  return null;
}

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1');

program
  .option('-f, --format <type>', 'output format');

program
  .arguments('<filepath1> <filepath2>');

program.parse();

export default genDiff;

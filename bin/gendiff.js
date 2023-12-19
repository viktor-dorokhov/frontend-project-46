#! /usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/gendiff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1');

program
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((first, second, {format}) => {
    const result = genDiff(first, second, format);
    if (result) {
      console.log(result);
    }
  });

program.parse();
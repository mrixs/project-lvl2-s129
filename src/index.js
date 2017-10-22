import fs from 'fs';
import path from 'path';
import parsers from './parsers';
import { getObjectsDifferences, astToString } from './ast';

const fileToString = filename => fs.readFileSync(filename, 'utf8');

const getFileExtension = filename => path.extname(filename).slice(1);

const fileToObject = filename => parsers[getFileExtension(filename)](fileToString(filename));

export default (file1, file2) => {
  const firstConfig = fileToObject(file1);
  const secondConfig = fileToObject(file2);
  const differAst = getObjectsDifferences(firstConfig, secondConfig);
  const result = astToString(differAst);
  return `{${result}\n}`;
};

import fs from 'fs';
import path from 'path';
import parsers from './parsers';

const fileToString = filename => fs.readFileSync(filename, 'utf8');
const getFileExtension = filename => path.extname(filename).slice(1);
const fileToObject = filename => parsers[getFileExtension(filename)](fileToString(filename));

export default (file1, file2) => {
  const firstConfig = fileToObject(file1);
  const secondConfig = fileToObject(file2);
  const firstConfigKeys = Object.keys(firstConfig);
  const secondConfigKeys = Object.keys(secondConfig);
  const mixedConfigKeys = new Set(firstConfigKeys.concat(secondConfigKeys));
  const diffArray = [...mixedConfigKeys].reduce((acc, key) => {
    if (firstConfig[key] === secondConfig[key]) return acc.concat(`    ${key}: ${firstConfig[key]}`);
    else if (!(key in secondConfig)) return acc.concat(`  - ${key}: ${firstConfig[key]}`);
    else if (!(key in firstConfig)) return acc.concat(`  + ${key}: ${secondConfig[key]}`);
    return acc.concat(`  + ${key}: ${secondConfig[key]}`).concat(`  - ${key}: ${firstConfig[key]}`);
  }, []);

  return `{\n${diffArray.join('\n')}\n}`;
};

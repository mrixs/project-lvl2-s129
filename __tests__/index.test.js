import gendiff from '../src';

test('GenDiff Test', () => {
  expect(gendiff('__tests__/data/before.json', '__tests__/data/after.json'))
    .toBe(`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`);
});

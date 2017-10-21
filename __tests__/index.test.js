import gendiff from '../src';

test('Test Plain JSON', () => {
  expect(gendiff('__tests__/__fixtures__/plain/before.json', '__tests__/__fixtures__/plain/after.json'))
    .toBe(`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`);
});

test('Test Plain YAML', () => {
  expect(gendiff('__tests__/__fixtures__/plain/before.yaml', '__tests__/__fixtures__/plain/after.yml'))
    .toBe(`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`);
});

test('Test Plain INI', () => {
  expect(gendiff('__tests__/__fixtures__/plain/before.ini', '__tests__/__fixtures__/plain/after.ini'))
    .toBe(`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`);
});

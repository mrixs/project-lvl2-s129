import gendiff from '../src';

const plainToBe = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

const nestedToBe = `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

test('Test Plain JSON', () => {
  expect(gendiff('__tests__/__fixtures__/plain/before.json', '__tests__/__fixtures__/plain/after.json'))
    .toBe(plainToBe);
});

test('Test Plain YAML', () => {
  expect(gendiff('__tests__/__fixtures__/plain/before.yaml', '__tests__/__fixtures__/plain/after.yml'))
    .toBe(plainToBe);
});

test('Test Plain INI', () => {
  expect(gendiff('__tests__/__fixtures__/plain/before.ini', '__tests__/__fixtures__/plain/after.ini'))
    .toBe(plainToBe);
});


test('Test Nested JSON', () => {
  expect(gendiff('__tests__/__fixtures__/nested/before.json', '__tests__/__fixtures__/nested/after.json'))
    .toBe(nestedToBe);
});

test('Test Nested YAML', () => {
  expect(gendiff('__tests__/__fixtures__/nested/before.yaml', '__tests__/__fixtures__/nested/after.yaml'))
    .toBe(nestedToBe);
});

test('Test Nested INI', () => {
  expect(gendiff('__tests__/__fixtures__/nested/before.ini', '__tests__/__fixtures__/nested/after.ini'))
    .toBe(nestedToBe);
});

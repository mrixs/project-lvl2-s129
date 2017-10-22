import _ from 'lodash';

export const getObjectsDifferences = (object1, object2) => {
  const firstObjectKeys = Object.keys(object1);
  const secondObjectKeys = Object.keys(object2);
  const mixedKeys = _.union(firstObjectKeys, secondObjectKeys);

  const diffArray = mixedKeys.reduce((acc, key) => {
    if ((key in object1) && (key in object2)
    && (object1[key] instanceof Object || object2[key] instanceof Object)) {
      const result = {
        state: '',
        key,
        oldValue: '',
        newValue: '',
        children: getObjectsDifferences(object1[key], object2[key]),
      };
      return [...acc, result];
    }
    if (object1[key] === object2[key]) {
      const result = {
        state: 'unchanged',
        key,
        oldValue: object1[key],
        newValue: object2[key],
        children: [],
      };
      return [...acc, result];
    }
    if (!(key in object2)) {
      const result = {
        state: 'removed',
        key,
        oldValue: object1[key],
        newValue: '',
        children: [],
      };
      return [...acc, result];
    }
    if (!(key in object1)) {
      const result = {
        state: 'added',
        key,
        oldValue: '',
        newValue: object2[key],
        children: [],
      };
      return [...acc, result];
    }
    const result = {
      state: 'changed',
      key,
      oldValue: object1[key],
      newValue: object2[key],
      children: [],
    };
    return [...acc, result];
  }, []);
  return diffArray;
};

export const astToString = (ast) => {
  const iter = (tree, level) => {
    const space = _.repeat(' ', 4 * level);
    const stringify = (element) => {
      if (element instanceof Object) {
        return `{\n${space}        ${JSON.stringify(element).replace(/["]/g, '').replace(/[:]/g, ': ').slice(1, -1)}\n${space}    }`;
      }
      return element;
    };

    const result = tree.reduce((acc, obj) => {
      if (obj.state === 'unchanged') {
        return `${acc}\n${space}    ${obj.key}: ${stringify(obj.oldValue)}`;
      }
      if (obj.state === 'changed') {
        return `${acc}\n${space}  + ${obj.key}: ${stringify(obj.newValue)}\n${space}  - ${obj.key}: ${stringify(obj.oldValue)}`;
      }
      if (obj.state === 'added') {
        return `${acc}\n${space}  + ${obj.key}: ${stringify(obj.newValue)}`;
      }
      if (obj.state === 'removed') {
        return `${acc}\n${space}  - ${obj.key}: ${stringify(obj.oldValue)}`;
      }
      if (obj.children.length !== 0) {
        return `${acc}\n${space}    ${obj.key}: {${iter(obj.children, level + 1)}\n    }`;
      }
      return acc;
    }, '');
    return result;
  };
  return `${iter(ast, 0)}`;
};

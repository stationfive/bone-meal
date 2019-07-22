import copyObjKeys from './copyObjKeys';

describe('utils/DataUtils/copyObjKeys', () => {
  const fixture: Object = {
    a: { c: 2 },
    b: { c: 4 },
  };

  test('copies keys into contained object', () => {
    const expected: Object = {
      a: {c: 2, key: 'a'},
      b: {c: 4, key: 'b'},
    };

    const result: Object = copyObjKeys(fixture);

    expect(result).toEqual(expected);
  });
});

import copyObjKeys from './copyObjKeys';

describe('utils/DataUtils/copyObjKeys', () => {
  const fixture: Record<string, any> = {
    a: { c: 2 },
    b: { c: 4 },
  };

  test('copies keys into contained object', () => {
    const expected: Record<string, any> = {
      a: { c: 2, key: 'a' },
      b: { c: 4, key: 'b' },
    };

    const result: Record<string, any> = copyObjKeys(fixture);

    expect(result).toEqual(expected);
  });
});

import mapObj from './mapObj';

describe('utils/CollectionUtils/mapObj', () => {
  const fixture: Object = { a: 2, b: 4 };
  test('maps an object', () => {
    const expected: Object = { a: 4, b: 6 };

    const result: Object = mapObj((x: number): number => x + 2)(fixture);

    expect(result).toEqual(expected);
  });
});

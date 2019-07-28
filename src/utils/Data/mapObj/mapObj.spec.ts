import mapObj from './mapObj';

describe('utils/CollectionUtils/mapObj', () => {
  const fixture: Record<string, any> = { a: 2, b: 4 };
  test('maps an object', () => {
    const expected: Record<string, any> = { a: 4, b: 6 };

    const result: Record<string, any> = mapObj((x: number): number => x + 2)(
      fixture,
    );

    expect(result).toEqual(expected);
  });
});

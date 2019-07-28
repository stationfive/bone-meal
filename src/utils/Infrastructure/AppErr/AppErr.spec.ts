import AppErr from './AppErr';

describe('utils/Infrastructure/AppErr/AppErr', () => {
  const fixture = {};

  test('', () => {
    const expected = {};

    const result = new AppErr('message');

    expect(result).toEqual(expected);
  });
});

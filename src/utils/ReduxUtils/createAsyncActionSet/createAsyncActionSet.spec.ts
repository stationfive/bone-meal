// import R from 'ramda';
import { makeCreateAsyncActionSet } from './createAsyncActionSet';

describe('utils/ReduxUtils/createAsyncActionSet', () => {
  const createTestAsyncAction = makeCreateAsyncActionSet('TESTNS');

  const asyncActions = createTestAsyncAction('testCamel');

  test('should create correct fetch action name', () => {
    expect(asyncActions.fetch.toString()).toBe('TESTNS/TEST_CAMEL/FETCH');
  });
  test('should create correct success action name', () => {
    expect(asyncActions.success.toString()).toBe('TESTNS/TEST_CAMEL/SUCCESS');
  });
  test('should create correct fail action name', () => {
    expect(asyncActions.fail.toString()).toBe('TESTNS/TEST_CAMEL/FAIL');
  });

  test('fetch action creates', () => {
    const fixture = 'abc';

    const fetchAction = asyncActions.fetch(fixture);

    expect(fetchAction).toEqual({
      type: 'TESTNS/TEST_CAMEL/FETCH',
      payload: fixture,
    });
  });

  test('success action creates', () => {
    const fixture = { a: 'b' };

    const successAction = asyncActions.success(fixture);

    expect(successAction).toEqual({
      type: 'TESTNS/TEST_CAMEL/SUCCESS',
      payload: fixture,
    });
  });

  test('fail action creates', () => {
    const fixture = [1, 2, 3];

    const failAction = asyncActions.fail(fixture);

    expect(failAction).toEqual({
      type: 'TESTNS/TEST_CAMEL/FAIL',
      payload: fixture,
    });
  });

});

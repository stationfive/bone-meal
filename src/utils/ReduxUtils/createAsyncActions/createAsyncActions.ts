import { presetActions, createActions } from '../';
import { camelToSnake } from 'utils/StringUtils';

const createAsyncActions = (
  ns: string,
) => <RequestParams, Response>(
  actionName: string,
) => {
  const actionNameSnake = camelToSnake(actionName);
  return createActions(`${ns}/${actionNameSnake}`)({
    fetch: presetActions.makeIdentity<RequestParams>(),
    success: presetActions.makeIdentity<Response>(),
    fail: presetActions.makeIdentity<any[]>(),
  });
};

export default createAsyncActions;

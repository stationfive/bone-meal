import { presetActions, createActions } from '../';
import { camelToSnake } from 'utils/StringUtils';
import {AsyncActionSet} from "../../../types/Store/AsyncActionSet";

const createAsyncActions = (
  ns: string,
) => <RequestParams, Response>(
  actionName: string,
): AsyncActionSet<RequestParams, Response> => {
  const actionNameSnake = camelToSnake(actionName);
  return createActions(`${ns}/${actionNameSnake}`)({
    fetch: (params: RequestParams) => {},
    success: presetActions.makeIdentity<Response>(),
    fail: presetActions.makeIdentity<any[]>(),
  });
};

/*
  // @ts-ignore - this is immediately fixed below
  let mainAction: AsyncAction<RequestParams, Response> =
    createAction(ns)(actionNameSnake, presetActions.makeIdentity<RequestParams>());

  mainAction.fetch =
    createAction(ns)(`${actionNameSnake}/FETCH`, presetActions.void);
  mainAction.success =
    createAction(ns)(`${actionNameSnake}/SUCCESS`, presetActions.makeIdentity<Response>())
  mainAction.fail =
    createAction(ns)(`${actionNameSnake}/FAIL`, presetActions.makeIdentity<any[]>());

  return mainAction;
 */

export default createAsyncActions;

import { presetActions, makeCreateActions } from '../';
import {AsyncActionSet} from "../../../types/Store/AsyncActionSet";

export const createAsyncActionSet = <RequestParams, Response>(
  actionNameSnake: string,
): AsyncActionSet<RequestParams, Response> => {
  return makeCreateActions(actionNameSnake)({
    fetch: (params: RequestParams) => {},
    success: presetActions.makeIdentity<Response>(),
    fail: presetActions.makeIdentity<any[]>(),
  });
};

export const makeCreateAsyncActionSet = (ns: string) =>
  <RequestParams, Response>(actionNameSnake: string) =>
    createAsyncActionSet(`${ns}/${actionNameSnake}`);

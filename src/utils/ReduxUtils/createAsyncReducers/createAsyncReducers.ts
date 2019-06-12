import { camelToSnake } from "utils/StringUtils";
import {LOADING_STATES} from "types/Store/LoadingStates";
import asyncState from '../asyncState/asyncState';
import {AsyncMeta} from "src/types/Store/AsyncMeta";
import {Action} from "redux-actions";

const createAsyncReducers = (
  ns: string
) => <Response>(
  actionName: string,
) => {
  const actionNameSnake = camelToSnake(actionName);
  return {
    [`${ns}/${actionNameSnake}/FETCH`]: (state: AsyncMeta<Response>, action: Action<null>) =>
      asyncState(LOADING_STATES.LOADING),
    [`${ns}/${actionNameSnake}/SUCCESS`]: (state: AsyncMeta<Response>, action: Action<Response>) =>
      asyncState(LOADING_STATES.COMPLETE, action.payload),
    [`${ns}/${actionNameSnake}/FAIL`]: (state: AsyncMeta<Response>, action: Action<any[]>) =>
      asyncState(LOADING_STATES.ERROR, action.payload),
  }
};

export default createAsyncReducers;

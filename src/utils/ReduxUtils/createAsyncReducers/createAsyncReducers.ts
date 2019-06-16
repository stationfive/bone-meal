import { camelToSnake } from "utils/StringUtils";
import { LOADING_STATES } from "types/Store/LoadingStates";
import { asyncStateOptional } from '..';
import { AsyncMetaOptional } from "types/Store/AsyncMeta";
import { Action } from "redux-actions";

const createAsyncReducers = (
  ns: string
) => <StateType>(
  actionName: string,
) => {
  const actionNameSnake = camelToSnake(actionName);
  return {
    [`${ns}/${actionNameSnake}/FETCH`]: (state: AsyncMetaOptional<StateType>, action: Action<null>) =>
      asyncStateOptional<StateType>(LOADING_STATES.LOADING),
    [`${ns}/${actionNameSnake}/SUCCESS`]: (state: AsyncMetaOptional<StateType>, action: Action<StateType>) =>
      asyncStateOptional(LOADING_STATES.COMPLETE, action.payload),
    [`${ns}/${actionNameSnake}/FAIL`]: (state: AsyncMetaOptional<StateType>, action: Action<any[]>) =>
      asyncStateOptional<StateType>(LOADING_STATES.ERROR, action.payload),
  }
};

export default createAsyncReducers;

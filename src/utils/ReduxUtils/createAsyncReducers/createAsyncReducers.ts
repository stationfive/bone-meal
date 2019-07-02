import { LOADING_STATES } from "types/Store/LoadingStates";
import { asyncData } from '..';
import { AsyncData } from "types/Store/AsyncData";
import { Action } from "redux-actions";

export const createAsyncReducers = <StateType>(
  actionNameSnake: string,
) => {
  return {
    [`${actionNameSnake}_PENDING`]: (state: AsyncData<StateType>, action: Action<undefined>) =>
      asyncData<StateType>(LOADING_STATES.LOADING),
    [`${actionNameSnake}_FULFILLED`]: (state: AsyncData<StateType>, action: Action<StateType>) =>
      asyncData(LOADING_STATES.COMPLETE, action.payload),
    [`${actionNameSnake}_REJECTED`]: (state: AsyncData<StateType>, action: Action<any[]>) =>
      asyncData<StateType>(LOADING_STATES.ERROR, action.payload),
  }
};

export const makeCreateAsyncReducers = (ns: string) =>
  <StateType>(actionNameSnake: string) =>
    createAsyncReducers(`${ns}/${actionNameSnake}`);

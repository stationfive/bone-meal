import { ASYNC_STATUS } from "types/Store/AsyncStatus";
import { asyncData } from '..';
import { AsyncData } from "types/Store/AsyncData";
import { Action } from "redux-actions";

export const createAsyncReducers = <StateType>(
  actionNameSnake: string,
) => {
  return {
    [`${actionNameSnake}_PENDING`]: (state: AsyncData<StateType>, action: Action<undefined>) =>
      asyncData<StateType>(ASYNC_STATUS.LOADING),

    [`${actionNameSnake}_FULFILLED`]: (state: AsyncData<StateType>, action: Action<StateType>) =>
      asyncData(ASYNC_STATUS.COMPLETE, action.payload),

    [`${actionNameSnake}_REJECTED`]: (state: AsyncData<StateType>, action: Action<any[]>) =>
      asyncData<StateType>(ASYNC_STATUS.ERROR, action.payload),
  }
};

export const makeCreateAsyncReducers = (ns: string) =>
  <StateType>(actionNameSnake: string) =>
    createAsyncReducers(`${ns}/${actionNameSnake}`);

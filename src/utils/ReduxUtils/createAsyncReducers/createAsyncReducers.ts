import { ASYNC_STATUS } from 'types/Store/AsyncStatus';
import { AsyncData } from 'types/Store/AsyncData';
import { ValErr } from 'types/ValErr';
import { Action } from 'redux-actions';
import { asyncData } from '../asyncData/asyncData';

export const createAsyncReducers = <StateType>(actionNameSnake: string) => ({
  [`${actionNameSnake}_PENDING`]: () =>
    asyncData<StateType>(ASYNC_STATUS.LOADING),

  [`${actionNameSnake}_FULFILLED`]: (
    state: AsyncData<StateType>,
    action: Action<StateType>,
  ) => asyncData(ASYNC_STATUS.COMPLETE, action.payload),

  [`${actionNameSnake}_REJECTED`]: (
    state: AsyncData<StateType>,
    action: Action<ValErr[]>,
  ) => asyncData<StateType>(ASYNC_STATUS.ERROR, action.payload),
});

export const makeCreateAsyncReducers = (ns: string) => <StateType>(
  actionNameSnake: string,
) => createAsyncReducers<StateType>(`${ns}/${actionNameSnake}`);

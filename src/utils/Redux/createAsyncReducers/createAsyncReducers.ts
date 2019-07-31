import { ASYNC_STATUS } from 'types/store/AsyncStatus';
import { AsyncData } from 'types/store/AsyncData';
import { AppErr } from 'types/AppErr';
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
    action: Action<AppErr[]>,
  ) => asyncData<StateType>(ASYNC_STATUS.ERROR, action.payload),
});

export const makeCreateAsyncReducers = (ns: string) => <StateType>(
  actionNameSnake: string,
) => createAsyncReducers<StateType>(`${ns}/${actionNameSnake}`);

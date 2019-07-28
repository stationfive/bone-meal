import { handleActions } from 'redux-actions';
import { presetReducers, asyncData, createAsyncReducers } from 'utils/Redux';
import { User } from 'types/User';
import { UserState } from 'types/Store/UserState';
import { ASYNC_STATUS } from 'types/Store/AsyncStatus';
import { authActions } from '../actions';

const DEFAULT_STATE: UserState = asyncData(ASYNC_STATUS.INITIAL);

const ns = 'USER';

const reducer = handleActions<UserState, any>(
  {
    [String(authActions.logout)]: presetReducers.makeReset(DEFAULT_STATE),
    ...createAsyncReducers<User>(`${ns}/LOGIN`),
  },
  DEFAULT_STATE,
);

export default reducer;

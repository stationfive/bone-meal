import { handleActions } from 'redux-actions';
import { presetReducers, asyncData, createAsyncReducers } from 'utils/Redux';
import { User } from 'types/User';
import { UserState } from 'types/store/UserState';
import { ASYNC_STATUS } from 'types/store/AsyncStatus';
import { authActions } from '../actions';

const DEFAULT_STATE: UserState = asyncData(ASYNC_STATUS.INITIAL);

const reducer = handleActions<UserState, any>(
  {
    ...createAsyncReducers<User>('AUTH/LOGIN'),
    [String(authActions.logout)]: presetReducers.makeReset(DEFAULT_STATE),
  },
  DEFAULT_STATE,
);

export default reducer;

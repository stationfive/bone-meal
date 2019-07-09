import { handleActions } from "redux-actions";
import {
  presetReducers,
  asyncData,
  createAsyncReducers,
} from "utils/ReduxUtils";
import { User } from 'types/User';
import { UserState } from 'types/Store/UserState';
import { ASYNC_STATUS } from 'types/Store/AsyncStatus';

const DEFAULT_STATE: UserState = asyncData(ASYNC_STATUS.INITIAL);

const ns = 'USER';

const reducer = handleActions<UserState, any>(
  {
    // [userAction.logout.toString()]: presetReducers.empty,
    ...createAsyncReducers<User>(`${ns}/LOGIN`),
  },
  DEFAULT_STATE,
);

export default reducer;

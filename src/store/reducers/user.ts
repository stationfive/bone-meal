import {handleActions} from "redux-actions";
import {
  presetReducers,
  asyncData,
  createAsyncReducers,
} from "utils/ReduxUtils";
import { User } from 'types/User';
import { UserState } from 'types/Store/UserState';
import { LOADING_STATES } from 'types/Store/LoadingStates';

const DEFAULT_STATE: UserState = asyncData(LOADING_STATES.INITIAL);

const ns = 'USER';

const reducer = handleActions<UserState, any>(
  {
    // [userActions.logout.toString()]: presetReducers.empty,
    ...createAsyncReducers<User>(`${ns}/LOGIN`),
  },
  DEFAULT_STATE,
);

export default reducer;

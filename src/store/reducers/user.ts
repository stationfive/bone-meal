import {handleActions} from "redux-actions";
import {
  presetReducers,
  asyncStateOptional,
  createAsyncReducers,
} from "utils/ReduxUtils";
import { User } from 'types/User';
import { UserState } from 'types/Store/UserState';
import { LOADING_STATES } from 'types/Store/LoadingStates';

const DEFAULT_STATE: UserState = asyncStateOptional(LOADING_STATES.INITIAL);

const ns = 'USER';
const asyncReducers = createAsyncReducers(ns);

const reducer = handleActions<UserState, any>(
  {
    // [userActions.logout.toString()]: presetReducers.empty,
    ...asyncReducers<User>('login'),
  },
  DEFAULT_STATE,
);

export default reducer;

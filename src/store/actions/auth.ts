import { User, UserNew } from 'types/User';
import { createActions, createAsyncActions, presetActions } from 'utils/ReduxUtils';

const ns = 'USER';

const asyncUserActions = createAsyncActions(ns);

const authActions = {
  // ...createActions(ns)({
  //   logout: presetActions.void,
  //   updatePreferences: presetActions.makeIdentity<User>(),
  // }),
  login: asyncUserActions<string, User>('login'),
};

export default authActions;

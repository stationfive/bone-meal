import { User, UserNew } from 'types/User';
import {
  makeCreateActions,
  createAsyncActionSet,
  presetActions,
} from 'utils/ReduxUtils';

const ns = 'USER';

const authActions = {
  // ...makeCreateActions(ns)({
  //   logout: presetActions.void,
  //   updatePreferences: presetActions.makeIdentity<User>(),
  // }),
  login: createAsyncActionSet<string, User>(`${ns}/LOGIN`),
};

export default authActions;

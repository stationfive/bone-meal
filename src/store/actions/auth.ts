import { User } from 'types/User';
import {
  // makeCreateActions,
  // createAsyncActionSet,
  presetActions,
} from 'utils/ReduxUtils';
import { createAsyncAction } from 'redux-promise-middleware-actions';
import { login as loginThunk } from "../thunks/auth";


const ns = 'USER';

// const createAsyncAction = <R>(prefix: string, (prom: Promise<R>) => ) =>
//   createAsyncPromiseAction(prefix, () => prom)

const authActions = {
  login: createAsyncAction(`${ns}/LOGIN`, presetActions.makeIdentity<Promise<User>>()),
  // ...makeCreateActions(ns)({
  //   logout: presetActions.void,
  //   updatePreferences: presetActions.makeIdentity<User>(),
  // }),
  // login: createAsyncActionSet<string, User>(`${ns}/LOGIN`),
};

export default authActions;

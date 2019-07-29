import { makeCreateActions, presetActions } from 'utils/Redux';
import { User } from 'types/User';

const ns = 'AUTH';
const createAuthActions = makeCreateActions(ns);

const authActions = createAuthActions({
  login: presetActions.makeAsyncAction<User>(`${ns}/LOGIN`),
  logout: presetActions.noPayload,
});

export default authActions;

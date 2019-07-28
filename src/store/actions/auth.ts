import { makeCreateActions, presetActions } from 'utils/Redux';
import { createAsyncAction } from 'redux-promise-middleware-actions';
import { login as loginThunk } from '../thunks/auth';

const ns = 'USER';

const createAuthActions = makeCreateActions(ns);

const authActions = createAuthActions({
  login: createAsyncAction(`${ns}/LOGIN`, () =>
    fetch('https://us-central1-ch-demo-3a396.cloudfunctions.net/auth/')
      .then((response: any) => response.json())
      .then((jsonData: any) => console.log(jsonData)),
  ),
  logout: presetActions.void,
});

export default authActions;

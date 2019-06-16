import {authActions} from "store/actions";
import makeThunkFetch from "services/fetch/makeThunkFetch";
import {Dispatch} from "redux";

const login = makeThunkFetch(
  {
    fetchConfig: 'https://us-central1-ch-demo-3a396.cloudfunctions.net/auth',
    asyncActionSet: authActions.login,
    transformResponse: (resp: any) => ({
      id: 'abc123',
      email: 'some@email.com',
    })
  },
);

export default {
  login,
}

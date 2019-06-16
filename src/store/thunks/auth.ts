import {authActions} from "store/actions";
import makeThunkFetch from "services/fetch/makeThunkFetch";

const login = makeThunkFetch(
  'https://us-central1-ch-demo-3a396.cloudfunctions.net/auth', // use an API_BASE_URL,
  {
    asyncActionSet: authActions.login,
  },
);

export default {
  login,
}

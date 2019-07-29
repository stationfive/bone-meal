import { authActions } from 'store/actions';
import { Dispatch } from 'redux';
import { Store } from 'types/Store/Store';
// import jsonFetch from 'services/fetch/jsonFetch';

export const login = (credentials: { email: string; password?: string }) => (
  dispatch: Dispatch,
  state: Store,
) => {
  dispatch(
    authActions.login(
      /* Mock external call: */
      new Promise((res, rej) => {
        setTimeout(() => res({ id: '123', email: credentials.email }), 500);
      }),
      /* In practice, use something like: */
      // jsonFetch(
      //   'https://api.your.server/auth',
      //   {
      //     method: 'post',
      //     body: JSON.stringify({ email: credentials.email, pw: credentials.pw }),
      //   }
      // ),
    ),
  );
};
export default {
  login,
};

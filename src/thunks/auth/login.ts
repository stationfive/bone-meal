import { authActions, tokenActions } from 'store/actions';
import { Dispatch } from 'redux';
import { Token } from '../../types/Token';
import { User } from '../../types/User';
// import jsonFetch from 'services/fetch/jsonFetch';

interface AuthResponse {
  data: User;
  token: Token;
}

const login = (credentials: { email: string; password?: string }) => (
  dispatch: Dispatch,
) => {
  dispatch(
    authActions.login(
      /* Mock external call: */
      new Promise<AuthResponse>(res => {
        setTimeout(
          () =>
            res({
              data: {
                id: '123',
                email: credentials.email,
              },
              token: 'abc.123',
            }),
          500,
        );
      })
        /* In practice, use something like: */
        // jsonFetch(
        //   'https://api.your.server/auth',
        //   {
        //     method: 'post',
        //     body: JSON.stringify({ email: credentials.email, pw: credentials.pw }),
        //   }
        // )
        .then(
          ({ data, token }: AuthResponse): User => {
            dispatch(tokenActions.updated(token));
            return data;
          },
        ),
    ),
  );
};

export default login;

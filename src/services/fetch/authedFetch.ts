import { Dispatch } from 'redux';
import { Store } from 'types/store/Store';
import AppErr from 'utils/App/AppErr/AppErr';
import { tokenActions } from '../../store/actions';
import jsonFetch from './jsonFetch';

interface RespWToken {
  token?: string;
}

const authedFetch = <SuccessPayload>(input: string, init: RequestInit = {}) => (
  dispatch: Dispatch,
  getState: () => Store,
): Promise<SuccessPayload> => {
  const { token } = getState();
  if (!token)
    return Promise.reject(new AppErr('Token not set for authedFetch'));

  const filledInit: RequestInit = {
    ...init,
    headers: {
      Authorization: `Bearer ${token || ''}`,
      ...init.headers,
    },
  };

  return jsonFetch(input, filledInit).then(async (response: unknown) => {
    if ((response as RespWToken).token !== undefined) {
      dispatch(tokenActions.updated((response as RespWToken).token as string));
    }
    return response as SuccessPayload;
  });
};

export default authedFetch;

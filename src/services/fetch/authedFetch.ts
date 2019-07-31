import { Dispatch } from 'redux';
import { Store } from 'types/store/Store';
import AppErr from 'utils/App/AppErr/AppErr';
import { tokenActions } from '../../store/actions';
import jsonFetch from './jsonFetch';

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

  return jsonFetch(input, filledInit).then(async (response: any) => {
    if (response.token) {
      dispatch(tokenActions.updated(response.token));
    }
    return response;
  });
};

export default authedFetch;

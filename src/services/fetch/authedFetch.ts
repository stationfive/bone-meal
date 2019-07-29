import { Dispatch } from 'redux';
import { Store } from 'types/Store/Store';
import AppErr from 'utils/Infrastructure/AppErr/AppErr';
import { tokenActions } from '../../store/actions';
import jsonFetch from './jsonFetch';

const authedFetch = <RequestParams, SuccessPayload>(
  input: string,
  init: RequestInit = {},
) => (dispatch: Dispatch, state: Store): Promise<Response> => {
  const { token } = state;
  if (!token) throw new AppErr('Token not set for authedFetch');

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

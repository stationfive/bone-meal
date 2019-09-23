import { handleActions } from 'redux-actions';
import { presetReducers } from 'utils/Redux';
import { TokenState } from 'types/store/TokenState';
import { authActions, tokenActions } from '../actions';

const DEFAULT_STATE: TokenState = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = handleActions<TokenState, any>(
  {
    [String(tokenActions.updated)]: presetReducers.makeSetter<TokenState>(),
    [String(authActions.logout)]: presetReducers.empty,
  },
  DEFAULT_STATE,
);

export default reducer;

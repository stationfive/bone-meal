import { handleActions } from 'redux-actions';
import { presetReducers } from 'utils/Redux';
import { TokenState } from 'types/Store/TokenState';
import { authActions, tokenActions } from '../actions';

const DEFAULT_STATE: TokenState = null;

const reducer = handleActions<TokenState, any>(
  {
    [String(tokenActions.updated)]: presetReducers.makeSet<TokenState>(),
    [String(authActions.logout)]: presetReducers.empty,
  },
  DEFAULT_STATE,
);

export default reducer;

import { handleActions } from 'redux-actions';
import { presetReducers } from 'utils/ReduxUtils';
import { TokenState } from 'types/Store/TokenState';

const DEFAULT_STATE: TokenState = null;

const reducer = handleActions<TokenState, any>(
  {
    'tokenActions.update': presetReducers.makeIdentity<TokenState>(),
    'tokenActions.clear': presetReducers.empty,
  },
  DEFAULT_STATE,
);

export default reducer;

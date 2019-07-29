import { makeCreateActions, presetActions } from 'utils/Redux';
import { TokenState } from 'types/Store/TokenState';

const ns = 'TOKEN';
const createTokenActions = makeCreateActions(ns);

const tokenActions = createTokenActions({
  updated: presetActions.makeIdentity<TokenState>(),
  clear: presetActions.noPayload,
});

export default tokenActions;

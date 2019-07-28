import { createAction, makeCreateActions, presetActions } from 'utils/Redux';
import { TokenState } from 'types/Store/TokenState';

const ns = 'TOKEN';
const createTokenActions = makeCreateActions(ns);

const tokenActions = createTokenActions({
  updated: presetActions.makeIdentity<TokenState>(),
});

export default tokenActions;

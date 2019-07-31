import { makeCreateActions, presetActions } from 'utils/Redux';
import { ExampleListing } from 'types/ExampleListing';

const ns = 'EXAMPLE';
const createAuthActions = makeCreateActions(ns);

const authActions = createAuthActions({
  getListings: presetActions.makeAsyncAction<ExampleListing[]>(
    `${ns}/GET_LISTINGS`,
  ),
});

export default authActions;

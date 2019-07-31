import { exampleActions } from 'store/actions';
import { Dispatch } from 'redux';
import { Store } from 'types/store/Store';
import authedFetch from 'services/fetch/authedFetch';
import { ExampleListing } from 'types/ExampleListing';

export const getListings = () => (
  dispatch: Dispatch,
  getState: () => Store,
) => {
  dispatch(
    exampleActions.getListings(
      authedFetch<ExampleListing[]>('https://api.your.server/endpoint')(
        dispatch,
        getState,
      ),
    ),
  );
};

export default getListings;

import { handleActions } from 'redux-actions';
import { asyncData, createAsyncReducers, presetReducers } from 'utils/Redux';
import { ExampleListingState } from 'types/store/ExampleListingState';
import { ASYNC_STATUS } from 'types/store/AsyncStatus';
import { authActions } from '../actions';
import { ExampleListing } from '../../types/ExampleListing';

const DEFAULT_STATE: ExampleListingState = asyncData(ASYNC_STATUS.INITIAL);

const reducer = handleActions<ExampleListingState, any>(
  {
    ...createAsyncReducers<ExampleListing[]>('EXAMPLE/GET_LISTINGS'),
    [String(authActions.logout)]: presetReducers.makeReset(DEFAULT_STATE),
  },
  DEFAULT_STATE,
);

export default reducer;

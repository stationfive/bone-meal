import { LocationState } from 'redux-first-router';
import { UserState } from './UserState';
import { TokenState } from './TokenState';
import { ExampleListingState } from './ExampleListingState';

export interface Store {
  location: LocationState;
  token: TokenState;
  user: UserState;
  exampleListing: ExampleListingState;
}

import { LocationState } from 'redux-first-router';
import { UserState } from './UserState';
import { TokenState } from './TokenState';

export type Store = {
  location: LocationState,
  token: TokenState,
  user: UserState,
}

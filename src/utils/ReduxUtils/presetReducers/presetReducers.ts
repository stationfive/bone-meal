import { Action } from 'types/Action';

export default {
  makeIdentity: <T>() => (state: T, action: Action<T>): T => action.payload,
  makeUpdate: <T extends {}>() => (
    state: T,
    action: Action<Partial<T>>,
  ): T => ({
    ...state,
    ...action.payload,
  }),
  makeReset: <T>(initState: T) => (): T => initState,
  empty: (): null => null,
};

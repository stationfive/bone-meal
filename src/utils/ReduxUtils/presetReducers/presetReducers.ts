import {Action} from "types/Action";

export default {
  makeIdentity: <T>() => (state: T, action: Action<T>) => action.payload,
  makeUpdate: <T extends {}>() => (state: T, action: Action<Partial<T>>) => ({ ...state, ...action.payload }),
  makeReset: <T>(initState: T) => (state: T) => initState,
  empty: (state: any) => null,
}

import { AsyncData } from "types/Store/AsyncData";
import {LOADING_STATES} from "types/Store/LoadingStates";
import {Optional} from "../../TypeUtils/Optional";

export function asyncData<T>(state: LOADING_STATES.INITIAL, data?: Optional<T>, _?: Optional<T>): AsyncData<T>;
export function asyncData<T>(state: LOADING_STATES.LOADING, data?: Optional<T>, _?: Optional<T>): AsyncData<T>;
export function asyncData<T>(state: LOADING_STATES.COMPLETE, data: T, _?: Optional<T>): AsyncData<T>;
export function asyncData<T>(state: LOADING_STATES.ERROR, errors: any[], data?: Optional<T>): AsyncData<T>;
export function asyncData<T>(state: LOADING_STATES, errorsOrData: any, data?: Optional<T>): AsyncData<T> {
  if (state & LOADING_STATES.LOADING) {
    return {
      errors: [],
      state: LOADING_STATES.LOADING,
      data: errorsOrData,
    };
  } else if (state & (LOADING_STATES.COMPLETE | LOADING_STATES.INITIAL)) {
    return {
      errors: [],
      state,
      data: errorsOrData,
    }
  } else {
    return {
      errors: errorsOrData,
      state: LOADING_STATES.ERROR,
      data,
    }
  }
}

import {AsyncMeta, AsyncMetaOptional} from "types/Store/AsyncMeta";
import {LOADING_STATES} from "types/Store/LoadingStates";

export function asyncState<T>(state: LOADING_STATES.LOADING, data: T, _?: T): AsyncMeta<T>;
export function asyncState<T>(state: LOADING_STATES.COMPLETE, data: T, _?: T): AsyncMeta<T>;
export function asyncState<T>(state: LOADING_STATES.ERROR, errors: any[], data: T): AsyncMeta<T>;
export function asyncState<T>(state: LOADING_STATES, errorsOrData: any, data: T): AsyncMeta<T> {
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
      state,
      data,
    }
  }
}

export function asyncStateOptional<T>(state: LOADING_STATES.INITIAL, data?: T | undefined): AsyncMetaOptional<T>;
export function asyncStateOptional<T>(state: LOADING_STATES.LOADING, data?: T | undefined): AsyncMetaOptional<T>;
export function asyncStateOptional<T>(state: LOADING_STATES.COMPLETE, data: T): AsyncMetaOptional<T>;
export function asyncStateOptional<T>(state: LOADING_STATES.ERROR, errors: any[]): AsyncMetaOptional<T>;
export function asyncStateOptional<T>(state: LOADING_STATES, errorsOrData: any): AsyncMetaOptional<T> {
  if (state & LOADING_STATES.LOADING) {
    return {
      errors: [],
      state: LOADING_STATES.LOADING,
      data: undefined,
    };
  } else if (state & (LOADING_STATES.COMPLETE | LOADING_STATES.INITIAL)) {
    return {
      errors: [],
      state: state,
      data: errorsOrData,
    }
  } else {
    return {
      errors: errorsOrData,
      state: LOADING_STATES.ERROR,
      data: undefined,
    };
  }
}

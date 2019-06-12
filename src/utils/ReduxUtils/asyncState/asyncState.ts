import {AsyncMeta} from "types/Store/AsyncMeta";
import {LOADING_STATES} from "src/types/Store/LoadingStates";

function asyncState<T>(state: LOADING_STATES.LOADING, data?: null): AsyncMeta<T>;
function asyncState<T>(state: LOADING_STATES.COMPLETE, data: T): AsyncMeta<T>;
function asyncState<T>(state: LOADING_STATES.INITIAL, data: T | null): AsyncMeta<T>;
function asyncState<T>(state: LOADING_STATES.ERROR, errors: any[]): AsyncMeta<T>;
function asyncState<T>(state: LOADING_STATES.LOADING | LOADING_STATES.COMPLETE | LOADING_STATES.INITIAL | LOADING_STATES.ERROR, errorsOrData: any): AsyncMeta<T> {
  if (state & LOADING_STATES.LOADING) {
    return {
      errors: [],
      state: LOADING_STATES.LOADING,
      data: null,
    };
  } else if (state & (LOADING_STATES.COMPLETE | LOADING_STATES.INITIAL)) {
    return {
      errors: [],
      state,
      data: errorsOrData === undefined ? null : errorsOrData,
    }
  } else {
    return {
      errors: errorsOrData,
      state,
      data: null,
    }
  }
}

export default asyncState;

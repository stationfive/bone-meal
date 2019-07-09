import { AsyncData } from "types/Store/AsyncData";
import {ASYNC_STATUS} from "types/Store/AsyncStatus";
import {Optional} from "../../TypeUtils/Optional";

export function asyncData<T>(status: ASYNC_STATUS.INITIAL, data?: Optional<T>, _?: Optional<T>): AsyncData<T>;
export function asyncData<T>(status: ASYNC_STATUS.LOADING, data?: Optional<T>, _?: Optional<T>): AsyncData<T>;
export function asyncData<T>(status: ASYNC_STATUS.COMPLETE, data: T, _?: Optional<T>): AsyncData<T>;
export function asyncData<T>(status: ASYNC_STATUS.ERROR, errors: any[], data?: Optional<T>): AsyncData<T>;
export function asyncData<T>(status: ASYNC_STATUS, errorsOrData: any, data?: Optional<T>): AsyncData<T> {
  if (status & ASYNC_STATUS.LOADING) {
    return {
      errors: [],
      status: ASYNC_STATUS.LOADING,
      data: errorsOrData,
    };
  } else if (status & (ASYNC_STATUS.COMPLETE | ASYNC_STATUS.INITIAL)) {
    return {
      errors: [],
      status,
      data: errorsOrData,
    }
  } else {
    return {
      errors: errorsOrData,
      status: ASYNC_STATUS.ERROR,
      data,
    }
  }
}

import { AsyncData } from 'types/Store/AsyncData';
import { ASYNC_STATUS } from 'types/Store/AsyncStatus';
import { ValErr } from 'types/ValErr';
import { Optional } from 'utils/TypeUtils/Optional';

export function asyncData<T>(
  status: ASYNC_STATUS.INITIAL,
  data?: Optional<T>,
  _?: Optional<T>,
): AsyncData<T>;
export function asyncData<T>(
  status: ASYNC_STATUS.LOADING,
  data?: Optional<T>,
  _?: Optional<T>,
): AsyncData<T>;
export function asyncData<T>(
  status: ASYNC_STATUS.COMPLETE,
  data: T,
  _?: Optional<T>,
): AsyncData<T>;
export function asyncData<T>(
  status: ASYNC_STATUS.ERROR,
  errors: ValErr[],
  data?: Optional<T>,
): AsyncData<T>;
export function asyncData<T>(
  status: ASYNC_STATUS,
  errorsOrData: ValErr[] | T,
  data?: Optional<T>,
): AsyncData<T> {
  if (status & ASYNC_STATUS.LOADING) {
    return {
      errors: [],
      status: ASYNC_STATUS.LOADING,
      data: errorsOrData as T,
    };
  }
  if (status & (ASYNC_STATUS.COMPLETE | ASYNC_STATUS.INITIAL)) {
    return {
      errors: [],
      status,
      data: errorsOrData as T,
    };
  }
  return {
    errors: errorsOrData as ValErr[],
    status: ASYNC_STATUS.ERROR,
    data,
  };
}

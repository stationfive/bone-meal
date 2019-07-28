import { AsyncData } from 'types/Store/AsyncData';
import { ASYNC_STATUS } from 'types/Store/AsyncStatus';
import { AppErr } from 'types/AppErr';
import { Optional } from 'utils/Type/Optional';

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
  errors: AppErr[],
  data?: Optional<T>,
): AsyncData<T>;
export function asyncData<T>(
  status: ASYNC_STATUS,
  errorsOrData: AppErr[] | T,
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
    errors: errorsOrData as AppErr[],
    status: ASYNC_STATUS.ERROR,
    data,
  };
}

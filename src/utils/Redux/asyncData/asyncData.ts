import { AsyncData } from 'types/store/AsyncData';
import { ASYNC_STATUS } from 'types/store/AsyncStatus';
import { AppErr } from 'types/AppErr';
import { Optional } from 'types/util/Optional';

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
  // eslint-disable-next-line no-bitwise
  if (status & ASYNC_STATUS.LOADING) {
    return {
      errors: [],
      status: ASYNC_STATUS.LOADING,
      data: errorsOrData as T,
    };
  }
  // eslint-disable-next-line no-bitwise
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

import { useState } from 'react';
import { AsyncData } from 'types/store/AsyncData';
import { ASYNC_STATUS } from 'types/store/AsyncStatus';
import { Optional } from 'types/util/Optional';
import { asyncData } from '../Redux';

export default function useAsyncState<PromParams extends any[], Response>(
  asyncFn: (...params: PromParams) => Promise<Response>,
  initData?: Optional<Response>,
): [AsyncData<Response>, (...params: PromParams) => void] {
  const [state, setState] = useState(asyncData(ASYNC_STATUS.INITIAL, initData));

  function getState(...params: PromParams) {
    setState(asyncData(ASYNC_STATUS.LOADING));
    asyncFn(...params)
      .then(val => {
        setState(asyncData(ASYNC_STATUS.COMPLETE, val));
      })
      .catch(err => {
        setState(asyncData(ASYNC_STATUS.ERROR, err));
      });
  }

  return [state, getState];
}

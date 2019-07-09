import {useState} from 'react';
import {AsyncData} from "types/Store/AsyncData";
import {asyncData} from "../ReduxUtils";
import {ASYNC_STATUS} from "../../types/Store/AsyncStatus";
import {Optional} from "../TypeUtils/Optional";

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

import {useState} from 'react';
import {AsyncData} from "types/Store/AsyncData";
import {asyncData} from "../ReduxUtils";
import {LOADING_STATES} from "../../types/Store/LoadingStates";
import {Optional} from "../TypeUtils/Optional";

export default function useAsyncState<PromParams extends any[], Response>(
  asyncFn: (...params: PromParams) => Promise<Response>,
  initData?: Optional<Response>,
): [AsyncData<Response>, (...params: PromParams) => void] {
  const [state, setState] = useState(asyncData(LOADING_STATES.INITIAL, initData));

  function getState(...params: PromParams) {
    setState(asyncData(LOADING_STATES.LOADING));
    asyncFn(...params)
      .then(val => {
        setState(asyncData(LOADING_STATES.COMPLETE, val));
      })
      .catch(err => {
        setState(asyncData(LOADING_STATES.ERROR, err));
      });
  }

  return [state, getState];
}

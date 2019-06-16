import { LOADING_STATES } from "./LoadingStates";
import { Optional } from "utils/TypeUtils/Optional";


export type AsyncMeta<T> = {
  state: LOADING_STATES,
  errors: {}[],
  data: T,
};


type AsyncMetaInitialOptional<T> = {
  state: LOADING_STATES.INITIAL,
  errors: {}[],
  data: Optional<T>,
}

type AsyncMetaCompleteOptional<T> = {
  state: LOADING_STATES.ERROR,
  errors: [],
  data: T,
}

export type AsyncMetaOptional<T> = {
  state: LOADING_STATES.ERROR | LOADING_STATES.LOADING,
  errors: {}[],
  data: undefined,
} | AsyncMetaCompleteOptional<T>
  | AsyncMetaInitialOptional<T>

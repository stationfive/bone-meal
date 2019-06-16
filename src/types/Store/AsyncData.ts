import { LOADING_STATES } from "./LoadingStates";
import { Optional } from "utils/TypeUtils/Optional";

export type AsyncData<T> = {
  state: LOADING_STATES.INITIAL,
  errors: [],
  data: Optional<T>,
} | {
  state: LOADING_STATES.LOADING,
  errors: [],
  data: Optional<T>,
} | {
  state: LOADING_STATES.ERROR,
  errors: {}[],
  data: Optional<T>,
} | {
  state: LOADING_STATES.COMPLETE,
  errors: [],
  data: T,
}

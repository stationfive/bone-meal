import { LOADING_STATES } from "./LoadingStates";

export type AsyncMeta<T> = {
  errors: {}[],
  state: LOADING_STATES,
  data: T,
}

export type AsyncMetaNullable<T> = {
  errors: {}[],
  state: LOADING_STATES,
  data: T | null,
}

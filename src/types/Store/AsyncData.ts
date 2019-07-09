import { ASYNC_STATUS } from "./AsyncStatus";
import { Optional } from "utils/TypeUtils/Optional";

export type AsyncData<T> = {
  status: ASYNC_STATUS.INITIAL,
  errors: [],
  data: Optional<T>,
} | {
  status: ASYNC_STATUS.LOADING,
  errors: [],
  data: Optional<T>,
} | {
  status: ASYNC_STATUS.ERROR,
  errors: {}[],
  data: Optional<T>,
} | {
  status: ASYNC_STATUS.COMPLETE,
  errors: [],
  data: T,
}

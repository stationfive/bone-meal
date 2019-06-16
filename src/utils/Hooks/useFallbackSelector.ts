import {useSelector} from "react-redux";
import {Optional} from "utils/TypeUtils/Optional";
import {fallback} from "utils/DataUtils";

const useFallbackSelector = <Store, Value>(
  fn: (optimisticObj: Required<Store>) => Optional<Value>,
  defaultVal: Value
) => useSelector(fallback<Store, Value>(fn, defaultVal));

export default useFallbackSelector;

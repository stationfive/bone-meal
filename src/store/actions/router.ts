import { Action } from 'types/Action';
import { RouteDef } from 'types/RouteDef';

const link: Function = <P>(
  nextRoute: RouteDef,
  payload: P,
): Action<P> => ({
  type: `ROUTER/${nextRoute.name}`,
  payload,
});

export default {
  link,
};

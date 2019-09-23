import { NOT_FOUND } from 'redux-first-router';
import ROUTES from 'routes';
import { RouteDef } from '../../types/RouteDef';
import useSelectorSafe from './useSelectorSafe';

const useCurrentRoute = (): RouteDef => {
  const location = useSelectorSafe<string>(
    state => state.location.type,
    NOT_FOUND,
  );
  return location === NOT_FOUND
    ? ROUTES.NOT_FOUND
    : // strip the `ROUTER/` prefix to find in route map
      ROUTES[location.substr(7)];
};

export default useCurrentRoute;

import { NOT_FOUND } from 'redux-first-router';

export const ROUTER_NAMESPACE: string = 'ROUTER';

export const ROUTES = {
  ROOT: `${ROUTER_NAMESPACE}/ROOT`,
  EXAMPLE: `${ROUTER_NAMESPACE}/EXAMPLE`,
  NOT_FOUND,
};

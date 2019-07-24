import { NOT_FOUND as RFR_NOT_FOUND } from 'redux-first-router';
import { Omit } from 'utils/TypeUtils/Omit';
import { RouteDef } from 'types/RouteDef';
import { copyObjKeys } from 'utils/DataUtils';

const ROUTES: { [k: string]: RouteDef | Omit<RouteDef, 'name'> } = {
  ROOT: {
    component: 'Home',
    path: '/',
  },
  EXAMPLE: {
    component: 'ExamplePage',
    path: '/eg/:slug',
  },
  NOT_FOUND: {
    component: 'NotFound',
    path: '/404',
    name: RFR_NOT_FOUND,
  },
};

export default copyObjKeys(ROUTES, 'name');

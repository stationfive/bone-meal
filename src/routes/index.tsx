import { NOT_FOUND as RFR_NOT_FOUND } from 'redux-first-router';
import { RouteDef } from 'types/RouteDef';
import { copyObjKeys } from 'utils/Data';
import { makeAuthGuard } from '../components/core/AuthGuard';

interface RouteDefMap {
  [k: string]: RouteDef;
}

const ROUTES: RouteDefMap = copyObjKeys<RouteDef, RouteDefMap>(
  {
    ROOT: {
      component: 'Home',
      path: '/',
    },
    EXAMPLE: {
      component: 'ExamplePage',
      path: '/eg',
      middleware: () =>
        makeAuthGuard({
          allowAuthed: true,
          redirectAnon: ROUTES.ROOT,
        }),
    },
    NOT_FOUND: {
      component: 'NotFound',
      id: RFR_NOT_FOUND,
      path: '/404',
    },
  },
  'id',
);

export default ROUTES;

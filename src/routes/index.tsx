import React from 'react';
import { NOT_FOUND as RFR_NOT_FOUND } from 'redux-first-router';
import { RouteDef } from 'types/RouteDef';
import { copyObjKeys } from 'utils/Data';
import { makeAuthGuard } from '../components/AuthGuard';

const ROUTES: { [k: string]: RouteDef } = {
  ROOT: {
    component: 'Home',
    path: '/',
    middleware: () =>
      makeAuthGuard({
        allowAnon: true,
        redirectAuthed: ROUTES.EXAMPLE,
      }),
  },
  EXAMPLE: {
    component: 'ExamplePage',
    path: '/eg/:slug',
    middleware: () =>
      makeAuthGuard({
        allowAuthed: true,
        redirectAnon: ROUTES.ROOT,
      }),
  },
  NOT_FOUND: {
    component: 'NotFound',
    path: '/404',
    name: RFR_NOT_FOUND,
  },
};

export default copyObjKeys(ROUTES, 'name') as { [k: string]: RouteDef };

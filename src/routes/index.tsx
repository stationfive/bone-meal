import React, { ReactComponentElement } from 'react';
import { NOT_FOUND as RFR_NOT_FOUND } from 'redux-first-router';
import { RouteDef } from 'types/RouteDef';
import { copyObjKeys } from 'utils/DataUtils';

const ROUTES: { [k: string]: RouteDef } = {
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

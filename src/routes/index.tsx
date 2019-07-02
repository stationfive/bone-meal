import React, { ReactComponentElement } from 'react';
import { ROUTES } from 'consts';

export default {
  [ROUTES.ROOT]: {
    component: 'Home',
    path: '/',
  },
  [ROUTES.EXAMPLE]: {
    component: 'ExamplePage',
    path: '/eg/:slug',
  },
  [ROUTES.NOT_FOUND]: {
    component: 'NotFound',
    path: '/404',
  },
};

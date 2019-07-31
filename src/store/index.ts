import {
  applyMiddleware,
  compose,
  createStore,
  Reducer,
  Middleware,
  StoreEnhancer,
  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRoutes } from 'redux-first-router';
import {
  persistCombineReducers,
  persistStore,
  PersistConfig,
  Persistor,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import promise from 'redux-promise-middleware';
import queryString from 'query-string';
import ROUTES from 'routes';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { fallback } from '../utils/Data';

const isProd: boolean =
  fallback<NodeJS.Process, string>(p => p.env.NODE_ENV, '', process) ===
  'production';

const routerConfig: Record<string, any> = {
  initialDispatch: false,
  querySerializer: queryString,
};

const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  whitelist: ['token', 'user'],
};

// Transform ROUTES to have `ROUTER/` prefix and map to path
const routePaths = Object.keys(ROUTES).reduce(
  (processedRoutes, routeKey) => ({
    ...processedRoutes,
    [`ROUTER/${routeKey}`]: ROUTES[routeKey].path,
  }),
  {},
);

const router: {
  reducer: Reducer;
  middleware: Middleware;
  enhancer: StoreEnhancer;
  initialDispatch?: () => void;
} = connectRoutes(routePaths, routerConfig);

const combinedReducer: Reducer = persistCombineReducers(
  persistConfig,
  // @ts-ignore
  {
    ...reducers,
    location: router.reducer,
  },
);

const middlewareEnhancer: Function = applyMiddleware(
  router.middleware,
  thunk,
  promise,
);

const composedEnhancers: StoreEnhancer = (isProd
  ? compose
  : composeWithDevTools)(
  router.enhancer,
  // @ts-ignore
  middlewareEnhancer,
);

const store: Store = createStore(combinedReducer, composedEnhancers);

const persistor: Persistor = persistStore(store, undefined, () => {
  if (router.initialDispatch !== undefined) router.initialDispatch();
});

export default {
  store,
  persistor,
};

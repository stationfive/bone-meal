import {
  applyMiddleware,
  compose,
  createStore,
  Reducer,
  Middleware,
  StoreEnhancer, Store,
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
import promise from 'redux-promise-middleware'
import queryString from 'query-string';
import routes from 'routes';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {mapObj} from "../utils/DataUtils";

const isProd: boolean = process.env.NODE_ENV === 'production';

const routerConfig: Object = {
  initialDispatch: false,
  querySerializer: queryString,
};

const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'token',
  ],
};


// Transform ROUTES to have `ROUTER/` prefix and map to path
const routePaths = Object.keys(routes).reduce(
  (processedRoutes, routeKey) => ({
    ...processedRoutes,
    [`ROUTER/${routeKey}`]: routes[routeKey].path,
  }),
  {},
);

const router: {
  reducer: Reducer,
  middleware: Middleware,
  enhancer: StoreEnhancer,
  initialDispatch?: () => void,
} = connectRoutes(routePaths, routerConfig);

const combinedReducer: Reducer = persistCombineReducers(
  persistConfig,
  // @ts-ignore
  {
    ...reducers,
    location: router.reducer,
  },
);

const middlewareEnhancer: Function =
  applyMiddleware(
    router.middleware,
    thunk,
    promise,
  );

const composedEnhancers: StoreEnhancer = (isProd ? compose : composeWithDevTools)(
  router.enhancer,
  // @ts-ignore
  middlewareEnhancer,
);

const store: Store = createStore(
  combinedReducer,
  composedEnhancers,
);

const persistor: Persistor = persistStore(store, undefined, () => {
  if (router.initialDispatch !== undefined) router.initialDispatch();
});

export default ({
  store,
  persistor,
});

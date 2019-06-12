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
import queryString from 'query-string';
import { PATHS } from 'consts';
// import reducers from './reducers';

const isProd: boolean = process.env.NODE_ENV === 'production';

const routerConfig: Object = {
  initialDispatch: false,
  querySerializer: queryString,
};

const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'activeTheme',
  ],
};

const router: {
  reducer: Reducer,
  middleware: Middleware,
  enhancer: StoreEnhancer,
  initialDispatch?: () => void,
} = connectRoutes(PATHS, routerConfig);

const combinedReducer: Reducer = persistCombineReducers(
  persistConfig,
  {
    //...reducers,
    location: router.reducer,
  },
);

const middlewareEnhancer: Function =
  applyMiddleware(
    router.middleware,
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

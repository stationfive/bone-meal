import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storeConfig from 'store';
import { Router } from 'components/core';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import theme from './themeConfig/theme';
import RouteComponents from './routes';
import * as serviceWorker from './serviceWorker';

const root: HTMLElement | null = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Provider store={storeConfig.store}>
        <PersistGate persistor={storeConfig.persistor}>
          <Router components={RouteComponents} />
        </PersistGate>
      </Provider>
      <CssBaseline />
    </ThemeProvider>,
    root,
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

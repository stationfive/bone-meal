## Todo
 - MakeAuthedFetch
 - CodeGen
 - examplify useAsyncSelector (is this needed?)
 - authenticatedRoute
 - expand with params like authenticate: asyncThunkFetch(fetch, { store config stuff like name })
 - add in thunks ExamplePage
 - example of lifecycle hook for onpage-load
 - example of redux-listener (for commonly triggered)
 - add lastUpdated in AsyncData
 - obviate redux and use context
 - define custom error for AsyncData['errors']
 - ? Should store be grouped by domain rather than type 
 - Modals / confirmation 
---


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Architecture / how-to

#### Routes...

...are defined in `/src/routes/index.tsx` and corresponding directories, e.g. `/src/routes/MyRoute/`.

A route is defined as: 

```
  MY_ROUTE: {
    component: 'MyRoute',
    path: '/your/route-path/',
  },
  ROUTE_WITH_PATH_PARAM: {
    component: 'ParamRoute',
    path: '/static-bit/:paramBit',
  },
```

The route definition object will be passed to your route as the prop `route`, just in case you need
it, or want to define any meta-data (e.g. auth permissioning).

(Module: redux-first-router) handles most of this, and navigation is all available through redux.

To initiate navigation to a page, dispatch a `/src/store/actions/router.link` action with a reference
to the route.  E.g.:

```
dispatch(routerActions.link(ROUTES.MY_ROUTE));
```

**Important:** the 'component' value of your route *needs to match* a 
folder name under `/src/routes/`.  The default export from that folder will be automatically 
lazy-loaded upon browsing to the path.  (`create route` will handle this for you anyway).


#### Components...

 - Use hooks: for state, lifecycle, redux / global state
 - Separate this complex/stateful logic into the 'MyComponent.container.tsx' file
 - Define template with minimal logic in 'MyComponent.view.tsx' file
 - Define the props in your 'MyComponent.props.ts' file

todo

#### Redux state...

The data type of the redux store is defined in `/src/types/Store/Store.ts`. It looks something like:

```
import { LocationState } from 'redux-first-router';
import { UserState } from './UserState';
import { TokenState } from './TokenState';

export type Store = {
  location: LocationState,
  token: TokenState,
  user: UserState,
}
```

Each reducer has a state type defined.  Often this can be a simple alias to another type
of data, an object map of other types, or in the case of a reducer used to store asynchronous data,
use the AsyncData generic.

We recommend defining your data type separately (e.g. under `/src/types/`) to your Store type, as
often the store grows to hold more data and you will need to make this distinction. 

#### Making asynchronous requests 

## Code-generation

\**Still todo*\*

BoneMeal comes with code creation to speed things up.

**Routes**

`npm run create route MyNewRoute`

**Components**

`npm run create route MyNewComponent`

**Types**

`npm run create type MyNewType`

**Redux**

This will add a new reducer key to redux, including types if they do not already exist. 

`npm run create redux:reducer MyReducer`

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

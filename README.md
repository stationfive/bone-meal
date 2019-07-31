# React Bone-Meal

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

Correct typing is paramount to a successful and bug-free implementation.  Once mastered, it adds
minimal overhead to the effort required (can even speed up development time), assists in
clarity of code, raises and eliminates potential bugs far before they otherwise would be noticed.

### Routes...

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

The route definition object will be passed to your route component in a prop named `route`, just
in case you need it, or want to define any meta-data on the object.

(Module: redux-first-router) handles most of this, and navigation is all available through redux.

To initiate navigation to a page, dispatch a `/src/store/actions/router:link` action, passing a
reference to the route as the argument.  E.g.:

```
dispatch(routerActions.link(ROUTES.MY_ROUTE));
```

**Important:** the 'component' value of your RouteDef *needs to match* the desired
folder name under `/src/routes/`.  The default export from that folder will be automatically 
lazy-loaded upon browsing to the path.  (`create route` will handle this for you anyway).


### Components...

 - Use hooks: for state, lifecycle, redux / global state
 - Separate this complex/stateful logic into the 'MyComponent.container.tsx' file
 - Define template with minimal logic in 'MyComponent.view.tsx' file
 - Define the props in your 'MyComponent.props.ts' file


### Redux state...

The data type of the redux store is defined in `/src/types/store/Store.ts`. It will look something
like (for example):

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

Each reducer has it's state type defined (in `/src/types/store/...`.  Often this can be a simple
alias to another type of data, an object map of other types, or in the case of a reducer used to
store asynchronous data,
use the AsyncData generic.

We recommend defining the type definition of the entity separately to your Store type
(e.g. under `/src/types/`) for clarity.

You may find the following type utility definitions helpful:

```
// A standardised interface for asynchronous data
import { AsyncData } from 'types/store/AsyncData';

// Shortcut to `MyType | null`
import { Nullable } from 'types/util/Nullable';

// Shortcut to `MyType | undefined`
import { Optional } from 'types/util/Optional';

// To omit a key from another object type
import { Omit } from 'types/util/Omit';
```

### Redux actions and reducers

Actions should generally be thought of as disconnected from the management of storing the data.

The reasons for this are:
 - actions can sometimes trigger a change in state of multiple reducers
 - sometimes actions can trigger other actions (or thunks / sagas)

_An action describes what has happened with the `type` of action, and the data pertaining to the
action in the `payload`_

_A reducer describes how stored data should change in response to an action_

As a result there is not necessarily 1:1 relationship between actions and reducers.  In the spirit
of efficient programming, it often is the case, but it is easy to forget the above and hence why
it is mentioned here.

#### Actions

Actions (or more accurately, action-creators) can be easily defined using an object map.  It is
 similar to the `redux-action` philosophy.
 
See the below example:

```
import { makeCreateActions, presetActions } from 'utils/Redux';
import { User } from 'types/User';

// Define the namespace for this set of actions
const ns = 'AUTH';
// this is required to assign the namespace to the createActions function
const createAuthActions = makeCreateActions(ns);

/**
 * The following takes a map of { [actionName: string]: payloadCreatorFunction }
 * where the payloadCreatorFunction accepts some data, and its return will be
 * placed in the action's payload.
 */
const authActions = createAuthActions({
  /**
   * presetActions.makeIdentity: creates a function which takes a single argument
   * and returns that same argument for the payload
   *
   * It takes a type parameter to specify the type of argument it should accept
   */
  updateProfile: presetActions.makeIdentity<User>(),
  
  /**
   * presetActions.noPayload: creates a function which takes no arguments and
   * does not return anything (void)
   *
   * This is useful for actions where there is no payload data (only the `type`)
   */
  logout: presetActions.noPayload,
});

// -----

// Calling the above results in the following:
authActions.updateProfile({ id: 'abc123', email: 'no@email.com' });

// will result in the following action:
{
  type: 'AUTH/UPDATE_PROFILE',
  payload: { id: 'abc123', email: 'no@email.com' },
}

// and
authActions.logout();

// to:
{
  type: 'AUTH/LOGOUT',
}
```

#### Reducers

```
const reducer = handleActions<UserState, any>(
  {
    [String(authActions.logout)]: presetReducers.makeReset(DEFAULT_STATE),
    [String(authActions.updateProfile)]: presetReducers.makeSetter<UserState>(),
  },
  DEFAULT_STATE,
);
```

/!\ Todo: documentation on this

### Making asynchronous requests 

#### Single-purpose requests

Requests that will only be used on one screen should be stored along-side the component.

Use the `useAsyncData` hook in the component's container, initiate the request
when required (possibly in `useEffect` pseudo on-mount), and manage the response as per standard
useState style.

#### Saving response in redux store

This has historically been cumbersome and is the target of much of what this boilerplate seeks
to solve.

`redux-promise-middleware` and `redux-promise-middleware-actions` libraries are heavily leveraged.
Please reference documentation for these as starting point. 

As per the redux actions section above, there is a `presetAction` to create an asynchronous action.

**Define action definition**

```
// src/store/actions/auth
const authActions = createAuthActions({
  /**
   * presetActions.makeAsyncAction: creates an function which takes a promise and returns an 
   * set of asynchronous actions for consumption by redux-promise-middleware
   *
   * It takes a type parameter to specify the type of response the promise will resolve to
   *
   * (Note that you will need to pass in the action type with namespace, unlike other presetActions)
   */
  login: presetActions.makeAsyncAction<User>(`${ns}/LOGIN`),
})
```

**Define thunk for the business logic**

Separately, you should define the business logic that will run as part of this async action.

Define this in: `/src/thunks/{domain}/...`

E.g. The below makes a post fetch request

```
// src/thunks/auth/login.ts

const login = (credentials: Credentials) => (
  dispatch: Dispatch,
) => {
  dispatch(
    authActions.login(
      jsonFetch(
        'https://api.your.server/auth',
        {
          method: 'post',
          body: JSON.stringify(credentials),
        }
      )
    ),
  );
};
```

_(Note: the above example does not need to be a thunk, and could be simplified,
however you may need scope to `dispatch`, so it is shown here.)

When you need to initiate the request, `dispatch` the thunk.
E.g. `(credentials) => dispatch(authThunks.login(credentials))`.

This will:
 - Initiate the thunk, which will...
 - dispatch the action with the promise, which will...
 - be handled by redux-promise-middleware, which will...
 - dispatch further actions (not covered here), which will...
 - be automatically managed by the reducer (seen below)

This is all a thin wrapper over redux-promise-middleware-actions's createAsyncAction.

**Define the reducer**

```
const reducer = handleActions<UserState, any>(
  {
    ...createAsyncReducers<User>('AUTH/LOGIN'),
  },
  DEFAULT_STATE,
);
```

_Be sure to spread the result_ as it creates multiple reducers to handle the different actions that will
occur as part of the redux-promise-middleware lifecycle.

## Code-generation

BoneMeal comes with code creation to speed things up.

**Routes**

`npm run create route MyNewRoute`

**Components**

`npm run create component MyNewComponent`

**Types**

`npm run create type MyNewType`

**/!\ Still Todo: Redux**

This will add a new reducer key to redux, including types if they do not already exist. 

`npm run create redux:reducer MyReducer`

## Todo
 - CodeGen
 - UI framework
 - examplify useAsyncData (is this needed?)
 - useAsyncState -> useAsyncData to be compatible with authFetch
 - example of lifecycle hook for onpage-load
 - example of redux-listener (for commonly triggered)
 - add lastUpdated in AsyncData
 - obviate redux and use context
 - define custom error for AsyncData['errors']
 - ? Should store be grouped by domain rather than type 
 - Modals / confirmation dialogs
---


---

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

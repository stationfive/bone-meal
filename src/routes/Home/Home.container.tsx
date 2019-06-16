import React, {FunctionComponent} from "react";
import {useDispatch} from "react-redux";
import {Store} from "types/Store/Store";
import { HomeContainerProps } from "./Home.props";
import {useFallbackSelector} from "utils/Hooks";
import {authThunks} from "store/thunks";
import {UserState} from "types/Store/UserState";
import {LOADING_STATES} from "types/Store/LoadingStates";
import {asyncData} from "utils/ReduxUtils";
import {routerActions} from "store/actions";
import {ROUTES} from "consts";

const userFallback: UserState = asyncData(LOADING_STATES.ERROR, ['Could not load user']);

const HomeContainer: FunctionComponent<HomeContainerProps> = (
  { View, ...props }: HomeContainerProps,
) => {
  const {
    data: user,
    state,
    errors,
  } = useFallbackSelector<Store, UserState>((_) => _.user, userFallback);
  const dispatch = useDispatch();

  return <View {...props} {...{
    loading: state === LOADING_STATES.LOADING,
    user,
    errors,
    link: (uid: string) => dispatch(routerActions.link(ROUTES.EXAMPLE, { uid })),
    login: () => dispatch(authThunks.login("your@email.com")),
  }} />;
};

export default HomeContainer;

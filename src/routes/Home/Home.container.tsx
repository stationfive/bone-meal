import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import useSelectorSafe from 'store/selectors/useSelectorSafe';
import authThunks from 'thunks/auth';
import { UserState } from 'types/store/UserState';
import { ASYNC_STATUS } from 'types/store/AsyncStatus';
import { asyncData } from 'utils/Redux';
import { routerActions } from 'store/actions';
import ROUTES from 'routes';
import HomeView from './Home.view';
import { HomePublicProps } from './Home.props';

const userFallback: UserState = asyncData(ASYNC_STATUS.ERROR, [
  { message: 'Could not load user' },
]);

const HomeContainer: FC<HomePublicProps> = (props: HomePublicProps) => {
  const { data: user, status, errors } = useSelectorSafe<UserState>(
    state => state.user,
    userFallback,
  );
  const dispatch = useDispatch();

  return (
    <HomeView
      {...props}
      {...{
        loading: status === ASYNC_STATUS.LOADING,
        user,
        errors,
        toProfile: (slug: string) =>
          dispatch(routerActions.link(ROUTES.EXAMPLE, { slug })),
        login: () => dispatch(authThunks.login({ email: 'your@email.com' })),
      }}
    />
  );
};

export default React.memo(HomeContainer);

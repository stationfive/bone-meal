import React, { FC, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { AuthGuardOptions, AuthGuardPublicProps } from './AuthGuard.props';
import useSelectorSafe from '../../store/selectors/useSelectorSafe';
import { UserState } from '../../types/Store/UserState';
import { asyncData } from '../../utils/Redux';
import { ASYNC_STATUS } from '../../types/Store/AsyncStatus';
import { fallback } from '../../utils/Data';
import { Optional } from '../../utils/Type/Optional';
import { routerActions } from '../../store/actions';

const checkRedirect = (
  dispatch: Dispatch,
  userState: UserState,
  options: AuthGuardOptions,
) => {
  const uid = fallback<UserState, Optional<string>>(
    // @ts-ignore
    u => u.data.id,
    undefined,
    userState,
  );

  if (!options.allowAnon && !uid) {
    dispatch(routerActions.link(options.redirectAnon));
  } else if (!options.allowAuthed && uid) {
    dispatch(routerActions.link(options.redirectAuthed, { slug: uid }));
  }
};

const AuthGuardContainer: FC<AuthGuardPublicProps> = (
  ownProps: AuthGuardPublicProps,
) => {
  const dispatch = useDispatch();

  const userState = useSelectorSafe<UserState>(
    store => store.user,
    asyncData(ASYNC_STATUS.INITIAL),
  );

  useEffect(() => {
    checkRedirect(dispatch, userState, ownProps);
  }, [userState, ownProps]);

  return <div>{ownProps.children}</div>;
};

export default AuthGuardContainer;

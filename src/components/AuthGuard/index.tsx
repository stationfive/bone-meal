import React, { ReactNode } from 'react';
import AuthGuardContainer from './AuthGuard.container';
import { AuthGuardOptions } from './AuthGuard.props';

export const makeAuthGuard = (options: AuthGuardOptions) => {
  const filledOptions: AuthGuardOptions = {
    allowAnon: false,
    allowAuthed: false,
    allowUserGroups: [],
    ...options,
  };

  function AuthGuard({ children }: { children: ReactNode }) {
    return AuthGuardContainer({ ...filledOptions, children });
  }

  return React.memo(AuthGuard);
};

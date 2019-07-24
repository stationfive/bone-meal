import React, { FC, ReactElement } from 'react';

import { fallback } from 'utils/DataUtils';
import { Optional } from 'utils/TypeUtils/Optional';
import { HomeProps } from './Home.props';

const HomeView: FC<HomeProps> = (props: HomeProps): ReactElement<'div'> => {
  const uid = fallback<HomeProps, Optional<string>>(
    _ => _.user.id,
    undefined,
    props,
  );
  const userGreeting = fallback<HomeProps, string>(
    _ => _.user.email,
    'friend',
    props,
  );

  return (
    <div>
      <h1>
        Welcome home
        {props.loading ? '...' : userGreeting}
      </h1>
      {uid ? (
        <button onClick={() => props.toProfile(userGreeting)}>Home</button>
      ) : (
        <button onClick={props.login}>Log in</button>
      )}
    </div>
  );
};

export default HomeView;

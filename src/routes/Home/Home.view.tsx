import React, { FC, ReactElement } from 'react';

import { fallback } from 'utils/Data';
import { Optional } from 'types/util/Optional';
import { HomeProps } from './Home.props';

const HomeView: FC<HomeProps> = (props: HomeProps): ReactElement<'div'> => {
  const uid = fallback<HomeProps, Optional<string>>(
    _ => _.user.id,
    undefined,
    props,
  );
  const userGreeting = fallback<HomeProps, string>(
    _ => _.user.email,
    'stranger',
    props,
  );

  return (
    <div>
      <h1>Welcome home, {userGreeting}</h1>
      {props.loading ? (
        <span>Logging you in</span>
      ) : (
        <div>
          {uid ? (
            <button onClick={() => props.toProfile(uid)}>Home</button>
          ) : (
            <button onClick={props.login}>Log in</button>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(HomeView);

import {FunctionComponent, ReactElement} from "react";
import React from "react";
import { HomeProps } from "./Home.props";
import { fallback } from "utils/DataUtils";
import { Optional } from "utils/TypeUtils/Optional";

const HomeView: FunctionComponent<HomeProps> = (props: HomeProps): ReactElement<'div'> => {
  const uid = fallback<HomeProps, Optional<string>>((_) => _.user.id, undefined, props);
  const userGreeting = fallback<HomeProps, string>((_) => _.user.email, "friend", props);

  return (
    <div>
      <h1>
        Welcome home { userGreeting }
      </h1>
      { uid
        ? <button onClick={() => props.link(uid)}>Home</button>
        : <button onClick={props.login}>Log in</button>}

    </div>
  );
};

export default HomeView;

import {FunctionComponent, ReactElement} from "react";
import React from "react";
import { HomeProps } from "./Home.props";

const HomeView: FunctionComponent<HomeProps> = (props: HomeProps): ReactElement<'div'> => {
  return (
    <div>
      <h1>
        We made it
        User is { props.user }
      </h1>
    </div>
  );
};

export default HomeView;

import {FunctionComponent, ReactElement} from "react";
import React from "react";
import { ExamplePageProps } from "./ExamplePage.props";

const ExamplePageView: FunctionComponent<ExamplePageProps> = (props: ExamplePageProps): ReactElement<'div'> => {
  return (
    <div>
      <h1>
        We made it
        User is { props.user }
      </h1>
    </div>
  );
};

export default ExamplePageView;

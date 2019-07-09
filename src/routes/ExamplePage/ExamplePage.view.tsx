import {FC, ReactElement} from "react";
import React from "react";
import { ExamplePageProps } from "./ExamplePage.props";

const ExamplePageView: FC<ExamplePageProps> = (props: ExamplePageProps): ReactElement<'div'> => {
  return (
    <div>
      <h1>
        User is { props.uid }
      </h1>
    </div>
  );
};

export default ExamplePageView;

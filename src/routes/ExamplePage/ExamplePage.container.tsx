import React, {
  useState,
  FunctionComponent,
  ReactElement,
} from "react";
import { ContainerProps} from "utils/TypeUtils/ContainerProps";
import { ExamplePageProps, ExamplePageGeneratedProps, ExamplePagePassedProps} from "./ExamplePage.props";

type Props = ContainerProps<ExamplePagePassedProps, ExamplePageGeneratedProps>;

const ExamplePageContainer: FunctionComponent<Props> = ({ View, ...props }: Props) => {
    const [user, setUser] = useState(true);

    return View({ ...props, user, setUser });
  };

export default ExamplePageContainer;

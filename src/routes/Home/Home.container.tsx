import React, {
  useState,
  FunctionComponent,
  ReactElement,
} from "react";
import { ContainerProps} from "utils/TypeUtils/ContainerProps";
import { HomeProps, HomeGeneratedProps, HomePassedProps} from "./Home.props";

type Props = ContainerProps<HomePassedProps, HomeGeneratedProps>;

const HomeContainer: FunctionComponent<Props> = ({ View, ...props }: Props) => {
    const [user, setUser] = useState(true);

    return View({ ...props, user, setUser });
  };

export default HomeContainer;

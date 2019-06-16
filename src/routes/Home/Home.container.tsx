import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Store } from "types/Store/Store";
import { Optional } from "utils/TypeUtils/Optional";
import { User } from "types/User";
import { ContainerProps } from "utils/TypeUtils/ContainerProps";
import { HomeGeneratedProps, HomePassedProps } from "./Home.props";
import { useFallbackSelector } from "utils/Hooks";
import { authThunks } from "store/thunks";


type Props = ContainerProps<HomePassedProps, HomeGeneratedProps>;

const HomeContainer: FunctionComponent<Props> = ({ View, ...props }: Props) => {
    const user = useFallbackSelector<Store, Optional<User>>((_) => _.user.data, undefined);
    const dispatch = useDispatch();

    return View({
      ...props,
      user,
      link: (id: string) => dispatch(() => {}),
      login: () => dispatch(authThunks.login("your@email.com")),
    });
  };

export default HomeContainer;

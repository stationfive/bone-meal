import { ContainerProps } from "utils/TypeUtils/ContainerProps";
import { RouteDef } from "types/RouteDef";

export type ExamplePagePublicProps = {
  route: RouteDef,
}

export type ExamplePageGeneratedProps = {
  toggle: boolean,
  setToggle: (newUser: boolean) => void,
  uid: string,
}

export type ExamplePageProps = ExamplePagePublicProps & ExamplePageGeneratedProps;
export type ExamplePageContainerProps =
  ContainerProps<ExamplePagePublicProps, ExamplePageGeneratedProps>;

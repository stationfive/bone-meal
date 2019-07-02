import {ContainerProps} from "utils/TypeUtils/ContainerProps";

export type ExamplePageGeneratedProps = {
  toggle: boolean,
  setToggle: (newUser: boolean) => void,
  uid: string,
}

export type ExamplePagePublicProps = {
  // no props can be passed to pages
}

export type ExamplePageProps = ExamplePagePublicProps & ExamplePageGeneratedProps;
export type ExamplePageContainerProps =
  ContainerProps<ExamplePagePublicProps, ExamplePageGeneratedProps>;

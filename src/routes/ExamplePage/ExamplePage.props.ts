import { RouteDef } from "types/RouteDef";

export type ExamplePagePublicProps = {
  route: RouteDef,
}

type ExamplePageCalcedProps = {
  toggle: boolean,
  setToggle: (newUser: boolean) => void,
  uid: string,
}

export type ExamplePageProps = ExamplePagePublicProps & ExamplePageCalcedProps;


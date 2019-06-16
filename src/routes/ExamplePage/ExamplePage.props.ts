import { User } from "types/User";

export type ExamplePageGeneratedProps = {
  toggle: boolean,
  setToggle: (newUser: boolean) => void,
  uid: string,
}

export type ExamplePagePassedProps = {
  // no props can be passed to pages
}

export type ExamplePageProps = ExamplePagePassedProps & ExamplePageGeneratedProps;

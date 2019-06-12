import { User } from "types/User";

export type ExamplePageGeneratedProps = {
  user: boolean,
  setUser: (newUser: boolean) => void,
}

export type ExamplePagePassedProps = {
  // no props can be passed to pages
}

export type ExamplePageProps = ExamplePagePassedProps & ExamplePageGeneratedProps;

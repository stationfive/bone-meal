import { User } from "types/User";

export type HomeGeneratedProps = {
  user: boolean,
  setUser: (newUser: boolean) => void,
}

export type HomePassedProps = {
  // no props can be passed to pages
}

export type HomeProps = HomePassedProps & HomeGeneratedProps;

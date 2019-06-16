import { User } from "types/User";

export type HomeGeneratedProps = {
  user?: User,
  link: (id: string) => void,
  login: () => void,
}

export type HomePassedProps = {
  // no props can be passed to pages
}

export type HomeProps = HomePassedProps & HomeGeneratedProps;

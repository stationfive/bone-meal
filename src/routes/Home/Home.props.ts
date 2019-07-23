import { RouteDef } from "types/RouteDef";
import { User } from "types/User";

export type HomePublicProps = {
  route: RouteDef,
}

type HomeCalcedProps = {
  user?: User,
  toProfile: (slug: string) => void,
  login: () => void,
  loading: boolean,
  errors: {}[],
}

export type HomeProps = HomePublicProps & HomeCalcedProps;

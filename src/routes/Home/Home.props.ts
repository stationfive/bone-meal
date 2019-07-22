import { ContainerProps } from "utils/TypeUtils/ContainerProps";
import { RouteDef } from "types/RouteDef";
import { User } from "types/User";

export type HomePublicProps = {
  route: RouteDef,
}

export type HomeGeneratedProps = {
  user?: User,
  toProfile: (slug: string) => void,
  login: () => void,
  loading: boolean,
  errors: {}[],
}

export type HomeProps = HomePublicProps & HomeGeneratedProps;
export type HomeContainerProps = ContainerProps<HomePublicProps, HomeGeneratedProps>;

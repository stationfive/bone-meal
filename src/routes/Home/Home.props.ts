import { ContainerProps } from "utils/TypeUtils/ContainerProps";
import { User } from "types/User";

export type HomePublicProps = {
  // no props can be passed to pages
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

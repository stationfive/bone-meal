import { RouteDef } from 'types/RouteDef';
import { User } from 'types/User';

export interface HomePublicProps {
  route: RouteDef;
}

interface HomeCalcedProps {
  user?: User;
  toProfile: (slug: string) => void;
  login: () => void;
  loading: boolean;
  errors: {}[];
}

export type HomeProps = HomePublicProps & HomeCalcedProps;

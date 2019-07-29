import { RouteDef } from 'types/RouteDef';

export interface ExamplePagePublicProps {
  route: RouteDef;
}

interface ExamplePageCalcedProps {
  toggle: boolean;
  setToggle: (newUser: boolean) => void;
  email: string;
}

export type ExamplePageProps = ExamplePagePublicProps & ExamplePageCalcedProps;

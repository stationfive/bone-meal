import { RouteDef } from '../../types/RouteDef';

export interface RouterPublicProps {
  components: {
    [k: string]: RouteDef;
  };
}

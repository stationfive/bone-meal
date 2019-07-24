import { FC } from 'react';
import { NOT_FOUND } from 'redux-first-router';
import useSelectorSafe from 'store/selectors/useSelectorSafe';
import { RouterPublicProps } from './Router.props';
import LazyComponent from '../LazyComponent/LazyComponent';

const RouterContainer: FC<RouterPublicProps> = (props: RouterPublicProps) => {
  const location = useSelectorSafe<string>(
    state => state.location.type,
    NOT_FOUND,
  );
  const resolvedLocation =
    location === NOT_FOUND
      ? props.components.NOT_FOUND
      : // strip the `ROUTER/` prefix to find in route map
        props.components[location.substr(7)];

  return LazyComponent(`routes/${resolvedLocation.component}`, {
    route: resolvedLocation,
  });
};

export default RouterContainer;

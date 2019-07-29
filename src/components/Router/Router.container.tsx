import React, { FC, ReactNode } from 'react';
import { NOT_FOUND } from 'redux-first-router';
import useSelectorSafe from 'store/selectors/useSelectorSafe';
import { RouterPublicProps } from './Router.props';
import LazyComponent from '../LazyComponent/LazyComponent';
import { RouteDef } from '../../types/RouteDef';

const Middleware = ({
  route,
  children,
}: {
  route: RouteDef;
  children: ReactNode;
}) => {
  const MiddlewareWrapper = route.middleware && route.middleware();
  return MiddlewareWrapper ? (
    <MiddlewareWrapper>{children}</MiddlewareWrapper>
  ) : (
    <>{children}</>
  );
};

const RouterContainer: FC<RouterPublicProps> = (props: RouterPublicProps) => {
  const location = useSelectorSafe<string>(
    state => state.location.type,
    NOT_FOUND,
  );
  const matchedRoute: RouteDef =
    location === NOT_FOUND
      ? props.components.NOT_FOUND
      : // strip the `ROUTER/` prefix to find in route map
        props.components[location.substr(7)];

  return (
    <Middleware route={matchedRoute}>
      {LazyComponent(`routes/${matchedRoute.component}`, {
        route: matchedRoute,
      })}
    </Middleware>
  );
};

export default RouterContainer;

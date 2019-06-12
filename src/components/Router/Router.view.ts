import { FunctionComponent, ReactComponentElement } from 'react';
import { NOT_FOUND } from 'redux-first-router';
import { RouterProps } from './Router.props';

const Router: FunctionComponent<any> = (props: RouterProps): ReactComponentElement<any> => (
  // @ts-ignore
  (props.components[props.location.type] || props.components[NOT_FOUND])()
);

export default Router;

import React, { FunctionComponent, ReactElement } from 'react';
import View from './ExamplePage.view';
import Container from './ExamplePage.container';
import { ExamplePagePassedProps } from "./ExamplePage.props";


const ExamplePage: FunctionComponent<ExamplePagePassedProps> =
  (props: ExamplePagePassedProps) => <Container {...props} View={View} />;

export default ExamplePage;

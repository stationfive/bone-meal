import React, { FunctionComponent, ReactElement } from 'react';
import View from './ExamplePage.view';
import Container from './ExamplePage.container';
import { ExamplePagePublicProps } from "./ExamplePage.props";


const ExamplePage: FunctionComponent<ExamplePagePublicProps> =
  (props: ExamplePagePublicProps) => <Container {...props} View={View} />;

export default ExamplePage;

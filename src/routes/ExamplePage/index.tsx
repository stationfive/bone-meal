import React, { FunctionComponent } from 'react';
import View from './ExamplePage.view';
import Container from './ExamplePage.container';
import { ExamplePagePublicProps } from "./ExamplePage.props";


const ExamplePage: FunctionComponent<ExamplePagePublicProps> =
  (props: ExamplePagePublicProps) => Container({ View, ...props});

export default ExamplePage;

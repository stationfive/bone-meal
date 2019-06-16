import React, { FunctionComponent, ReactElement } from 'react';
import View from './Home.view';
import Container from './Home.container';
import { HomePassedProps } from "./Home.props";


const Home: FunctionComponent<HomePassedProps> =
  (props: HomePassedProps) => <Container {...props} View={View} />;

export default Home;

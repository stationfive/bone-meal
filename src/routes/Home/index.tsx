import React, { FunctionComponent, ReactElement } from 'react';
import View from './Home.view';
import Container from './Home.container';
import { HomePublicProps } from "./Home.props";


const Home: FunctionComponent<HomePublicProps> =
  (props: HomePublicProps) => Container({ View, ...props });

export default Home;

import React, { FC, ReactElement } from 'react';

import { ExamplePageProps } from './ExamplePage.props';

const ExamplePageView: FC<ExamplePageProps> = (
  props: ExamplePageProps,
): ReactElement<'div'> => (
  <div>
    <h1>
      User is
      {props.uid}
    </h1>
  </div>
);

export default ExamplePageView;

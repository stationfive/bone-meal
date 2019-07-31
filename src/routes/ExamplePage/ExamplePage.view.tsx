import React, { FC, ReactElement } from 'react';

import { ExamplePageProps } from './ExamplePage.props';

const ExamplePageView: FC<ExamplePageProps> = (
  props: ExamplePageProps,
): ReactElement<'div'> => (
  <div>
    <h1>{props.email}</h1>
  </div>
);

export default React.memo(ExamplePageView);

import React, { useState, FC } from 'react';
import useSelectorSafe from 'store/selectors/useSelectorSafe';
import { ExamplePagePublicProps } from './ExamplePage.props';
import ExamplePageView from './ExamplePage.view';

const ExamplePageContainer: FC<ExamplePagePublicProps> = (
  props: ExamplePagePublicProps,
) => {
  const [toggle, setToggle] = useState(true);
  const email = useSelectorSafe<string>(
    // @ts-ignore
    state => state.user.data.email,
    '',
  );

  return <ExamplePageView {...props} {...{ email, toggle, setToggle }} />;
};

export default React.memo(ExamplePageContainer);

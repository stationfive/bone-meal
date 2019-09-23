import React, { useState, FC, useEffect } from 'react';
import useSelectorSafe from 'store/selectors/useSelectorSafe';
import { useDispatch } from 'react-redux';
import exampleThunks from 'thunks/example';
import { ExamplePagePublicProps } from './ExamplePage.props';
import ExamplePageView from './ExamplePage.view';

const ExamplePageContainer: FC<ExamplePagePublicProps> = (
  props: ExamplePagePublicProps,
) => {
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(exampleThunks.getListings());
  }, [dispatch]);

  const email = useSelectorSafe<string>(
    // @ts-ignore
    state => state.user.data.email,
    '',
  );

  return <ExamplePageView {...props} {...{ email, toggle, setToggle }} />;
};

export default React.memo(ExamplePageContainer);

import React from 'react';
import renderer from 'react-test-renderer';
import Loading from './Loading.view';

describe('components/Loading', () => {
  it('renders the component', () => {
    const tree: JSON = renderer
      .create(<Loading />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

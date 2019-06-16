import React, { ReactComponentElement } from 'react';
import { ROUTES } from 'consts';
import LazyComponent from 'components/LazyComponent/LazyComponent';
import { mapObj } from 'utils/DataUtils';

const componentsFolders = {
  [ROUTES.ROOT]: 'Home',
  [ROUTES.EXAMPLE]: 'ExamplePage',
  [ROUTES.NOT_FOUND]: 'NotFound',
};

export default mapObj((val: string): () => ReactComponentElement<any> =>
  () => LazyComponent(`routes/${val}`)
)(componentsFolders);

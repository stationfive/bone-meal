import React, { ReactComponentElement } from 'react';
import { ROUTES } from 'consts';
import LazyComponent from 'components/LazyComponent/LazyRouter';
import { mapObj } from 'utils/DataUtils';

const componentsFolders = {
  [ROUTES.ROOT]: 'Home',
  [ROUTES.NOT_FOUND]: 'NotFound',
};

export default mapObj((val: string): () => ReactComponentElement<any> =>
  () => LazyComponent(`${val}`)
)(componentsFolders);

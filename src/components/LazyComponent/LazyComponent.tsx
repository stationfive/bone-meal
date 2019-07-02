import React, { Suspense } from 'react';
import { Loading } from 'components';

const LazyComponent = (srcRelativeImportPath: string, props: {} = {}) => {
  const LazyComponent = React.lazy(() => import(`../../${srcRelativeImportPath}`));

  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default LazyComponent;

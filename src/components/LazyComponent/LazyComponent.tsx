import React, { Suspense } from 'react';
import { Loading } from 'components';

const LazyComponent = (srcRelativeImportPath: string) => {
  const LazyComponent = React.lazy(() => import(`../../${srcRelativeImportPath}`));

  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
};

export default LazyComponent;

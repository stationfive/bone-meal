import React, { Suspense } from 'react';
import { Loading } from 'components';

const LazyRouter = (importPath: string) => {
  const LazyComponent = React.lazy(() => import(`../../routes/${importPath}`));

  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
};

export default LazyRouter;

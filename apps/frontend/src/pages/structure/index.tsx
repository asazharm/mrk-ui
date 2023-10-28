import React, { Suspense, useCallback, useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { Space } from 'antd';
import InlinePage from './inline.page';
import TreePage from './tree.page';

export default function Employees() {
  const { page } = useParams();

  const routes = [
    {
      path: '/inline',
      Component: InlinePage,
    },
    {
      path: '/tree',
      Component: TreePage,
    },
  ];

  const renderActiveTab = useCallback(() => {
    return (
      <Suspense>
        {/* <Helmet>
          <title>{t('pageTitles:staff') + t('pageTitles:tail')}</title>
        </Helmet> */}
        <Routes>
          {routes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Routes>
      </Suspense>
    );
  }, [page]);

  return renderActiveTab();
}

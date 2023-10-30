import React, { Suspense, useCallback, useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import PersonalPage from './personal.page';
import CreatePage from './create.page';
import UsersPage from './users.page';
import VacationsPage from './vacations.page';
import { Space } from 'antd';
import EmployeeVacation from './EmployeeVacation.page';

export default function Employees() {
  const { page } = useParams();

  const routes = [
    {
      path: '/list',
      Component: UsersPage,
    },
    {
      path: '/list/:username',
      Component: PersonalPage,
    },
    {
      path: '/createUser',
      Component: CreatePage,
    },
    {
      path: '/vacations',
      Component: VacationsPage,
    },
    {
      path: '/vacations/:username',
      Component: EmployeeVacation,
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

import React from 'react';
import { Routes as RoutesDOM, Route } from 'react-router-dom';
import HomePage from './pages/home.page';
import Employees from './pages/employees';

export default function Routes() {
  return (
    <RoutesDOM>
      <Route path="/" Component={HomePage} />
      <Route path="/employees/*" Component={Employees} />
    </RoutesDOM>
  );
}

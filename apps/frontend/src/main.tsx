import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import './i18n/config';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login.page';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import PublicRoute from './components/Routes/PublicRoute';
import LocaleProvider from 'antd/es/locale';
import hy_AM from 'antd/locale/hy_AM';

import dayjs from 'dayjs';
import 'dayjs/locale/hy-am';
import { ConfigProvider } from 'antd';
dayjs.locale('hy-am');
// import moment from "moment";

// moment.locale("hy_AM");

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <LocaleProvider locale={hy_AM}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890FF',
            fontFamily: 'Montserrat',
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </LocaleProvider>
  </Provider>
);

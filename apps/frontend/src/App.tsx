import React, { useEffect } from 'react';
import Home from './pages/home.page';
import LoginPage from './pages/login.page';
import Routes from './Routes';
import Layout from './components/Layout/Layout';
import { ConfigProvider, theme } from 'antd';
import { useDarkMode, useLocalStorage } from 'usehooks-ts';
import { useNavigate } from 'react-router-dom';
import { authApi } from './store/api/authApi';

function App() {
  const { isDarkMode, toggle: darkModeToggle } = useDarkMode();
  const navigate = useNavigate();
  authApi.useGetMeQuery();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="App">
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <Layout
          darkModeToggle={darkModeToggle}
          isDarkMode={isDarkMode}
          logout={logout}
        >
          <Routes />
        </Layout>
      </ConfigProvider>
    </div>
  );
}

export default App;

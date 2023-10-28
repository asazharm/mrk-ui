import {
  Layout as AntLayout,
  Col,
  ConfigProvider,
  Row,
  Space,
  theme,
} from 'antd';
import React from 'react';
import Header from '../Header/Header';
import Sider from '../Sider/Sider';
import { Content } from 'antd/es/layout/layout';
import EventWidget from '../EventWidget/EventWidget';

const { useToken } = theme;

interface LayoutProps {
  children: React.ReactNode;
  darkModeToggle: () => void;
  isDarkMode: boolean;
  logout: () => void;
}

export default function Layout({
  children,
  darkModeToggle,
  isDarkMode,
  logout,
}: LayoutProps) {
  const { token } = useToken();

  return (
    <AntLayout className="w-full h-screen">
      <Header />
      <AntLayout>
        <Sider
          darkModeToggle={darkModeToggle}
          isDarkMode={isDarkMode}
          logout={logout}
        />
        <AntLayout>
          <Content>
            <div className="flex h-full flex-row w-full relative m-0 py-8 px-6 gap-3">
              <div
                style={{
                  background: token.colorBgContainer,
                }}
                className={`border-[2px] rounded-[6px] w-full h-full scrollbar-none overflow-y-scroll p-6`}
              >
                {children}
              </div>
              <div className=" max-w-[300px]">
                <EventWidget />
              </div>
            </div>
            {/* <Row
              gutter={16}
              justify="space-between"
              className={`w-full h-full relative m-0 py-6 px-3 overflow-y-scroll`}
            >
              <Col span={20} className="items-center h-full px-3">
                <div
                  style={{ background: token.colorBgContainer }}
                  className={`border-[2px] rounded-[${token.borderRadius}px]`}
                >
                  {children}
                </div>
              </Col>
              <Col span={6} className="!h-full px-3 max-w-[280px]">
                <EventWidget />
              </Col>
            </Row> */}
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
}

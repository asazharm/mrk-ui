import Icon, { BellOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  ConfigProvider,
  Layout,
  Space,
  Typography,
  theme,
} from 'antd';
import React from 'react';

import logo from '../../assets/images/logo.png';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const { Header: AntHeader } = Layout;

const { useToken } = theme;

export default function Header() {
  const { t } = useTranslation();
  const { token } = useToken();

  const { user } = useSelector((state: RootState) => state.userState);

  return (
    <ConfigProvider
      theme={{
        // 1. Use dark algorithm
        algorithm: theme.darkAlgorithm,

        // 2. Combine dark algorithm and compact algorithm
        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <AntHeader className="top-0 leading-none">
        <Space align="center" className="w-full h-full flex justify-between">
          <Space align="center" className="h-full !gap-3">
            <div className="h-full flex align-middle">
              <img src={logo} alt="" className="" />
            </div>
            <Space direction="vertical">
              <p className="m-0">{t('common.titlePartOne')}</p>
              <p className="m-0">{t('common.titlePartTwo')}</p>
            </Space>
          </Space>
          <Space className=" !gap-6">
            <Badge count={11}>
              <Button
                type="text"
                shape="circle"
                size="large"
                icon={<BellOutlined />}
              ></Button>
              {/* <Avatar icon={<BellOutlined />} /> */}
            </Badge>
            <Space>
              <Avatar icon={<UserOutlined />} />
              <Typography.Text>
                {`${user?.biometrics?.firstname} ${user?.biometrics?.lastname}`}
              </Typography.Text>
            </Space>
          </Space>
        </Space>
      </AntHeader>
    </ConfigProvider>
  );
}

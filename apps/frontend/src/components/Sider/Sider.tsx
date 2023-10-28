import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  CalendarOutlined,
  CheckCircleOutlined,
  DeploymentUnitOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  TeamOutlined,
  UserOutlined,
  WarningOutlined,
} from '@ant-design/icons';

import { MdDarkMode, MdLightMode } from 'react-icons/md';

import {
  Button,
  Divider,
  Layout,
  Menu,
  MenuProps,
  Popconfirm,
  Space,
  Switch,
  theme,
} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider: AntSider } = Layout;
const { useToken } = theme;

const fields = [
  {
    key: 'main',
    path: '',
    icon: <CalendarOutlined />,
  },
  {
    key: 'employees',
    path: 'employees',
    icon: <UserOutlined />,
    subfields: [
      { key: 'list', path: 'list' },
      { key: 'vacations', path: 'vacations' },
      { key: 'actions', path: 'actions' },
      { key: 'createUser', path: 'createUser' },
    ],
  },
  {
    icon: <CheckCircleOutlined />,
    key: 'Համալրում',
  },
  {
    icon: <DeploymentUnitOutlined />,
    key: 'structure',
    path: 'structure',
    subfields: [
      { key: 'inline', path: 'inline' },
      { key: 'tree', path: 'tree' },
    ],
  },
  {
    icon: <WarningOutlined />,
    key: 'Փորձաշրջան',
  },
  {
    icon: <UserOutlined />,
    key: 'Վերապատրաստումներ',
  },
  {
    icon: <FileTextOutlined />,
    key: 'Գնահատում',
  },
  {
    icon: <TeamOutlined />,
    key: 'Կորպորատիվ Մշակույթ',
  },
  {
    icon: <FileDoneOutlined />,
    key: 'Բարեվարքություն',
  },
  {
    icon: <OrderedListOutlined />,
    key: 'Ներքին Կանոնակարգ',
  },
];
// interface SiderProps {
//   items?: MenuProps['items'];
// }

interface SiderProps {
  darkModeToggle: () => void;
  logout: () => void;
  isDarkMode: boolean;
}

export default function Sider({
  darkModeToggle,
  isDarkMode,
  logout,
}: SiderProps) {
  const location = useLocation();
  const { token } = useToken();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const items: MenuProps['items'] = fields.map((field, index) => {
    return {
      key: field.key,
      icon: field.icon,
      label: t(`modules.${field.key}.title`),
      onClick: () => {
        !field.subfields && navigate(`${field.path}`);
      },

      children:
        field.subfields &&
        field.subfields.map((subfield, j) => ({
          key: `${field.key}.${subfield.key}`,
          // key: index * fields.length + j + 1,
          label: t(`modules.${field.key}.${subfield.key}`),
          onClick: () => {
            navigate(`${field.path}/${subfield.path}`);
          },
        })),
    };
  });

  return (
    <AntSider
      style={{
        background: token.colorBgContainer,
        boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Space
        direction="vertical"
        className="justify-between flex h-full overflow-scroll scrollbar-none"
      >
        <Menu
          className="h-full w-full"
          mode="inline"
          selectedKeys={[
            location.pathname.slice(1).split('/').slice(0, 2).join('.'),
          ]}
          defaultOpenKeys={[location.pathname.slice(1).split('/')[0]]}
          // defaultSelectedKeys={['1']}
          // defaultOpenKeys={['sub1']}
          // style={{ height: '100%', borderRight: 0 }}
          items={items}
        />
        <Space direction="vertical" className="w-full">
          <Divider />
          <Space className="w-full justify-between p-4">
            <Popconfirm
              title={t('common.logoutConfirm')}
              // description={t('common.')}
              onConfirm={logout}
              okText={t('common.yes')}
              cancelText={t('common.no')}
            >
              <Button
                type="text"
                shape="circle"
                icon={<LogoutOutlined style={{ color: token.colorText }} />}
              ></Button>
            </Popconfirm>

            <Switch
              onClick={darkModeToggle}
              checkedChildren={<MdDarkMode />}
              unCheckedChildren={<MdLightMode />}
              checked={isDarkMode}
            />
          </Space>
        </Space>
      </Space>
    </AntSider>
  );
}

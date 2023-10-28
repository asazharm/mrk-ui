import React, { useEffect } from 'react';
import { Button, Form, Input, Space, message } from 'antd';
import { useLoginUserMutation } from '../store/api/authApi';
import SubmitButton from '../components/Buttons/SubmittableButton';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export type FieldType = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();

  // useEffect(() => {
  //   // if (error && error.data) message.error(error);
  // }, [isError]);

  useEffect(() => {
    if (!isSuccess) return;

    navigate('/');
  }, [isSuccess, navigate]);

  const onFinish = (values: FieldType) => {
    loginUser(values);
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   message.error(error);
  // };

  return (
    <Space className="w-full h-screen align-middle justify-center">
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          validateStatus={isError ? 'error' : ''}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={t("common.username")}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          validateStatus={isError ? 'error' : ''}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t("common.password")}
          />
        </Form.Item>

        <Form.Item>
          <SubmitButton form={form} className={'w-full'}>
            {t("common.login")}
          </SubmitButton>
        </Form.Item>
      </Form>
    </Space>
  );
}

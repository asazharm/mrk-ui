import React, { useEffect } from 'react';
import { Descriptions, Form, Input, Select, Space, message } from 'antd';
import Title from 'antd/es/typography/Title';
import { useTranslation } from 'react-i18next';
import SubmitButton from '../../components/Buttons/SubmittableButton';
import { ICreateUser, useCreateUserMutation } from '../../store/api/usersApi';
import { useNavigate } from 'react-router-dom';
import { IGenericResponseData } from '../../store/api/types';

const { Option } = Select;

export default function PersonalPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const username = Form.useWatch('username', form);
  const [messageApi, contextHolder] = message.useMessage();

  const [createUser, { isLoading, isError, error, isSuccess }] =
    useCreateUserMutation();

  useEffect(() => {
    if (!isLoading) return;

    messageApi.open({
      type: 'loading',
      content: t('common.actionInProgress'),
      duration: 0,
    });
  }, [isLoading]);

  useEffect(() => {
    if (!isError) return;
    messageApi.destroy();

    let errorData: IGenericResponseData | undefined =
      error && 'data' in error
        ? (error.data as IGenericResponseData)
        : undefined;

    if (error && 'data' in error) {
      errorData = error.data as IGenericResponseData;
    }

    messageApi.open({
      type: 'error',
      content: <p>{t(`common.errors.${errorData?.message}` || '')}</p>,
      duration: 2.5,
    });
  }, [isError]);

  useEffect(() => {
    if (!isSuccess) return;
    messageApi.destroy();

    messageApi.open({
      type: 'success',
      content: <p>{t('common.successfullyCreated')}</p>,
      duration: 0,
    });
    setTimeout(() => {
      messageApi.destroy();

      navigate(`/employees/list/${username}`);
    }, 1000);
  }, [isSuccess]);

  const onFinish = (values: ICreateUser) => {
    createUser(values);
  };

  const fields = [
    { name: 'username', label: t('common.username') },
    { name: 'firstname', label: t('modules.employees.personal.firstname') },
    { name: 'lastname', label: t('modules.employees.personal.lastname') },
    { name: 'email', label: t('common.email') },
    {
      name: 'status',
      label: t('common.status'),
      options: [
        { value: 'worker', label: t('modules.employees.worker') },
        { value: 'student', label: t('modules.employees.student') },
      ],
    },
    {
      name: 'role',
      label: t('common.role'),
      options: [
        { value: 'user', label: t('common.roles.user') },
        { value: 'admin', label: t('common.roles.admin') },
      ],
    },
  ];
  const items = fields.map((field) => ({
    key: field.name,
    label: field.label,
    children: (
      <Form.Item
        initialValue={field?.options?.[0].value || undefined}
        name={field.name}
        rules={[{ required: true }]}
      >
        {field.options ? (
          <Select allowClear>
            {field.options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        ) : (
          <Input />
        )}
      </Form.Item>
    ),
  }));

  return (
    <Space direction="vertical" className="w-full px-6">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Space className="flex justify-between">
          <Title level={2}>{t('modules.employees.createUser')}</Title>
          <SubmitButton form={form}>{t('common.create')}</SubmitButton>
        </Space>
        <Descriptions layout="vertical" items={items} />
      </Form>
      {contextHolder}
    </Space>
  );
}

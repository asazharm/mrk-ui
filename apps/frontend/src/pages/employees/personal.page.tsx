import { Button, Popconfirm, Space, Tabs, TabsProps } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import SubmitButton from '../../components/Buttons/SubmittableButton';
import {
  useGetUserMutation,
  useUpdateUserMutation,
} from '../../store/api/usersApi';
import { EditFilled, LeftOutlined, SaveOutlined } from '@ant-design/icons';
import Description, {
  DataType,
} from '../../components/Description/Description';

const onChange = (key: string) => {
  console.log(key);
};

export default function PersonalPage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [getUser, { data, isError, error, isSuccess }] = useGetUserMutation();
  const [
    updateUser,
    { data: updateData, isError: updateIsError, isSuccess: updateIsSuccess },
  ] = useUpdateUserMutation();

  const [editing, setEditing] = useState(false);
  const [changedValues, setChangedValues] = useState<
    { [key: string]: string } | object
  >({});

  const onChangeValue = (newValue: { [key: string]: string }) => {
    setChangedValues((prevState) => Object.assign({}, prevState, newValue));
  };

  const onSaveChanges = () => {
    if (!changedValues || !data?.username) return;

    updateUser({ username: data.username, data: changedValues });
  };

  const onResetChanges = () => {
    if (!changedValues) return;
    setEditing(false);

    setChangedValues({});
  };

  useEffect(() => {
    if (!username) return;
    else getUser({ username });
  }, []);

  useEffect(() => {
    if (isError && error && 'status' in error && error.status === 404)
      navigate('/employees/list');
  }, [isError]);

  useEffect(() => {
    if (!username || !updateIsSuccess) return;

    getUser({ username });
    setEditing(false);
  }, [updateIsSuccess]);

  const { t } = useTranslation();
  const items: TabsProps['items'] = useMemo(
    () =>
      [
        {
          key: 'biometrics',
          data: data?.biometrics,
          fields: [
            { key: 'firstname', type: 'string' },
            { key: 'lastname', type: 'string' },
            { key: 'surname', type: 'string' },
            { key: 'birthDate', type: 'date' },
            { key: 'familyStatus', type: 'string' },
            { key: 'familyMembers', type: 'number' },
            { key: 'VAT', type: 'string' },
            { key: 'childrenNumber', type: 'number' },
            { key: 'documentName', type: 'string' },
            { key: 'documentNumber', type: 'string' },
            { key: 'givenBy', type: 'string' },
            { key: 'givenWas', type: 'date' },
            { key: 'validUntil', type: 'date' },
            { key: 'socialCardNumber', type: 'string' },
            { key: 'residentialCommunity', type: 'string' },
            { key: 'city', type: 'string' },
            { key: 'street', type: 'string' },
            { key: 'apartment', type: 'string' },
            { key: 'phoneNumber', type: 'string' },
            { key: 'email', type: 'mail' },
          ],
        },
        {
          key: 'education',
          data: data?.education,
          fields: [
            { key: 'institute', type: 'string' },
            { key: 'startDate', type: 'date' },
            { key: 'endDate', type: 'date' },
            { key: 'profession', type: 'string' },
            { key: 'faculty', type: 'string' },
            { key: 'fiplomaNumber', type: 'string' },
            { key: 'issueDate', type: 'date' },
          ],
        },
        {
          key: 'military',
          data: data?.military,
          fields: [
            { key: 'militaryBrochure', type: 'string' },
            { key: 'disarmamentState', type: 'string' },
            { key: 'militaryServiceDate', type: 'date' },
            { key: 'militaryEmploymentDate', type: 'date' },
          ],
        },
        {
          key: 'job',
          data: data?.job,
          fields: [
            { key: 'jobAcceptedDate', type: 'date' },
            { key: 'jobReleaseDate', type: 'date' },
            { key: 'division', type: 'string' },
            { key: 'position', type: 'string' },
            { key: 'profession', type: 'string' },
            { key: 'workBrochureNumber', type: 'string' },
            { key: 'civilServantCode', type: 'string' },
            { key: 'admissionOrderNumber', type: 'string' },
            { key: 'receivedOrderDate', type: 'date' },
            { key: 'releaseOrderNumber', type: 'string' },
            { key: 'releaseOrderDate', type: 'date' },
            { key: 'contractNumber', type: 'string' },
            { key: 'contractStartDate', type: 'date' },
            { key: 'contractEndDate', type: 'date' },
            { key: 'contractName', type: 'string' },
          ],
        },
      ].map((module) => ({
        key: module.key,
        label: t(`modules.employees.personal.${module.key}`),
        children: (
          <Description
            fields={module.fields}
            data={module.data as DataType}
            editing={editing}
            translation="employees.personal"
            module={module.key}
            onChange={onChangeValue}
          />
        ),
      })),
    [data, editing]
  );

  return (
    <Space direction="vertical" className="w-full">
      <Space className="flex justify-between">
        <Space direction="horizontal" align="center">
          <Button icon={<LeftOutlined />} onClick={() => navigate(-1)}></Button>
          <Title level={3} className="!m-0">
            {t('modules.employees.personalInformation')}
          </Title>
        </Space>
        {editing ? (
          <Space>
            <Popconfirm
              title={t('common.reset')}
              description={t('common.resetConfirm')}
              onConfirm={onResetChanges}
              okText={t('common.yes')}
              cancelText={t('common.no')}
            >
              <Button>{t('common.reset')}</Button>
            </Popconfirm>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={onSaveChanges}
            >
              {t('common.save')}
            </Button>
          </Space>
        ) : (
          <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => setEditing(true)}
          >
            {t('common.edit')}
          </Button>
        )}
      </Space>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Space>
  );
}

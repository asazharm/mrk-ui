import { Space, Table, TablePaginationConfig } from 'antd';
import React, { Key, useEffect, useMemo, useState } from 'react';
import { useGetUsersMutation } from '../../store/api/usersApi';
import {
  ColumnsType,
  FilterValue,
  SortOrder,
  SorterResult,
} from 'antd/es/table/interface';
import { IUser } from '../../store/api/types';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../components/Buttons/SubmittableButton';
import Title from 'antd/es/typography/Title';
import { useTranslation } from 'react-i18next';

interface TableParams {
  pagination?: TablePaginationConfig;
  field?: Key | readonly Key[] | undefined;
  order?: SortOrder;
  filters?: Record<string, FilterValue | null>;
}

export default function UsersPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const columns: ColumnsType<IUser> = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'biometrics.firstname',
        sorter: true,
        render: (name, record) =>
          `${record?.biometrics?.firstname} ${record?.biometrics?.lastname}`,
        width: '20%',
      },
      // {
      //   title: 'Gender',
      //   dataIndex: 'gender',
      //   filters: [
      //     { text: 'Male', value: 'male' },
      //     { text: 'Female', value: 'female' },
      //   ],
      //   width: '20%',
      // },
      {
        title: 'Email',
        dataIndex: 'biometrics.email',
        render: (name, record) => record?.biometrics?.email,
        sorter: true,
      },
      {
        title: 'Position',
        dataIndex: 'job.position',
        render: (name, record) => record?.job?.position,

        sorter: true,
      },
      {
        title: 'Role',
        dataIndex: 'role',
        render: (name, record) => t(`common.roles.${record?.role}`),

        sorter: true,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (name, record) => t(`modules.employees.${record?.status}`),

        sorter: true,
      },
    ],
    []
  );

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '50', '100'],
    },
    field: 'name',
    order: 'ascend',
  });
  const [getUsers, { data, isLoading, isError, error, isSuccess }] =
    useGetUsersMutation();

  // useEffect(() => {
  //   getUsers({
  //     page: tableParams.pagination?.current,
  //     pageSize: tableParams?.pagination?.pageSize,
  //     sortField: tableParams?.field as string,
  //     sortOrder: tableParams?.order as string,
  //   });
  // }, []);

  useEffect(() => {
    console.log('getUsers');

    // if (initLoaded)
    getUsers({
      page: tableParams.pagination?.current,
      pageSize: tableParams?.pagination?.pageSize,
      sortField: tableParams?.field as string,
      sortOrder: tableParams?.order as string,
    }).then((resp) => {
      if ('data' in resp && 'count' in resp.data)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: resp.data.count,
          },
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify({
      ...tableParams,
      pagination: {
        current: tableParams.pagination?.current,
        pageSize: tableParams.pagination?.pageSize,
      },
    }),
  ]);

  // useEffect(() => {
  //   console.log(tableParams);
  // }, [tableParams]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IUser> | SorterResult<IUser>[]
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <Space direction="vertical" className="w-full">
      <Space className="flex justify-between">
        <Title level={2}>{t('modules.employees.personalInformation')}</Title>
        {/* <SubmitButton form={form}>{t('common.create')}</SubmitButton> */}
      </Space>
      <Table
        dataSource={data && 'users' in data ? data?.users : data}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        columns={columns}
        loading={isLoading}
        rowKey={(record) => record._id}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              navigate(`${record.username}`);
            },
          };
        }}
      />
    </Space>
  );
}

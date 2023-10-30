import React, { Key, useEffect, useMemo, useState } from 'react';
import { Space, Table, TablePaginationConfig } from 'antd';
import {
    ColumnsType,
    FilterValue,
    SortOrder,
    SorterResult,
} from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function VacationsPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    interface TableParams {
        pagination?: TablePaginationConfig;
        field?: Key | readonly Key[] | undefined;
        order?: SortOrder;
        filters?: Record<string, FilterValue | null>;
    }

    interface DataType {
        name: string;
        vacation_days: number;
        department: string;
        slug: string;
    }
    const columns: ColumnsType<DataType> = useMemo(
        () => [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text) => <a>{text}</a>,
            },
            {
                title: 'Vacation days',
                dataIndex: 'vacation_days',
                key: 'vacation_days',
            },
            {
                title: 'Department',
                dataIndex: 'department',
                key: 'department',
            },
        ],
        []
    )

    const data: DataType[] = [
        {
            name: 'John Brown',
            vacation_days: 32,
            department: 'Department of Case Management and Control',
            slug: 'jhon_brown'
        },
        {
            name: 'Jim Green',
            vacation_days: 42,
            department: 'Tax Policy Department',
            slug: 'jim_green'
        },
        {
            name: 'Joe Black',
            vacation_days: 32,
            department: 'Department of Public Debt and Public Financial Assets',
            slug: 'joe_black'
        },
    ];

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

    return (
        <Space direction="vertical" className="w-full">
            <Table
                columns={columns}
                dataSource={data}
                pagination={tableParams.pagination}
                onRow={(record) => {
                    return {
                        onClick: (event) => {
                            navigate(`${record.slug}`);
                        }
                    }
                }}
            />
        </Space>
    )
}




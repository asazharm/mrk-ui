import React, { useMemo, useState } from 'react';
import {
  DatePicker,
  Descriptions,
  DescriptionsProps,
  Input,
  Space,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { CalendarOutlined } from '@ant-design/icons';

export type DataType = {
  [key: string]: string | number;
};

interface DescriptionProps {
  fields: { key: string; type: string }[];
  module?: string;
  data?: DataType;
  translation?: string;
  editing?: boolean;
  onChange?: (arg0: { [key: string]: string }) => void;
}

export default function Description({
  fields,
  module,
  data,
  translation,
  editing,
  onChange,
}: DescriptionProps) {
  const { t } = useTranslation();
  const items: DescriptionsProps['items'] = useMemo(
    () =>
      fields.map((field) => {
        let node;
        if (editing && onChange) {
          switch (field.type) {
            case 'date':
              node = (
                <DatePicker
                  defaultValue={
                    data?.[field.key as keyof DataType]
                      ? dayjs(data?.[field.key as keyof DataType], 'DD/MM/YYYY')
                      : undefined
                  }
                  format={'DD/MM/YYYY'}
                  onChange={(date, dateString) =>
                    onChange({ [`${module}.${field.key}`]: dateString })
                  }
                />
              );
              break;
            case 'number':
              node = (
                <Input
                  size="small"
                  defaultValue={data?.[field.key as keyof DataType]}
                  className="w w-1/2"
                  type="number"
                  min={0}
                  onChange={(e) =>
                    onChange({ [`${module}.${field.key}`]: e.target.value })
                  }
                />
              );
              break;
            case 'mail':
              node = (
                <Input
                  size="small"
                  defaultValue={data?.[field.key as keyof DataType]}
                  className="w w-1/2"
                  type="mail"
                  onChange={(e) =>
                    onChange({ [`${module}.${field.key}`]: e.target.value })
                  }
                />
              );
              break;
            default:
              node = (
                <Input
                  size="small"
                  defaultValue={data?.[field.key as keyof DataType]}
                  className="w w-1/2"
                  type=""
                  onChange={(e) =>
                    onChange({ [`${module}.${field.key}`]: e.target.value })
                  }
                />
              );
          }
        }
        return {
          key: field.key,
          label: t(`modules.${translation}.${field.key}`),
          children:
            editing && onChange ? (
              node
            ) : (
              <Space>
                {field.type === 'date' && <CalendarOutlined />}

                <Typography.Text>
                  {typeof data?.[field.key as keyof DataType] === 'string'
                    ? data?.[field.key as keyof DataType] || '-'
                    : data?.[field.key as keyof DataType] ?? '-'}
                </Typography.Text>
              </Space>
            ),
        };
      }),
    [data, editing]
  );
  // if (!editing) {
  return <Descriptions layout="vertical" items={items} />;
  // }
}

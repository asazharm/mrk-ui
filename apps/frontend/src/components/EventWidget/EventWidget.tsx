import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Divider,
  List,
  Skeleton,
  Space,
  Typography,
  theme,
} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import CalendarWidget from '../CalendarWidget/CalendarWidget';
import QueueAnim from 'rc-queue-anim';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { useToken } = theme;

interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export default function EventWidget(): JSX.Element {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const { token } = useToken();

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      className="rounded-[6px] h-full w-[300px]"
      style={{ background: token.colorBgContainer }}
    >
      <CalendarWidget />
      <div
        id="scrollableDiv"
        className="overflow-auto h-[calc(100%-40px-56px)] scrollbar-none px-3"
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={<Skeleton paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>Bolshe nety del Brat</Divider>}
          scrollableTarget="scrollableDiv"
          key={'eventWidget'}
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.name.last}>
                <List.Item.Meta
                  title={<p className="font-medium">Չրք, Հուն 1</p>}
                  description={
                    <p className="flex items-center font-medium text-[12px] bg-green h-[36px] pl-3 rounded-[2px]">
                      Երեխաների պաշտպանության օր
                    </p>
                  }
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>

      <Divider className="m-0" />
      <div className="h-14 w-full p-2 flex items-center">
        <Button
          style={{ color: token.colorPrimary }}
          type="text"
          size='large'
          icon={<PlusOutlined style={{ color: token.colorPrimary }} />}
        >
          <Typography.Text
            style={{ color: token.colorPrimary }}
            className={`font-medium !m-0  text-[16px]`}
          >
            {t('common.create')}
          </Typography.Text>
        </Button>
      </div>
    </div>
  );
}

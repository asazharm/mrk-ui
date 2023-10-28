import React, { useState } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import { Calendar, Divider, Space, Typography, theme } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import { useToggle } from 'usehooks-ts';
import QueueAnim from 'rc-queue-anim';
import { UpOutlined } from '@ant-design/icons';

dayjs.extend(dayLocaleData);

const CalendarWidget: React.FC = () => {
  const { token } = theme.useToken();
  const [currentDate, setCurrentDate] = useState<string>(
    dayjs().format('MMMM DD, YYYY')
  );

  const [expanded, toggle] = useToggle(false);

  const onPanelChange = (value: Dayjs) => {
    setCurrentDate(value.format('MMMM DD, YYYY'));
  };

  return (
    <div className="h-10">
      <Space
        className="w-full h-full justify-between px-3 cursor-pointer"
        onClick={toggle}
      >
        <Typography.Title
          level={5}
          style={{ color: token.colorPrimary }}
          className={`w-full text-[14px] font-medium !m-0`}
        >
          {currentDate}
        </Typography.Title>
        <UpOutlined
          rotate={expanded ? 0 : 180}
          size={5}
          style={{ color: token.colorPrimary }}
        />
      </Space>

      <QueueAnim
        className="demo-content"
        animConfig={[
          { opacity: [1, 0], translateY: [0, -50] },
          { opacity: [1, 0], translateY: [0, -50] },
        ]}
      >
        {expanded ? (
          <div
            className="absolute z-50 right-6 w-[300px]"
            key="calendarWidgetContainer"
            style={{ background: token.colorBgContainer }}
          >
            <Calendar
              fullscreen={false}
              // onPanelChange={onPanelChange}
              onChange={onPanelChange}
              key={'calendarWidget'}
            />
          </div>
        ) : null}
      </QueueAnim>
      <Divider className="m-0" />
    </div>
  );
};

export default CalendarWidget;

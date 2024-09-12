import { Button, Card, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { useRouter } from '@/router/hooks';

import type { TableProps } from 'antd';

type TableData = {
  key: string;
  title: string;
  time: Date | string;
  date: Date | string;
  status: string;
};
type ColumnsType<T extends object = object> = TableProps<T>['columns'];

function VideoStreaming() {
  const { push } = useRouter();
  const [change, setChange] = useState(false);

  const data: TableData[] = [
    {
      key: '1',
      title: 'Demo Straming',
      time: dayjs().format('hh:mm a'),
      date: dayjs().format('YYYY-MM-DD'),
      status: 'Live',
    },
    {
      key: '2',
      title: 'Demo Upcoming Straming',
      time: dayjs().format('hh:mm a'),
      date: dayjs().format('YYYY-MM-DD'),
      status: 'Upcoming',
    },
  ];

  const columns: ColumnsType<TableData> = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      render: (_, record) => {
        return (
          <div>
            <p>{dayjs().format('hh:mm a')}</p>
          </div>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: 200,
      render: (_, record) => {
        return (
          <div>
            <p>{dayjs().format('YYYY-MM-DD')}</p>
          </div>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 150,
      render: (_, record) => {
        return (
          <div>
            {record.status === 'Live' ? (
              <Tag color="green">Live</Tag>
            ) : (
              <Tag color="orange">Upcoming</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => {
        return (
          record.status === 'Live' && (
            <div className="flex w-full justify-center text-gray">
              <Button type="primary" onClick={() => push(`/streaming/${record.key}`)}>
                Join
              </Button>
            </div>
          )
        );
      },
    },
  ];

  return (
    <Card
      title="Demo Video Stream"
      // extra={
      //   change === false ? (
      //     <Button type="primary" onClick={() => setChange(true)}>
      //       change to Agora RTC NG SDK
      //     </Button>
      //   ) : (
      //     <Button type="primary" onClick={() => setChange(false)}>
      //       change to Agora-uiKit-demo
      //     </Button>
      //   )
      // }
    >
      <Table
        rowKey="id"
        size="middle"
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={data}
        // loading={isLoading}
        pagination={false}
      />
    </Card>
  );
}

export default VideoStreaming;

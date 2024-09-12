import { Button, Card, Col, Form, Input, Modal, Row, Space, Tooltip } from 'antd';
import Table from 'antd/es/table';
import { useState } from 'react';

import { IconButton, Iconify } from '@/components/icon';

import { AssistModule, MediaDetail, ModelDetail } from '#/entity';
import type { TableProps } from 'antd';

type SearchFormFieldType = Pick<ModelDetail, 'name'>;
type ColumnsType<T extends object = object> = TableProps<T>['columns'];

function TaskCompleted() {
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const columns: ColumnsType<AssistModule> = [
    {
      title: 'Username',
      dataIndex: 'username',
      render: (_, record) => {
        return (
          <div>
            <p>{record && `${record.username}`}</p>
          </div>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, record) => {
        return (
          <div>
            <p>{record && `${record.name}`}</p>
          </div>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (_, record) => {
        return (
          <div>
            <Tooltip title={record && record.email}>
              <p>
                {record && record.email.length > 30
                  ? `${record.email.slice(0, 30)}...`
                  : record.email}
              </p>
            </Tooltip>
          </div>
        );
      },
    },

    {
      title: 'Phone No.',
      dataIndex: 'mobile',
      render: (_, record) => {
        return (
          <div>
            <p>{record && record.mobile}</p>
          </div>
        );
      },
    },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <IconButton
          // onClick={() => onViewDetail(record)}
          >
            <Iconify
              icon="lets-icons:view-duotone"
              width="24"
              height="24"
              style={{ color: '#393939', opacity: 0.8 }}
            />
          </IconButton>
        </div>
      ),
    },
  ];

  const onViewDetail = (val: MediaDetail) => {
    setDetailModalOpen(true);
  };

  const handleSearch = (val: any) => {
    setSearchData(val.name);
  };

  const param = {
    page: currentPage,
    limit: pagesize,
    search: searchData,
  };

  // const { data, isLoading, refetch } = useModelListApi(param);
  //  const tablData: ModelDetail[] = (data && data[0].modelList) ?? [];
  // const totalData = data && data[0].count
  const data = [];
  const tablData: AssistModule[] = data;
  const refetch = () => {};
  const totalData = 0;

  const onSearchFormReset = () => {
    searchForm.resetFields();
    setSearchData('');
    // setTimeout(() => {
    //   refetch();
    // }, 1000);
  };

  // useEffect(() => {
  //   if (searchData) {
  //     refetch();
  //   }
  // }, [searchData, refetch]);

  const handlePageChange = (page: number, limit: number) => {
    setPagesize(limit);
    setCurrentPage(page);
    // setTimeout(() => {
    //   refetch();
    // }, 1000);
  };

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Form form={searchForm} onFinish={handleSearch}>
          <Row gutter={[16, 16]}>
            <Col span={24} sm={10} lg={8}>
              <Form.Item<SearchFormFieldType> name="name" className="!mb-0">
                <Input
                  size="middle"
                  placeholder="Search by user name"
                  prefix={<Iconify icon="lets-icons:search" size={20} color="grey" />}
                />
              </Form.Item>
            </Col>
            <Col span={24} sm={14} lg={16}>
              <div className="flex justify-start">
                <Button onClick={searchForm.submit} type="primary">
                  Search
                </Button>
                <Button className="ml-4" onClick={onSearchFormReset}>
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card title="Procedure Completed">
        <Table
          rowKey="id"
          size="middle"
          scroll={{ x: 'max-content' }}
          columns={columns}
          dataSource={tablData}
          // loading={isLoading}
          pagination={{
            current: currentPage,
            pageSize: pagesize,
            total: totalData,
            showSizeChanger: true,
            pageSizeOptions: ['10', '50', '100', '500', '1000'],
            onChange: handlePageChange,
            size: 'default',
          }}
        />
      </Card>
      <Modal
        title="Media Detail"
        open={detailModalOpen}
        footer={null}
        width={600}
        onCancel={() => {
          setDetailModalOpen(false);
        }}
      >
        Details
        {/* <UserDetail {...userData} /> */}
      </Modal>
    </Space>
  );
}

export default TaskCompleted;

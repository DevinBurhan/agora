import { Button, Card, Col, Form, Input, Popconfirm, Row, Space } from 'antd';
import Table from 'antd/es/table';
import { useState } from 'react';

import { IconButton, Iconify } from '@/components/icon';
import { usePathname, useRouter } from '@/router/hooks';
import { useDeleteModel } from '@/states/model/model.hook';

import { taskData } from '../procedure-templates/sample_data';

import { ModelDetail } from '#/entity';
import type { TableProps } from 'antd';

type SearchFormFieldType = Pick<ModelDetail, 'name'>;
type ColumnsType<T extends object = object> = TableProps<T>['columns'];

const { TextArea } = Input;

function TaskAssignment() {
  const { push, replace } = useRouter();
  const pathname = usePathname();
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
    },
    {
      title: 'Procedure',
      dataIndex: 'task',
      render: (_, record) => {
        return (
          <div>
            <p>{record.task.length}</p>
          </div>
        );
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      render: (_, record) => {
        return (
          <div>
            <p>{record.task.length}</p>
          </div>
        );
      },
    },
    {
      title: 'Assign Users',
      dataIndex: 'assignusers',
      render: (_, record) => {
        return (
          <div>
            <p>{record.task.length}</p>
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
          <IconButton onClick={() => push(`${pathname}/edit/${record?.id}`)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <IconButton
            onClick={() => {
              // console.log('pathhhhhhhhhh', `${pathname}/details/${record.id}`);

              push(`${pathname}/details/${record.id}`);
            }}
          >
            <Iconify
              icon="lets-icons:view-duotone"
              width="24"
              height="24"
              style={{ color: '#393939', opacity: 0.8 }}
            />
          </IconButton>
          <Popconfirm
            title="Delete this procedure assignment?"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() => {
              deleteMutate({ id: record?.id });
            }}
          >
            <IconButton>
              <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
            </IconButton>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleSuccessDelete = () => {
    // refetch();
  };
  const { mutate: deleteMutate } = useDeleteModel(handleSuccessDelete);

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
  const tablData: any = taskData.data;
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
                  placeholder="Search by name"
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

      <Card
        title="Procedure Assignment"
        extra={
          <Button
            type="primary"
            onClick={() => {
              push(`${pathname}/assign`);
              // console.log('add path0--------', `${pathname}/assign`);
            }}
          >
            <Iconify icon="octicon:plus-24" size={24} /> Assign Procedure
          </Button>
        }
      >
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
    </Space>
  );
}

export default TaskAssignment;

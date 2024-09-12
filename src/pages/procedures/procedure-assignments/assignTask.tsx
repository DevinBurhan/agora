import {
  Button,
  Form,
  Input,
  Select,
  Card,
  Col,
  Row,
  Table,
  TableProps,
  Tooltip,
  Radio,
  DatePicker,
} from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { useState } from 'react';

import { DEPARTMENTS } from '@/_mock/assets';
import { IconButton, Iconify, SvgIcon } from '@/components/icon';
import { useParams, useRouter } from '@/router/hooks';
import ProTag from '@/theme/antd/components/tag';
import { useThemeToken } from '@/theme/hooks';

import { agentData } from './sample_data';

import { Agents } from '#/entity';

const { TextArea } = Input;
type SearchFormFieldType = Pick<Agents, 'name'>;
type ColumnsType<T extends object = object> = TableProps<T>['columns'];
export default function AssignTaskPage() {
  const { push } = useRouter();
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState('');
  const { id } = useParams();
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);
  const [selectedRow, setSelectedRow] = useState<Agents[]>([]);
  const { colorInfo, colorWarning, colorSuccess } = useThemeToken();
  // useEffect(() => {
  //   form.setFieldsValue({ ...data });
  // }, [data, form]);

  // const handleResp = () => {
  //   onOk();
  //   form.resetFields();
  // };
  // const { mutate: createMutate } = useCreateUser(handleResp);
  // const { mutate: updateMutate } = useUpdateUser(handleResp);

  const handleSubmitForm = async (val: any) => {
    // const Payload: Model = {
    //   name: val?.name,
    //   description: val?.description,
    //   sku: val?.sku,
    //   brand: val?.brand,
    //   category: val?.category,
    //   image_filename: img,
    //   glb_filename: model,
    // };
    console.log('🚀 ~ handleSubmitForm ~ Payload:', val);
    // if (Id !== '') {
    //   await updateMutate({ id: Id, payload: Payload });
    // } else {
    //   await createMutate(Payload);
    // }
  };

  const handleModalClose = () => {
    push(`/procedures/procedure-assignments`);
    form.resetFields();
    setSelectedRow([]);
  };

  const columns: ColumnsType<Agents> = [
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
      title: 'Status',
      dataIndex: 'status',
      render: (_, record) => (
        <ProTag color={record.status === 'offline' ? 'error' : 'success'}>
          {record.status === 'offline' ? 'Offline' : 'Online'}
        </ProTag>
      ),
    },
  ];

  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<Agents> = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRow(selectedRows);
      form.setFieldValue('assigned_agents', selectedRows.length);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log(selected, selectedRows, changeRows);
      setSelectedRow(selectedRows);
      form.setFieldValue('assigned_agents', selectedRows.length);
    },
  };

  // const data = [];
  const tablData: Agents[] = agentData.data;
  const refetch = () => {};
  const totalData = 0;

  const onSearchFormReset = () => {
    searchForm.resetFields();
    setSearchData('');
    // setTimeout(() => {
    //   refetch();
    // }, 1000);
  };

  const handlePageChange = (page: number, limit: number) => {
    setPagesize(limit);
    setCurrentPage(page);
    // setTimeout(() => {
    //   refetch();
    // }, 1000);
  };

  return (
    <Card
      title={
        <div className="flex items-center gap-1">
          <IconButton type="primary" onClick={handleModalClose}>
            <Tooltip title="Go Back" placement="top" color="green">
              <Iconify icon="ion:chevron-back" size={24} />
            </Tooltip>
          </IconButton>
          <p>{id ? 'Edit Assign Procedure' : 'Assign Procedure'}</p>
        </div>
      }
      extra={
        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" onClick={form.submit}>
            Submit
          </Button>
          <Button onClick={handleModalClose} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </div>
      }
    >
      <Form
        name="basic"
        form={form}
        onFinish={handleSubmitForm}
        layout="vertical"
        initialValues={{
          priority: 'medium',
        }}
      >
        <Row gutter={[30, 24]}>
          <Col span={24} lg={8}>
            {' '}
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please add model name',
                },
              ]}
            >
              <Input style={{ width: '100%' }} placeholder="Add model name" />
            </Form.Item>
          </Col>
          <Col span={24} lg={8}>
            <Form.Item
              label="Items/Steps"
              name="items"
              rules={[
                {
                  required: true,
                  message: 'Please choose Items',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select brand items/steps"
                style={{ width: '100%' }}
                maxLength={300}
                options={DEPARTMENTS}
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={8}>
            {' '}
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please add description!',
                },
              ]}
            >
              <TextArea autoSize placeholder="Enter description" />
            </Form.Item>
          </Col>
          <Col span={24} lg={8}>
            {' '}
            <Form.Item label="Priority" name="priority">
              <Radio.Group
              // buttonStyle="solid"
              // onChange={(e) => {
              //   console.log(`radio checked:${e.target.value}`);
              // }}
              >
                <Radio.Button value="high">
                  {' '}
                  <SvgIcon icon="ic_rise" size={20} color={colorWarning} /> High
                </Radio.Button>
                <Radio.Button value="medium">
                  {' '}
                  <SvgIcon
                    icon="ic_rise"
                    size={20}
                    color={colorSuccess}
                    className="rotate-90"
                  />{' '}
                  Medium
                </Radio.Button>
                <Radio.Button value="low">
                  {' '}
                  <SvgIcon icon="ic_rise" size={20} color={colorInfo} className="rotate-180" /> Low
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24} lg={8}>
            <Form.Item
              label="Deadline"
              name="Deadline"
              rules={[{ required: true, message: 'Please add end date!' }]}
            >
              <DatePicker size="middle" showTime className="w-60" format="YYYY-MM-DD HH:mm" />
            </Form.Item>
          </Col>
          <Col span={24} lg={12}>
            <Form.Item
              label="Assigned Agents"
              name="assigned_agents"
              rules={[
                {
                  required: true,
                  message: 'Please select agents',
                },
              ]}
            >
              <Input
                placeholder="Please select agents from table"
                variant="borderless"
                disabled
                style={{ color: '#000000e0' }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Card
              extra={
                <Form form={searchForm}>
                  <Form.Item<SearchFormFieldType> name="name">
                    <Input
                      size="middle"
                      placeholder="Search by user name"
                      onChange={(e) => setSearchData(e.target.value)}
                      prefix={<Iconify icon="lets-icons:search" size={20} color="grey" />}
                      allowClear
                      onClear={onSearchFormReset}
                    />
                  </Form.Item>
                </Form>
              }
            >
              <Table
                rowKey="id"
                size="middle"
                scroll={{ x: 'max-content' }}
                columns={columns}
                dataSource={tablData}
                rowSelection={{ ...rowSelection }}
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
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

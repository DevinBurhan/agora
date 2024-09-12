import { Button, Card, Checkbox, Col, Form, Input, Modal, Row, Select, Space, Table } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import Title from 'antd/es/typography/Title';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { OrgReq } from '@/api/services/orgService';
import { Iconify } from '@/components/icon';
import { useCreateOrg, useUpdateOrg } from '@/states/organisation/organisation.hook';

import { taskItems } from './sample_data';

import { TaskTemplates } from '#/entity';
import type { TableProps } from 'antd';

type SearchFormFieldType = Pick<TaskTemplates, 'name'>;
type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TaskModalProps = {
  formValue: OrgReq;
  Id: string;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};

type AddEditOrgTypes = {
  name: string;
  email: string;
  password?: string;
};

export default function TaskTemplatesPage() {
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);

  const [taskModalProps, setTaskModalProps] = useState<TaskModalProps>({
    formValue: {
      name: '',
      email: '',
      password: '',
    },
    Id: '',
    title: 'New',
    show: false,
    onOk: () => {
      setTaskModalProps((prev) => ({ ...prev, show: false }));
      // refetch();
    },
    onCancel: () => {
      setTaskModalProps((prev) => ({ ...prev, show: false }));
    },
  });

  const columns: ColumnsType<TaskTemplates> = [
    { title: 'Name', dataIndex: 'name' },
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
      title: 'Created At',
      dataIndex: 'created_at',
      align: 'center',
      render: (_, record) => {
        return (
          <div>
            <p>{record.created_at ? dayjs(record.created_at).format('DD-MM-YYYY') : '-'}</p>
          </div>
        );
      },
    },
  ];

  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<TaskTemplates> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const handleSearch = (val: any) => {
    setSearchData(val.name);
  };

  const param = {
    page: currentPage,
    limit: pagesize,
    search: searchData,
  };

  // const { data, isLoading, refetch } = useOrgsListApi(param);
  // const tablData = taskData;
  // const totalOrgData = data && data.count;
  const tablData = [];
  const totalOrgData = 0;
  // const refetch = () => {
  //   console.log('🚀 ~ refetch ~ val:');
  // };

  const onSearchFormReset = () => {
    searchForm.resetFields();
    setSearchData('');
    // setTimeout(() => {
    //   refetch();
    // }, 1000);
  };

  // useEffect(() => {
  //   if (searchData) {
  //     refetch(); // Manually trigger the fetch when searchData changes
  //   }
  // }, [searchData, refetch]);

  const onCreate = () => {
    setTaskModalProps((prev) => ({
      ...prev,
      show: true,
      Id: '',
      title: 'Add Procedure Templates',
      formValue: {
        ...prev.formValue,
        email: '',
        password: '',
        name: '',
      },
    }));
  };

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
                <Button onClick={onSearchFormReset} className="ml-4">
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title="Procedure Templates"
        extra={
          <Button type="primary" onClick={onCreate}>
            <Iconify icon="octicon:plus-24" size={24} /> Add
          </Button>
        }
      >
        <Table
          rowKey="id"
          size="small"
          scroll={{ x: 'max-content' }}
          columns={columns}
          dataSource={[]}
          rowSelection={{ ...rowSelection }}
          // loading={isLoading}
          pagination={{
            current: currentPage,
            pageSize: pagesize,
            total: totalOrgData,
            showSizeChanger: true,
            pageSizeOptions: ['10', '50', '100', '500', '1000'],
            onChange: handlePageChange,
            size: 'default',
          }}
        />
      </Card>
      <TaskScheduleModal {...taskModalProps} />
    </Space>
  );
}

function TaskScheduleModal({ title, show, formValue, onOk, onCancel, Id }: TaskModalProps) {
  const [form] = Form.useForm();
  const [pass, setPass] = useState<string>('');
  const [addAdditionalDetail, setaddAdditionalDetails] = useState({
    selected: {},
    checkbox: ['Geo'],
    visible: false,
  });

  useEffect(() => {
    form.setFieldsValue({ ...formValue });
  }, [formValue, form]);

  const handleResp = () => {
    setPass('');
    onOk();
    form.resetFields();
  };

  const { mutate: createOrgMutate } = useCreateOrg(handleResp);
  const { mutate: updateMutate } = useUpdateOrg(handleResp);
  const handleSubmitForm = async (val: any) => {
    const Payload: AddEditOrgTypes = {
      name: val?.name,
      email: val?.email,
      password: pass,
    };
    if (Id !== '') {
      delete Payload.password;
      await updateMutate({ id: Id, payload: Payload });
    } else {
      await createOrgMutate(Payload);
    }
  };

  const handleChange = (value: string, data: any): void => {
    const checkboxData = ['Geo'];
    if (data.voiceNotes) checkboxData.push('Voice Notes');
    if (data.transcribeNotes) checkboxData.push('Voice Transcribe Notes');
    setaddAdditionalDetails({ selected: data, checkbox: checkboxData, visible: true });
  };

  return (
    <Modal
      title={title}
      open={show}
      footer={null}
      onCancel={() => {
        onCancel();
        setPass('');
        form.resetFields();
      }}
    >
      <Form
        initialValues={formValue}
        name="basic"
        form={form}
        onFinish={handleSubmitForm}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
      >
        <Form.Item
          label="Name"
          name="name"
          required
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Title level={5}>Procedure Item/Activity Description</Title>
        <Form.Item label="Procedure Item" name="taskItem">
          <Select options={taskItems} onChange={handleChange} />
        </Form.Item>
        {addAdditionalDetail.visible && (
          <>
            <Form.Item label="Description" name="taskDescription">
              <Input.TextArea />
            </Form.Item>
            <Checkbox.Group options={addAdditionalDetail.checkbox} />
          </>
        )}
        <div className="mt-5 flex justify-end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            onClick={() => {
              onCancel();
              setPass('');
              form.resetFields();
            }}
            style={{ marginLeft: 8 }}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

import { Button, Card, Col, Form, Image, Input, Modal, Popconfirm, Row, Space } from 'antd';
import Table from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

import { OrgReq } from '@/api/services/orgService';
import { IconButton, Iconify } from '@/components/icon';
import {
  useCreateOrg,
  useDeleteOrg,
  useOrgsListApi,
  useUpdateOrg,
} from '@/states/organisation/organisation.hook';

import { Organization } from '#/entity';
import type { TableProps } from 'antd';

type SearchFormFieldType = Pick<Organization, 'name'>;
type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type OrganizationModalProps = {
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

export default function OrganizationPage() {
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState('');
  const [orgId, setOrgId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);

  const [organizationModalPros, setOrganizationModalProps] = useState<OrganizationModalProps>({
    formValue: {
      name: '',
      email: '',
      password: '',
    },
    Id: '',
    title: 'New',
    show: false,
    onOk: () => {
      setOrganizationModalProps((prev) => ({ ...prev, show: false }));
      refetch();
    },
    onCancel: () => {
      setOrganizationModalProps((prev) => ({ ...prev, show: false }));
    },
  });

  const columns: ColumnsType<Organization> = [
    {
      title: 'Image',
      dataIndex: 'image',
      width: 50,
      render: (_, record) => {
        return (
          <div>
            {record.image !== '' && record.image !== undefined && record.image !== null ? (
              <Image src={record.image} alt={record?.name} width={40} height={40} />
            ) : (
              <Iconify size={40} icon="grommet-icons:status-placeholder-small" color="lightgrey" />
            )}
          </div>
        );
      },
    },
    { title: 'Name', dataIndex: 'name', width: 250 },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      align: 'center',
      width: 120,
      render: (_, record) => {
        return (
          <div>
            <p>{record.created_at ? dayjs(record.created_at).format('DD-MM-YYYY') : '-'}</p>
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
          <IconButton onClick={() => onEdit(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm
            title="Delete this health facility?"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() => {
              setOrgId(record?.organisation_id);
              deleteMutate({ id: record?.organisation_id });
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
    refetch();
    setOrgId('');
  };
  const { mutate: deleteMutate } = useDeleteOrg(handleSuccessDelete);

  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<Organization> = {
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

  const { data, isLoading, refetch } = useOrgsListApi(param);
  const tablData: Organization[] = (data && data.orgList) ?? [];
  const totalOrgData = data && data.count;

  const onSearchFormReset = () => {
    searchForm.resetFields();
    setSearchData('');
    setTimeout(() => {
      refetch();
    }, 1000);
  };

  useEffect(() => {
    if (searchData) {
      refetch(); // Manually trigger the fetch when searchData changes
    }
  }, [searchData, refetch]);

  const onCreate = () => {
    setOrganizationModalProps((prev) => ({
      ...prev,
      show: true,
      Id: '',
      title: 'Add Health Facility',
      formValue: {
        ...prev.formValue,
        email: '',
        password: '',
        name: '',
      },
    }));
  };

  const onEdit = (val: Organization) => {
    setOrganizationModalProps((prev) => ({
      ...prev,
      show: true,
      Id: val?.organisation_id,
      title: 'Edit Health Facility',
      formValue: {
        ...prev.formValue,
        email: val?.user?.email,
        password: '',
        name: val?.name,
      },
    }));
  };

  const handlePageChange = (page: number, limit: number) => {
    setPagesize(limit);
    setCurrentPage(page);
    setTimeout(() => {
      refetch();
    }, 1000);
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
        title="Health Facility List"
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
          dataSource={tablData}
          rowSelection={{ ...rowSelection }}
          loading={isLoading}
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
      <OrganizationModal {...organizationModalPros} />
    </Space>
  );
}

function OrganizationModal({ title, show, formValue, onOk, onCancel, Id }: OrganizationModalProps) {
  const [form] = Form.useForm();
  const [pass, setPass] = useState<string>('');

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
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: t('sys.login.invalidEmaild'),
            },
            { required: true, message: t('sys.login.emaildPlaceholder') },
          ]}
        >
          <Input placeholder={t('sys.login.email')} />
        </Form.Item>
        <Form.Item label="Password" name="password" required>
          {' '}
          <Input.Password
            disabled={Id !== ''}
            onChange={(e) => setPass(e.target.value)}
            placeholder={Id !== '' ? '******' : t('sys.login.password')}
          />
        </Form.Item>
        <div className="flex justify-end">
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

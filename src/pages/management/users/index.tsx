import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Tooltip,
} from 'antd';
import Table from 'antd/es/table';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

import { DEPARTMENTS, GENDER, USER_POSSITIONS, USER_PREFIX_TITLE } from '@/_mock/assets';
import { IconButton, Iconify } from '@/components/icon';
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUsersListApi,
} from '@/states/users/users.hook';

import UserDetail, { UserDetailProps } from './UserDetail';

import { OptionValues, User } from '#/entity';
import type { TableProps } from 'antd';

type SearchFormFieldType = Pick<User, 'first_name'>;
type ColumnsType<T extends object = object> = TableProps<T>['columns'];

export default function UserPage() {
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [userData, setUserData] = useState<UserDetailProps>({
    userData: {
      user_id: '',
      first_name: '',
      last_name: '',
      email: '',
      created_at: new Date(),
      updated_at: new Date(),
      user_details: {
        id: '',
        title: '',
        gender: '',
        phone_number: '',
        position: '',
        department: '',
        province: '',
        persal_number: '',
        created_at: new Date(),
        updated_at: new Date(),
      },
    },
  });

  const [userModalPros, setUserModalProps] = useState<UserModalProps>({
    data: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      title: 'Dr',
      gender: '',
      phone_number: '',
      position: '',
      department: '',
      province: '',
      persal_number: '',
    },
    Id: '',
    title: 'New',
    show: false,
    onOk: () => {
      setUserModalProps((prev) => ({ ...prev, show: false }));
      refetch();
    },
    onCancel: () => {
      setUserModalProps((prev) => ({ ...prev, show: false }));
    },
  });

  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 250,
      render: (_, record) => {
        return (
          <div>
            <p>
              {record && `${record.user_details.title} ${record.first_name} ${record.last_name}`}
            </p>
          </div>
        );
      },
    },
    {
      title: 'Position',
      dataIndex: 'position',
      render: (_, record) => {
        return (
          <div>
            <p>{record && record.user_details.position}</p>
          </div>
        );
      },
    },
    {
      title: 'Department',
      dataIndex: 'department',
      render: (_, record) => {
        return (
          <div>
            <p>{record && record.user_details.department}</p>
          </div>
        );
      },
    },
    {
      title: 'Province',
      dataIndex: 'province',
      render: (_, record) => {
        return (
          <div>
            <p>{record && record.user_details.province}</p>
          </div>
        );
      },
    },
    {
      title: 'email',
      dataIndex: 'email',
      render: (_, record) => {
        return (
          <div>
            <Tooltip title={record && record.email}>
              <p>
                {record && record.email.length > 24
                  ? `${record.email.slice(1, 24)}...`
                  : record.email}
              </p>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      render: (_, record) => {
        return (
          <div>
            <p>{record && record.user_details.phone_number}</p>
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
          <IconButton onClick={() => onViewDetail(record)}>
            <Iconify
              icon="lets-icons:view-duotone"
              width="24"
              height="24"
              style={{ color: '#393939', opacity: 0.8 }}
            />
          </IconButton>

          <Popconfirm
            title="Delete this User?"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() => {
              deleteMutate({ id: record?.user_id });
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

  const onViewDetail = (val: User) => {
    setDetailModalOpen(true);
    setUserData({
      userData: val,
    });
  };
  const handleSuccessDelete = () => {
    refetch();
  };
  const { mutate: deleteMutate } = useDeleteUser(handleSuccessDelete);

  const handleSearch = (val: any) => {
    setSearchData(val.first_name);
  };

  const param = {
    page: currentPage,
    limit: pagesize,
    search: searchData,
  };

  const { data, isLoading, refetch } = useUsersListApi(param);
  const tablData: User[] = (data && data[0].userList) ?? [];
  const totalUserData = data && data[0].count;

  const onSearchFormReset = () => {
    searchForm.resetFields();
    setSearchData('');
    setTimeout(() => {
      refetch();
    }, 1000);
  };

  useEffect(() => {
    if (searchData) {
      refetch();
    }
  }, [searchData, refetch]);

  const onCreate = () => {
    setUserModalProps((prev) => ({
      ...prev,
      show: true,
      Id: '',
      title: 'Add User',
      data: {
        ...prev.data,
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        title: 'Dr',
        gender: '',
        phone_number: '',
        position: '',
        department: '',
        province: '',
        persal_number: '',
      },
    }));
  };

  const onEdit = (val: User) => {
    setUserModalProps((prev) => ({
      ...prev,
      show: true,
      Id: val?.user_id,
      title: 'Edit User Details',
      data: {
        ...prev.data,
        email: val.email,
        password: '',
        first_name: val.first_name,
        last_name: val.last_name,
        title: val.user_details.title,
        gender: val.user_details.gender,
        phone_number: val.user_details.phone_number,
        position: val.user_details.position,
        department: val.user_details.department,
        province: val.user_details.province,
        persal_number: val.user_details.persal_number,
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
              <Form.Item<SearchFormFieldType> name="first_name" className="!mb-0">
                <Input
                  size="middle"
                  placeholder="Search by first name"
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
        title="Users List"
        extra={
          <Button type="primary" onClick={onCreate}>
            <Iconify icon="octicon:plus-24" size={24} /> Add User
          </Button>
        }
      >
        <Table
          rowKey="id"
          size="middle"
          scroll={{ x: 'max-content' }}
          columns={columns}
          dataSource={tablData}
          loading={isLoading}
          pagination={{
            current: currentPage,
            pageSize: pagesize,
            total: totalUserData,
            showSizeChanger: true,
            pageSizeOptions: ['10', '50', '100', '500', '1000'],
            onChange: handlePageChange,
            size: 'default',
          }}
        />
      </Card>
      <UserDetailModal {...userModalPros} />
      <Modal
        title="User Detail"
        open={detailModalOpen}
        footer={null}
        width={600}
        onCancel={() => {
          setDetailModalOpen(false);
        }}
      >
        <UserDetail {...userData} />
      </Modal>
    </Space>
  );
}

type UserFormType = {
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  title: string;
  gender: string;
  phone_number: number | string;
  position: string;
  department: string;
  province: string;
  persal_number: number | string;
};

type UserModalProps = {
  data: UserFormType;
  Id: string;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};

function UserDetailModal({ title, Id, show, data, onOk, onCancel }: UserModalProps) {
  const [form] = Form.useForm();
  const [pass, setPass] = useState<string>('');

  useEffect(() => {
    form.setFieldsValue({ ...data });
  }, [data, form]);

  const handleResp = () => {
    setPass('');
    onOk();
    form.resetFields();
  };

  const { mutate: createMutate } = useCreateUser(handleResp);
  const { mutate: updateMutate } = useUpdateUser(handleResp);

  const handleSubmitForm = async (val: any) => {
    const Payload: UserFormType = {
      email: val?.email,
      password: pass,
      first_name: val?.first_name,
      last_name: val?.last_name,
      title: val?.title,
      gender: val?.gender,
      phone_number: val?.phone_number,
      position: val?.position,
      department: val?.department,
      province: val?.province,
      persal_number: val?.persal_number,
    };
    if (Id !== '') {
      delete Payload.password;
      await updateMutate({ id: Id, payload: Payload });
    } else {
      await createMutate(Payload);
    }
  };
  const prefixSelector = (
    <Form.Item name="title" noStyle required>
      <Select style={{ width: 90 }} options={USER_PREFIX_TITLE} />
    </Form.Item>
  );

  return (
    <Modal
      title={title}
      open={show}
      footer={null}
      maskClosable={false}
      onCancel={() => {
        onCancel();
        setPass('');
        form.resetFields();
      }}
    >
      <Form
        name="basic"
        form={form}
        onFinish={handleSubmitForm}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
      >
        <Form.Item<UserFormType>
          label="First Name"
          name="first_name"
          rules={[
            {
              required: true,
              message: 'Please add first name',
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{ width: '100%' }}
            placeholder="Add first name"
          />
        </Form.Item>
        <Form.Item<UserFormType>
          label="Last Name"
          name="last_name"
          rules={[
            {
              required: true,
              message: 'Please add last name',
            },
          ]}
        >
          <Input placeholder="Add last name" />
        </Form.Item>
        <Form.Item<UserFormType>
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: 'Please choose gender',
            },
          ]}
        >
          <Radio.Group>
            {GENDER &&
              GENDER.map((val: OptionValues) => {
                return (
                  <Radio key={val?.value} value={val?.value}>
                    {val?.label}
                  </Radio>
                );
              })}
          </Radio.Group>
        </Form.Item>
        <Form.Item<UserFormType>
          label="Position"
          name="position"
          rules={[
            {
              required: true,
              message: 'Please select position',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select position"
            style={{ width: '100%' }}
            maxLength={300}
            options={USER_POSSITIONS}
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item<UserFormType>
          label="Department"
          name="department"
          rules={[
            {
              required: true,
              message: 'Please select department',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select department"
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
        <Form.Item<UserFormType>
          label="Persal No."
          name="persal_number"
          rules={[
            {
              required: true,
              message: 'Please enter persal number!',
            },
          ]}
        >
          <Input
            placeholder="Enter persal number"
            onInput={(e: any) => {
              e.target.value = e.target.value.replace(/[^\d]/g, '');
            }}
            onKeyDown={(event: any) => {
              if (event.key === '.' || event.key === '-' || event.key === 'e') {
                event.preventDefault();
              }
            }}
          />
        </Form.Item>
        <Form.Item<UserFormType>
          name="phone_number"
          label="Phone No."
          rules={[
            {
              required: true,
              message: 'Please add phone number!',
            },
            {
              max: 10,
              message: 'Maximum 10 numbers are required!',
            },
            {
              min: 10,
              message: 'Minimum 10 numbers are required!',
            },
          ]}
        >
          <Input
            type="tel"
            addonBefore="+91"
            style={{
              width: '100%',
            }}
            maxLength={10}
            onChange={(e) => {
              form.setFieldValue('phone_number', e.target.value.slice(0, 10));
            }}
            onInput={(e: any) => {
              e.target.value = e.target.value.replace(/[^\d]/g, '');
            }}
            onKeyDown={(event: any) => {
              if (event.key === '.' || event.key === '-' || event.key === 'e') {
                event.preventDefault();
              }
            }}
          />
        </Form.Item>
        <Form.Item<UserFormType>
          label="Province"
          name="province"
          rules={[
            {
              required: true,
              message: 'Please add province detail!',
            },
          ]}
        >
          <Input placeholder="Enter province" />
        </Form.Item>
        <Form.Item<UserFormType>
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
        <Form.Item<UserFormType> label="Password" name="password" required>
          {' '}
          <Input.Password
            disabled={Id !== ''}
            onChange={(e) => setPass(e.target.value)}
            placeholder={t('sys.login.password')}
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

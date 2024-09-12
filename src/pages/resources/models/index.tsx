import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  App,
  Upload as uploadComponent,
} from 'antd';
import Table from 'antd/es/table';
import { RcFile } from 'antd/es/upload';
import { useEffect, useRef, useState } from 'react';

import { DEPARTMENTS } from '@/_mock/assets';
import { IconButton, Iconify } from '@/components/icon';
import { Upload } from '@/components/upload';
import { getFileFormat } from '@/components/upload/utils';
import { useDeleteModel } from '@/states/model/model.hook';
import { useCreateUser, useUpdateUser } from '@/states/users/users.hook';

import { Model, ModelDetail } from '#/entity';
import type { TableProps } from 'antd';

import '@google/model-viewer/lib/model-viewer';

import ModelPreview from './ModelPreview';

type SearchFormFieldType = Pick<ModelDetail, 'name'>;
type ColumnsType<T extends object = object> = TableProps<T>['columns'];

type ActionModalProps = {
  data: Model;
  Id: string;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};

const { TextArea } = Input;

function ModelsPage() {
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [userModalPros, setUserModalProps] = useState<ActionModalProps>({
    data: {
      name: '',
      description: '',
      sku: '',
      brand: '',
      category: '',
      image_filename: '',
      glb_filename: '',
    },
    Id: '',
    title: 'New',
    show: false,
    onOk: () => {
      setUserModalProps((prev) => ({ ...prev, show: false }));
      // refetch();
    },
    onCancel: () => {
      setUserModalProps((prev) => ({ ...prev, show: false }));
    },
  });
  // const [userData, setUserData] = useState<ModelDetail>({
  //   id: '',
  //   uuid: '',
  //   created_at: new Date(),
  //   updated_at: new Date(),
  //   type: '',
  //   preview: '',
  //   account_id: '',
  //   name: '',
  //   description: '',
  //   sku: '',
  //   brand: '',
  //   category: '',
  //   image_filename: '',
  //   glb_filename: '',
  // });

  const columns: ColumnsType<ModelDetail> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 250,
      render: (_, record) => {
        return (
          <div>
            <p>{record && `${record.name}`}</p>
          </div>
        );
      },
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      render: (_, record) => {
        return (
          <div>
            <p>{record && record.sku}</p>
          </div>
        );
      },
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      render: (_, record) => {
        return (
          <div>
            <p>{record && record.brand}</p>
          </div>
        );
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (_, record) => {
        return (
          <div>
            <p>{record && record.category}</p>
          </div>
        );
      },
    },
    {
      title: 'Preview',
      dataIndex: 'preview',
      render: (_, record) => {
        return (
          <div>
            <p>{record && record.preview}</p>
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

          <Popconfirm
            title="Delete this 3D model?"
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

  const onViewDetail = (val: ModelDetail) => {
    setDetailModalOpen(true);
  };
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
  const tablData: ModelDetail[] = [];
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

  const onCreate = () => {
    setUserModalProps((prev) => ({
      ...prev,
      show: true,
      Id: '',
      title: 'Add 3D Model',
      data: {
        ...prev.data,
        id: '',
        uuid: '',
        created_at: new Date(),
        updated_at: new Date(),
        type: '',
        preview: '',
        account_id: '',
        name: '',
        description: '',
        sku: '',
        brand: '',
        category: '',
        image_filename: '',
        glb_filename: '',
      },
    }));
  };

  const onEdit = (val: ModelDetail) => {
    setUserModalProps((prev) => ({
      ...prev,
      show: true,
      Id: val?.id,
      title: 'Edit Model Details',
      data: {
        ...prev.data,
        id: '',
        uuid: '',
        created_at: new Date(),
        updated_at: new Date(),
        type: '',
        preview: '',
        account_id: '',
        name: '',
        description: '',
        sku: '',
        brand: '',
        category: '',
        image_filename: '',
        glb_filename: '',
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
                  size="middle"
                  placeholder="Search by model name"
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
        title="Model List"
        extra={
          <Button type="primary" onClick={onCreate}>
            <Iconify icon="octicon:plus-24" size={24} /> Add
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
      <UserDetailModal {...userModalPros} />
      <Modal
        title="Model Detail"
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

export default ModelsPage;

function UserDetailModal({ title, Id, show, data, onOk, onCancel }: ActionModalProps) {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const modelFile = useRef<HTMLInputElement | null>(null);
  const [brandImgErr, setBrandImgErr] = useState('');
  const [model, setModel] = useState<File>();
  const [modelFileVal, setModelFileVal] = useState('');
  const [modelErr, setModelErr] = useState('');
  const [fileList, setFileList] = useState<RcFile>();
  const [modelUrl, setModelUrl] = useState('');
  const [modelPreviewProp, setModelPreviewProp] = useState({
    glbSrc: '',
    iosSrc: '',
    alt: '',
  });
  useEffect(() => {
    form.setFieldsValue({ ...data });
  }, [data, form]);

  const handleResp = () => {
    onOk();
    form.resetFields();
  };

  const changeModelHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files as FileList;
    if (file && file.length !== 0) {
      const fileType = file[0].name.split('.').pop();
      if (fileType === 'glb' || fileType === 'gltf') {
        const url = URL.createObjectURL(file?.[0]);
        setModelErr('');
        setModel(file?.[0]);
        setModelFileVal(file[0].name);
        setModelUrl(url);
        setModelPreviewProp({
          glbSrc: url,
          iosSrc: url,
          alt: file[0].name,
        });
      } else {
        message.warning('Only glb, gltf, 3ds or 3mf are allowed.');
        setModelErr('Please select glb, gltf, 3ds or 3mf type file');
      }
    }
  };

  const { mutate: createMutate } = useCreateUser(handleResp);
  const { mutate: updateMutate } = useUpdateUser(handleResp);

  const handleSubmitForm = async (val: any) => {
    const Payload: Model = {
      name: val?.name,
      description: val?.description,
      sku: val?.sku,
      brand: val?.brand,
      category: val?.category,
      image_filename: fileList,
      glb_filename: model,
    };
    console.log('🚀 ~ handleSubmitForm ~ Payload:', Payload);
    // if (Id !== '') {
    //   await updateMutate({ id: Id, payload: Payload });
    // } else {
    //   await createMutate(Payload);
    // }
  };

  const removeModel = () => {
    setModel(undefined);
    setModelFileVal('');
    setModelUrl('');
    setModelErr('');
    setModelPreviewProp({
      glbSrc: '',
      iosSrc: '',
      alt: '',
    });
  };

  const handleModalClose = () => {
    onCancel();
    form.resetFields();
    setBrandImgErr('');
    removeModel();
  };

  useEffect(() => {
    return () => {
      if (modelUrl) {
        URL.revokeObjectURL(modelUrl);
      }
    };
  }, [modelUrl]);

  return (
    <Modal
      width={600}
      title={title}
      open={show}
      footer={null}
      maskClosable={false}
      onCancel={handleModalClose}
    >
      <Form
        name="basic"
        form={form}
        onFinish={handleSubmitForm}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
      >
        <Form.Item<Model>
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
        <Form.Item<Model>
          label="SKU"
          name="sku"
          rules={[
            {
              required: true,
              message: 'Please add SKU',
            },
          ]}
        >
          <Input placeholder="Add sku" />
        </Form.Item>
        <Form.Item<Model>
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please add description!',
            },
          ]}
        >
          <TextArea rows={3} placeholder="Enter description" />
        </Form.Item>
        <Form.Item<Model>
          label="Brand"
          name="brand"
          rules={[
            {
              required: true,
              message: 'Please choose brand',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select brand"
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
        <Form.Item<Model>
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: 'Please select category',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select category"
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
        <Form.Item label="Image" valuePropName="fileList" name="image" required>
          <Card style={{ overflow: 'hidden' }}>
            <Upload
              thumbnail={false}
              maxCount={1}
              name="single"
              beforeUpload={(info) => {
                const format = getFileFormat(info.name);
                const isImg = format === 'img';
                if (!isImg) {
                  message.error({ content: `${info.name} is not a image file`, duration: 3 });
                  setBrandImgErr(`${info.name} is not a image file`);
                }
                setBrandImgErr('');
                return isImg || uploadComponent.LIST_IGNORE;
              }}
              onChange={({ file: FileDetail }) => {
                setFileList(FileDetail.originFileObj);
              }}
            />
          </Card>
          {brandImgErr !== '' && <p className="customErrorMsg mb-2 text-error">{brandImgErr}</p>}
        </Form.Item>

        <Form.Item label="Model" valuePropName="modelList" name="model" required>
          <div
            className="flex cursor-pointer flex-wrap items-center gap-2 rounded-[4px] border-[1px] border-[#d9d9d9] px-2 py-2 font-semibold"
            onClick={() => {
              modelFile.current?.click();
            }}
          >
            <Iconify icon="tabler:upload" size={20} />
            <p>{modelUrl ? 'Change Model' : 'Select Model File'}</p>
            <input
              type="file"
              onChange={changeModelHandler}
              id="modelFile"
              ref={modelFile}
              style={{ display: 'none' }}
            />
          </div>
          {modelUrl ? (
            <div>
              {modelFileVal !== undefined && modelFileVal !== null && modelFileVal !== '' ? (
                <div className="flex flex-wrap items-center gap-1">
                  <IconButton onClick={removeModel} type="default">
                    <Iconify icon="lets-icons:trash-duotone-line" size={24} />
                  </IconButton>
                  {modelFileVal}
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
          {modelErr !== '' && <p className="customErrorMsg text-error">{modelErr}</p>}
          {modelUrl && <ModelPreview {...modelPreviewProp} />}
        </Form.Item>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={handleModalClose} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

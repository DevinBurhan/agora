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
  Tooltip,
  App,
  Upload as uploadComponent,
} from 'antd';
import Table from 'antd/es/table';
import { RcFile } from 'antd/es/upload';
import { useEffect, useState } from 'react';

import { MEDIA_TYPE } from '@/_mock/assets';
import { IconButton, Iconify } from '@/components/icon';
import { Upload } from '@/components/upload';
import { getFileFormat } from '@/components/upload/utils';
import { useCreateMedia, useUpdateMedia } from '@/states/media/media.hook';
import { useDeleteModel } from '@/states/model/model.hook';

import { Media, MediaDetail, ModelDetail } from '#/entity';
import type { TableProps } from 'antd';

type SearchFormFieldType = Pick<ModelDetail, 'name'>;
type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type ActionModalProps = {
  data: Media;
  Id: string;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};
const { TextArea } = Input;

function MedicalReportsPage() {
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [userModalPros, setUserModalProps] = useState<ActionModalProps>({
    data: {
      name: '',
      description: '',
      type: '',
      brand: '',
      category: '',
      filename: '',
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

  const columns: ColumnsType<MediaDetail> = [
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
      title: 'Description',
      dataIndex: 'discription',
      render: (_, record) => {
        return (
          <div>
            <Tooltip title={record && record.description}>
              <p>
                {record && record.description.length > 30
                  ? `${record.description.slice(0, 30)}...`
                  : record.description}
              </p>
            </Tooltip>
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
      title: 'Type',
      dataIndex: 'type',
      render: (_, record) => {
        return (
          <div>
            <p>{record && record.type}</p>
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
            title="Delete this Medical Report?"
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

  const onViewDetail = (val: MediaDetail) => {
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
  const tablData: MediaDetail[] = [];
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
      title: 'Add Medical Report',
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
        brand: '',
        category: '',
        filename: '',
      },
    }));
  };

  const onEdit = (val: MediaDetail) => {
    setUserModalProps((prev) => ({
      ...prev,
      show: true,
      Id: val?.id,
      title: 'Edit Medical Report Details',
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
        brand: '',
        category: '',
        filename: '',
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
                  placeholder="Search by media name"
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
        title="Medical Report List"
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
      <ActionModal {...userModalPros} />
      <Modal
        title="Medical Report Detail"
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

export default MedicalReportsPage;

function ActionModal({ title, Id, show, data, onOk, onCancel }: ActionModalProps) {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File>();
  const [brandImgErr, setBrandImgErr] = useState('');
  const [fileType, setFileType] = useState<string>('');
  const [fileList, setFileList] = useState<RcFile>();
  const { message } = App.useApp();

  useEffect(() => {
    form.setFieldsValue({ ...data });
  }, [data, form]);

  const handleResp = () => {
    onOk();
    form.resetFields();
  };

  const { mutate: createMutate } = useCreateMedia(handleResp);
  const { mutate: updateMutate } = useUpdateMedia(handleResp);

  const handleSubmitForm = async (val: any) => {
    const Payload: Media = {
      name: val?.name,
      description: val?.description,
      type: val?.type,
      brand: val?.brand,
      category: val?.category,
      filename: fileList,
    };
    console.log('🚀 ~ handleSubmitForm ~ Payload:', Payload);
    // if (Id !== '') {
    //   await updateMutate({ id: Id, payload: Payload });
    // } else {
    //   await createMutate(Payload);
    // }
  };

  const removeImg = () => {
    setFile(undefined);
  };

  const handleModalClose = () => {
    onCancel();
    form.resetFields();
    setBrandImgErr('');
    setFile(undefined);
    setFileType('');
  };

  function displayPDF(blobUrl: string) {
    const iframe = document.createElement('iframe');
    iframe.src = blobUrl;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = 'none';

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.body.appendChild(iframe);
      newWindow.document.title = `Project_browchure_${blobUrl}`;
    }
  }

  return (
    <Modal
      width={550}
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
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
      >
        <Form.Item<Media>
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
        <Form.Item<Media>
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

        <Form.Item<Media>
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: 'Please select media type',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select type"
            style={{ width: '100%' }}
            maxLength={300}
            options={MEDIA_TYPE}
            optionFilterProp="label"
            onChange={(e) => {
              removeImg();
              setFileType(e);
            }}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
          />
        </Form.Item>
        {fileType ? (
          <>
            <div className="my-4">
              <Card title={`Upload ${fileType} File`}>
                <Upload
                  thumbnail={false}
                  maxCount={1}
                  name="single"
                  beforeUpload={(info) => {
                    const format = getFileFormat(info.name);
                    let isValid = true;
                    if (fileType === 'Image') {
                      isValid = format === 'img';
                      if (!isValid) {
                        message.error({ content: `${info.name} is not a image file`, duration: 3 });
                        setBrandImgErr(`${info.name} is not a image file`);
                      }
                    }
                    if (fileType === 'Pdf') {
                      isValid = format === 'pdf';
                      if (!isValid) {
                        message.error({ content: `${info.name} is not a pdf file`, duration: 3 });
                        setBrandImgErr(`${info.name} is not a pdf file`);
                      }
                    }
                    if (fileType === 'Video') {
                      isValid = format === 'video';
                      if (!isValid) {
                        message.error({ content: `${info.name} is not a video file`, duration: 3 });
                        setBrandImgErr(`${info.name} is not a video file`);
                      }
                    }
                    setBrandImgErr('');
                    return isValid || uploadComponent.LIST_IGNORE;
                  }}
                  onChange={({ file: FileDetail }) => {
                    setFileList(FileDetail.originFileObj);
                  }}
                />
              </Card>
            </div>
            {brandImgErr !== '' && <p className="customErrorMsg text-error">{brandImgErr}</p>}
          </>
        ) : (
          ''
        )}

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

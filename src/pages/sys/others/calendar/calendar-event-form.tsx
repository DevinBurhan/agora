import { LoadingOutlined } from '@ant-design/icons';
import { EventInput } from '@fullcalendar/core';
import { DatePicker, Form, Input, Modal, Popconfirm, Select, Spin } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { IconButton, Iconify } from '@/components/icon';
import { useCreateAppointment, useUpdateAppointment } from '@/states/appointment/appointment.hook';
import { useAllUsersListApi } from '@/states/users/users.hook';

import { OptionValues } from '#/entity';

export type CalendarEventFormFieldType = Pick<EventInput, 'title' | 'allDay' | 'color'> & {
  id: string;
  description?: string;
  doctorId: string;
  coHostId: string;
  start?: Dayjs;
  end?: Dayjs;
};

type Props = {
  type: 'edit' | 'add';
  open: boolean;
  onCancel: VoidFunction;
  onEdit?: (event: CalendarEventFormFieldType) => void;
  onCreate?: (event: CalendarEventFormFieldType) => void;
  onDelete: (id: string) => void;
  initValues: CalendarEventFormFieldType;
  onSuccessForm: () => void;
};

const COLORS = [
  '#00a76f',
  '#8e33ff',
  '#00b8d9',
  '#003768',
  '#22c55e',
  '#ffab00',
  '#ff5630',
  '#7a0916',
];

export default function CalendarEventForm({
  type,
  open,
  onCancel,
  initValues,
  onSuccessForm,
  onDelete,
}: Props) {
  const title = type === 'add' ? 'Add Appointment' : 'Edit Appointment';
  const [form] = Form.useForm();
  const [assignList, setAssignList] = useState<OptionValues[]>([]);
  const [coHostList, setCoHostList] = useState<OptionValues[]>([]);
  const [selectDr, setSelectDr] = useState('');
  const { data: usersList } = useAllUsersListApi();

  // create select option of users list for doctor's select
  useEffect(() => {
    if (usersList) {
      const option: OptionValues[] =
        usersList &&
        usersList?.map((user) => {
          return {
            value: user?.user_id,
            label: `${user?.first_name} ${user?.last_name}`,
          };
        });
      setAssignList(option);
    }
  }, [usersList, type]);

  // SET FORM INITIAL VALUES
  useEffect(() => {
    const { color = COLORS[0], ...others } = initValues;
    form.setFieldsValue({ ...others, color });
    setSelectDr(initValues.doctorId);
  }, [initValues, form]);

  // filter assigny list for co host users
  useEffect(() => {
    if (assignList && selectDr !== '') {
      const option: OptionValues[] =
        assignList && assignList?.filter((user) => user?.value !== selectDr);
      setCoHostList(option);
    }
  }, [assignList, selectDr]);

  const onsuccess = () => {
    onSuccessForm();
    setAssignList([]);
    setCoHostList([]);
    setSelectDr('');
    form.resetFields();
  };

  const { mutate: createMutate, isLoading: createLoading } = useCreateAppointment(onsuccess);
  const { mutate: updateMutate, isLoading: updateLoading } = useUpdateAppointment(onsuccess);

  const handleSubmit = () => {
    if (updateLoading === true || createLoading === true) {
      return;
    }
    form
      .validateFields()
      .then(async (values) => {
        const { id: Id } = initValues;
        const event = { ...values, Id };
        const Payload = {
          name: event.title,
          description: event.description,
          schedule_date_time: dayjs(event.start).format('YYYY-MM-DD HH:mm:ss'),
          doctor_id: event.doctorId,
          co_host_id: event.coHostId,
        };

        if (type !== 'add') {
          await updateMutate({ id: Id, payload: Payload });
        } else {
          await createMutate(Payload);
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  // eslint-disable-next-line react/function-component-definition, react/no-unstable-nested-components
  const ModalFooter = (_, { OkBtn, CancelBtn }) => {
    return (
      <div>
        {type === 'edit' ? (
          <div className="flex justify-between">
            <Popconfirm
              title="Delete this appointment?"
              okText="Yes"
              cancelText="No"
              placement="top"
              onConfirm={() => {
                onDelete(initValues.id);
                onCancel();
                setAssignList([]);
                setCoHostList([]);
                setSelectDr('');
              }}
            >
              <IconButton>
                <Iconify icon="fluent:delete-16-filled" size={20} color="#ff5630" />
              </IconButton>
            </Popconfirm>
            <div className="flex justify-end gap-3">
              <CancelBtn />
              <OkBtn />
            </div>
          </div>
        ) : (
          <div className="flex justify-end gap-3">
            <CancelBtn />
            <OkBtn />
          </div>
        )}
      </div>
    );
  };

  return (
    <Modal
      open={open}
      title={title}
      centered
      maskClosable={false}
      okText={
        createLoading || updateLoading ? (
          <>
            {' '}
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 20, color: 'white' }} spin />}
            />{' '}
            Submit
          </>
        ) : (
          'Submit'
        )
      }
      onCancel={() => {
        onCancel();
        setAssignList([]);
        setCoHostList([]);
        setSelectDr('');
        form.resetFields();
      }}
      footer={ModalFooter}
      onOk={handleSubmit}
    >
      <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 17 }} initialValues={initValues}>
        <Form.Item<CalendarEventFormFieldType>
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input size="middle" placeholder="Add appointment title" />
        </Form.Item>

        <Form.Item<CalendarEventFormFieldType> label="Description" name="description">
          <Input.TextArea placeholder="Add appointment description" />
        </Form.Item>

        <Form.Item<CalendarEventFormFieldType>
          label="Appointment date"
          name="start"
          rules={[{ required: true, message: 'Please input appointment date!' }]}
        >
          <DatePicker size="middle" showTime className="w-full" format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Form.Item<CalendarEventFormFieldType>
          label="Doctor"
          name="doctorId"
          rules={[{ required: true, message: 'Please select doctor!' }]}
        >
          <Select
            showSearch
            placeholder="Select doctor"
            style={{ width: '100%' }}
            maxLength={300}
            options={assignList}
            optionFilterProp="label"
            onChange={(e) => {
              setSelectDr(e);
              form.setFieldsValue({ coHostId: '' });
            }}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item<CalendarEventFormFieldType>
          label="Co-Host"
          name="coHostId"
          rules={[{ required: true, message: 'Please select option' }]}
        >
          <Select
            showSearch
            placeholder="Select co-host/assistent"
            style={{ width: '100%' }}
            maxLength={300}
            disabled={selectDr === ''}
            options={coHostList}
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

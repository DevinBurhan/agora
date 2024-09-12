import { Button, Modal, Space, Tag } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { useRouter } from '@/router/hooks';
import { useUserInfo } from '@/store/authStore';

export type CalendarEventDataType = {
  appointment_id: string;
  co_host_id: object | any;
  name: string;
  description: string;
  is_co_host: boolean;
  schedule_date_time: Dayjs;
};

type Props = {
  open: boolean;
  onCancel: VoidFunction;
  onDelete?: (id: string) => void;
  data: CalendarEventDataType;
};

export default function CalendarEventDetail({ open, onCancel, data, onDelete }: Props) {
  const { firstName, lastName } = useUserInfo();
  const { push } = useRouter();
  // eslint-disable-next-line react/function-component-definition, react/no-unstable-nested-components
  const ModalFooter = (_, { OkBtn, CancelBtn }) => {
    return (
      <div className="flex justify-end gap-3 pt-3">
        {data?.is_co_host === false && (
          <Button
            type="primary"
            ghost
            onClick={() => {
              push(`/procedures/procedure-assignments/assign`);
              // console.log('add path0--------', `${pathname}/assign`);
            }}
          >
            Assign Procedure
          </Button>
        )}

        <OkBtn />
      </div>
    );
  };

  return (
    <Modal
      open={open}
      title={<span className="text-error">Upcoming Appointment</span>}
      centered
      maskClosable={false}
      okText="Close"
      onOk={() => {
        onCancel();
      }}
      onCancel={onCancel}
      footer={ModalFooter}
    >
      <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '14px' }}>
        <div className="flex items-center gap-2">
          <p className="font-semibold">Title :</p>
          <p>{data?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">Description :</p>
          <p>{data?.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">Doctor :</p>
          <p>
            {data?.is_co_host === false ? (
              <>
                {firstName} {lastName}{' '}
                <Tag bordered={false} color="error">
                  You
                </Tag>
              </>
            ) : (
              data.co_host_id.user_id
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">Co-Host :</p>
          <p>
            {data?.is_co_host === true ? (
              <>
                {firstName} {lastName}{' '}
                <Tag bordered={false} color="error">
                  You
                </Tag>
              </>
            ) : (
              data.co_host_id.user_id
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">Appointment schedule date :</p>
          <p>{dayjs(data?.schedule_date_time).format('YYYY-MM-DD HH:mm:ss')}</p>
        </div>
      </Space>
    </Modal>
  );
}

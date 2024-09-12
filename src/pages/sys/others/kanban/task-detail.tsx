import { Avatar, Radio, Space, Image, Typography, Divider, Tooltip } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { Iconify, SvgIcon } from '@/components/icon';
import { useThemeToken } from '@/theme/hooks';

import { Task } from './types';

type Props = {
  task: Task;
};
export default function TaskDetail({ task }: Props) {
  const {
    title,
    reporter,
    assignee = [],
    tags = [],
    date,
    priority,
    description,
    attachments,
    comments = [],
  } = task;
  const { colorInfo, colorWarning, colorSuccess } = useThemeToken();
  return (
    <>
      <Container>
        <div className="item">
          <Typography.Title level={4}>{title}</Typography.Title>
        </div>
        {/* <div className="item">
          <div className="label">Creator</div>
          <Avatar shape="circle" src={reporter} size={40} />
        </div> */}
        <div className="item">
          <div className="label">Assignee</div>

          <Space>
            {assignee.map((item, index) => (
              <Tooltip title="Dr. name" key={index}>
                <Avatar
                  shape="circle"
                  src={item}
                  size={35}
                  icon={<Iconify icon="lets-icons:user-light" size={20} />}
                />
              </Tooltip>
            ))}
          </Space>
        </div>
        <div className="item">
          <div className="label">Department</div>
          <Space>Cardiology</Space>
        </div>
        <div className="item">
          <div className="label">Due Date</div>
          {dayjs(date).format('DD/MM/YYYY HH:mm')}
          {/* <DatePicker bordered={false} value={dayjs(date)} /> */}
        </div>

        <div className="item">
          <div className="label">Priority</div>
          <div>
            <Radio.Group defaultValue={priority}>
              <Radio.Button value="High">
                <SvgIcon icon="ic_rise" size={20} color={colorWarning} />
                <span>High</span>
              </Radio.Button>

              <Radio.Button value="Medium">
                <SvgIcon icon="ic_rise" size={20} color={colorSuccess} className="rotate-90" />
                <span>Medium</span>
              </Radio.Button>

              <Radio.Button value="Low">
                <SvgIcon icon="ic_rise" size={20} color={colorInfo} className="rotate-180" />
                <span>Low</span>
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>

        <div className="item">
          <div className="label">Description</div>
          {/* <Input.TextArea defaultValue={description} /> */}
          {description || '-'}
        </div>

        <div className="item">
          <div className="label">Attachments</div>
          <Space wrap>
            {attachments?.map((item) => (
              <Image key={item} src={item} width={62} height={62} className="rounded-lg" />
            ))}
          </Space>
        </div>
      </Container>
      {/* comments */}
      <Divider className="my-2 ">
        <Iconify icon="emojione-v1:empty-note-page" size={28} /> <b>Instructions</b>
      </Divider>
      <div
        className="flex flex-col gap-4"
        style={{
          padding: '24px 20px 40px',
        }}
      >
        {comments?.map(({ avatar, username, content, time }) => (
          <div key={username} className="flex gap-4">
            <Avatar
              icon={<Iconify icon="lets-icons:user-light" size={20} />}
              size={40}
              className="flex-shrink-0"
            />
            <div className="flex flex-grow flex-col flex-wrap gap-1 text-gray">
              <div className="flex justify-between">
                <Typography.Text>{username}</Typography.Text>
                {/* <Typography.Text>{dayjs(time).format('DD/MM/YYYY HH:mm')}</Typography.Text> */}
              </div>
              {/* <p>{content}</p> */}
              <ul>
                <li className="mt-2">
                  <Iconify icon="fluent-emoji-flat:diamond-with-a-dot" /> Every medicine has
                  specific instructions for safe use that should always be followed precisely
                </li>
                <li className="mt-2">
                  <Iconify icon="fluent-emoji-flat:diamond-with-a-dot" /> The instructions tell you
                  what amount of medicine to take, how to take it, when to take it, and when not to
                  take it.
                </li>
                <li className="mt-2">
                  <Iconify icon="fluent-emoji-flat:diamond-with-a-dot" /> Always keep your medicine
                  in the original packaging so that you have proper dosage information on hand.
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 20px 40px;
  .item {
    display: flex;
    align-items: center;
  }
  .label {
    text-align: left;
    font-size: 0.75rem;
    font-weight: 600;
    width: 100px;
    flex-shrink: 0;
    color: rgb(99, 115, 129);
    height: 40px;
    line-height: 40px;
  }
`;

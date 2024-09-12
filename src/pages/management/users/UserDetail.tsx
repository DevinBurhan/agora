import { Avatar, Card, Col, Row } from 'antd';
import React from 'react';

import { User } from '#/entity';

export interface UserDetailProps {
  userData: User;
}

function UserDetail(props: UserDetailProps) {
  const data = props && props?.userData;
  return (
    <Card>
      <Row>
        <Col span={7}>
          <div className="flex justify-center align-middle">
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" size={80} />
          </div>
        </Col>
        <Col span={12}>
          <div>
            <p className="text-lg font-semibold text-green">
              {' '}
              {`${data.user_details.title} ${data?.first_name} ${data.last_name}`}
            </p>
            <div className="mt-2 flex gap-2 align-middle">
              <p className="font-semibold">Gender :</p>
              <p> {data.user_details.gender}</p>
            </div>
            <div className="mt-2 flex gap-2 align-middle">
              <p className="font-semibold">Position :</p>
              <p> {data.user_details.position}</p>
            </div>
            <div className="mt-2 flex gap-2 align-middle">
              <p className="font-semibold">Department :</p>
              <p> {data.user_details.department}</p>
            </div>
            <div className="mt-2 flex gap-2 align-middle">
              <p className="font-semibold">Province :</p>
              <p> {data.user_details.province}</p>
            </div>
            <div className="mt-2 flex gap-2 align-middle">
              <p className="font-semibold">Email :</p>
              <p> {data.email}</p>
            </div>
            <div className="mt-2 flex gap-2 align-middle">
              <p className="font-semibold">Phone Number :</p>
              <p> {data.user_details.phone_number}</p>
            </div>
            <div className="mt-2 flex gap-2 align-middle">
              <p className="font-semibold">Persal Number :</p>
              <p> {data.user_details.persal_number}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default UserDetail;

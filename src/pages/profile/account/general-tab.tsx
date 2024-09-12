import { App, Button, Col, Form, Input, Row } from 'antd';

import Card from '@/components/card';
import { UploadAvatar } from '@/components/upload';
import { useUserInfo } from '@/store/authStore';

type FieldType = {
  name?: string;
  email?: string;
  phone?: string;
  about: string;
};
export default function GeneralTab() {
  const { notification } = App.useApp();
  const { avatar, firstName, email } = useUserInfo();
  const [form] = Form.useForm();
  const initFormValues = {
    name: firstName,
    email,
    phone: '',
    about: '',
  };
  const handleClick = () => {
    notification.success({
      message: 'Update success!',
      duration: 3,
    });
  };
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} lg={8}>
        <Card className="flex-col gap-3 !px-6 !pb-10 !pt-20">
          <UploadAvatar defaultAvatar={avatar} />

          {/* <Space className="py-6">
            <div>Public Profile</div>
            <Switch size="small" />
          </Space> */}

          <Button type="primary" danger>
            Delete User
          </Button>
        </Card>
      </Col>
      <Col span={24} lg={16}>
        <Card>
          <Form
            form={form}
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType> label="Username" name="name">
                  <Input placeholder="Add your name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="Email" name="email">
                  <Input placeholder="Add your email" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType>
                  name="phone"
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
                    placeholder="Add your phone number"
                    type="tel"
                    addonBefore="+91"
                    style={{
                      width: '100%',
                    }}
                    maxLength={10}
                    onChange={(e) => {
                      form.setFieldValue('phone', e.target.value.slice(0, 10));
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
              </Col>
            </Row>
            <Form.Item<FieldType> label="About" name="about">
              <Input.TextArea placeholder="Add about your self" />
            </Form.Item>

            <div className="flex w-full justify-end">
              <Button type="primary" onClick={handleClick}>
                Save Changes
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

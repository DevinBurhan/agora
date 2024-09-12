import { Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillGoogleCircle } from 'react-icons/ai';

import { SignInReq } from '@/api/services/authService';
import { useSignIn } from '@/store/authStore';

import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider';

function LoginForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { loginState, setLoginState } = useLoginStateContext();
  const signIn = useSignIn();

  if (loginState !== LoginStateEnum.LOGIN) return null;

  const handleFinish = async ({ email, password }: SignInReq) => {
    setLoading(true);
    try {
      await signIn({ email, password });
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };
  return (
    <>
      <div className="mb-6 text-2xl font-bold xl:text-3xl">{t('sys.login.signInFormTitle')}</div>
      <Form
        form={form}
        name="login"
        size="large"
        initialValues={{
          remember: true,
        }}
        onFinish={handleFinish}
      >
        <Form.Item
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
        <Form.Item
          name="password"
          rules={[{ required: true, message: t('sys.login.passwordPlaceholder') }]}
        >
          <Input.Password type="password" placeholder={t('sys.login.password')} />
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t('sys.login.rememberMe')}</Checkbox>
            </Form.Item>
          </Col>
          <Col span={12} className="text-right">
            <button
              type="button"
              className=" !underline"
              onClick={(e) => {
                e.preventDefault();
                setLoginState(LoginStateEnum.RESET_PASSWORD);
              }}
            >
              {t('sys.login.forgetPassword')}
            </button>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="mt-4 w-full" loading={loading}>
            {t('sys.login.loginButton')}
          </Button>
        </Form.Item>

        <Row align="middle" gutter={8}>
          <Col span={18} flex="1">
            <p>New to Head Gear and streaming?</p>
          </Col>
          <Col span={6} flex="1">
            <button
              type="button"
              className="w-full !text-sm"
              onClick={(e) => {
                e.preventDefault();
                setLoginState(LoginStateEnum.REGISTER);
              }}
            >
              {t('sys.login.signUpFormTitle')}
            </button>
          </Col>
        </Row>

        <Divider className="!text-xs">{t('sys.login.otherSignIn')}</Divider>

        <div className="flex cursor-pointer justify-around text-2xl">
          <AiFillGoogleCircle />
        </div>
      </Form>
    </>
  );
}

export default LoginForm;

import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import { useTranslation } from 'react-i18next';

import { SignUpReq } from '@/api/services/authService';
import { SvgIcon } from '@/components/icon';
import { useForgotPass } from '@/states/auth/auth.hook';

import { ReturnButton } from './components/ReturnButton';
import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider';

function ResetForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { loginState, backToLogin } = useLoginStateContext();
  const onSuccess = () => {
    form.resetFields();
  };

  const { mutate: ForgotPass, isLoading } = useForgotPass(onSuccess);

  if (loginState !== LoginStateEnum.RESET_PASSWORD) return null;

  const handleFinish = async (val: SignUpReq) => {
    await ForgotPass(val);
  };

  return (
    <>
      <div className="mb-8 text-center">
        <SvgIcon icon="ic-reset-password" size="100" />
      </div>
      <div className="mb-4 text-center text-2xl font-bold xl:text-3xl">
        {/* {t('sys.login.forgetFormTitle')} */}
        Forgot Your Password?
      </div>
      <Form form={form} name="normal_login" size="large" onFinish={handleFinish}>
        <p className="mb-4 h-14 text-center text-gray">{t('sys.login.forgetFormSecondTitle')}</p>
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
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full !bg-black"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex gap-2 align-middle">
                <Spin indicator={<LoadingOutlined spin />} size="default" />{' '}
                <p className="!text-white">Loading...</p>
              </div>
            ) : (
              t('sys.login.sendEmailButton')
            )}
          </Button>
        </Form.Item>

        <ReturnButton
          onClick={() => {
            form.resetFields();
            backToLogin();
          }}
        />
      </Form>
    </>
  );
}

export default ResetForm;

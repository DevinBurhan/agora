import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import resetPassIcon from '@/assets/images/glass/reset-password.png';
import { useRouter } from '@/router/hooks';
import { useResetPass } from '@/states/auth/auth.hook';

import { ReturnButton } from './components/ReturnButton';

function SetPassForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const router = useRouter();
  const { id: securityID } = useParams();

  const onSuccess = () => {
    form.resetFields();
  };

  const { mutate: resetpassMutate, isLoading } = useResetPass(onSuccess);

  const handleFinish = async (val: any) => {
    await resetpassMutate({ password: val.password, id: securityID });
  };

  return (
    <>
      <div className="mx-auto mb-8 text-center">
        <img src={resetPassIcon} style={{ width: '100px', height: '100px' }} alt="reset-password" />
      </div>
      <div className="mb-4 text-center text-2xl font-bold xl:text-3xl">
        {t('sys.login.forgetFormTitle')}
      </div>
      <Form form={form} name="normal_login" size="large" onFinish={handleFinish}>
        <p className="mb-4 h-14 text-center text-gray">
          Create a strong new password for your account.
        </p>

        <Form.Item
          name="password"
          rules={[{ required: true, message: t('sys.login.passwordPlaceholder') }]}
        >
          <Input.Password type="password" placeholder={t('sys.login.password')} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: t('sys.login.confirmPasswordPlaceholder') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('sys.login.diffPwd')));
              },
            }),
          ]}
        >
          <Input.Password type="password" placeholder={t('sys.login.confirmPassword')} />
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
              'Submit'
            )}
          </Button>
        </Form.Item>

        <ReturnButton
          onClick={() => {
            router.replace('/');
          }}
        />
      </Form>
    </>
  );
}

export default SetPassForm;

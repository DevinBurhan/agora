import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';

import authService, { ResetPassReq, SignUpReq } from '@/api/services/authService';

export const useForgotPass = (onSuccess) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (data: SignUpReq) => authService.forgotPass(data),
    onError: (err: any) =>
      message.warning({
        content: err.message,
        duration: 3,
      }),
    onSuccess: (data) => {
      message.info({
        content: 'Reset password link has been sent to your email.',
        duration: 8,
      });
      onSuccess();
    },
  });
};

export const useResetPass = (onSuccess) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (data: ResetPassReq) => authService.resetPass(data),
    onError: (err: any) =>
      message.warning({
        content: err.message,
        duration: 3,
      }),
    onSuccess: (data) => {
      message.info({
        content: 'Your password has ben updated successfully.',
        duration: 8,
      });
      onSuccess();
    },
  });
};

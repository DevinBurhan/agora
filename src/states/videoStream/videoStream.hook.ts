import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';

import videoStreamService, { GetAgoraTokenReq } from '@/api/services/agoraService';

export const useGetAgoraToken = (handelSuccess) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (data: GetAgoraTokenReq) => videoStreamService.getAgoraToken(data),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: (data: any) => {
      handelSuccess(data);
    },
  });
};

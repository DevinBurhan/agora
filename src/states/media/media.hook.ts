import { useMutation, useQuery } from '@tanstack/react-query';
import { App } from 'antd';

import mediaServise, { DeleteIdReq, UpdateReq } from '@/api/services/mediaService';

import { Model } from '#/entity';

export const useMediaListApi = (params: any) => {
  return useQuery({
    queryKey: ['mediaList'],
    queryFn: () => mediaServise.getMediaList(params),
  });
};

export const useCreateMedia = (handelSuccessCreate: VoidFunction) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (data: Model) => mediaServise.createMedia(data),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: () => {
      handelSuccessCreate();
      message.success({
        content: 'Media Added Successfully.',
        duration: 3,
      });
    },
  });
};

export const useUpdateMedia = (handelSuccess: VoidFunction) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (data: UpdateReq) => mediaServise.updateMedia(data),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: () => {
      handelSuccess();
      message.success({
        content: 'Media details are updated successfully.',
        duration: 3,
      });
    },
  });
};

export const useDeleteMedia = (handelSuccess: VoidFunction) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (dataId: DeleteIdReq) => mediaServise.deleteMedia(dataId),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: () => {
      handelSuccess();
      message.success({
        content: 'Media Deleted Successfully.',
        duration: 3,
      });
    },
  });
};

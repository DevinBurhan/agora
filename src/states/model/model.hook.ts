import { useMutation, useQuery } from '@tanstack/react-query';
import { App } from 'antd';

import modelService, { DeleteIdReq, UpdateReq } from '@/api/services/modelService';

import { Model } from '#/entity';

export const useModelListApi = (params: any) => {
  return useQuery({
    queryKey: ['modelList'],
    queryFn: () => modelService.getModelList(params),
  });
};

export const useCreateModel = (handelSuccessCreate: VoidFunction) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (data: Model) => modelService.createModel(data),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: () => {
      handelSuccessCreate();
      message.success({
        content: 'Model Added Successfully.',
        duration: 3,
      });
    },
  });
};

export const useUpdateModel = (handelSuccess: VoidFunction) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (data: UpdateReq) => modelService.updateModel(data),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: () => {
      handelSuccess();
      message.success({
        content: 'Model details are updated successfully.',
        duration: 3,
      });
    },
  });
};

export const useDeleteModel = (handelSuccess: VoidFunction) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (dataId: DeleteIdReq) => modelService.deleteModel(dataId),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: () => {
      handelSuccess();
      message.success({
        content: 'Model Deleted Successfully.',
        duration: 3,
      });
    },
  });
};

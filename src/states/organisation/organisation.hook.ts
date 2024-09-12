import { useMutation, useQuery } from '@tanstack/react-query';
import { App } from 'antd';

import orgService, { DataOrgIdReq, OrgReq, UpdateOrgReq } from '@/api/services/orgService';

export const useOrgsListApi = (params: any) => {
  return useQuery({
    queryKey: ['orgsList'],
    queryFn: () => orgService.getOrgList(params),
  });
};

export const useCreateOrg = (handelSuccessCreate: VoidFunction) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (data: OrgReq) => orgService.createOrganization(data),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: () => {
      handelSuccessCreate();
      message.success({
        content: 'Organisation Added Successfully.',
        duration: 3,
      });
    },
  });
};

export const useUpdateOrg = (handelSuccess: VoidFunction) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (data: UpdateOrgReq) => orgService.updateOrganization(data),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: () => {
      handelSuccess();
      message.success({
        content: 'Organisation details are updated successfully.',
        duration: 3,
      });
    },
  });
};

export const useDeleteOrg = (handelSuccess: VoidFunction) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (dataId: DataOrgIdReq) => orgService.deleteOrganization(dataId),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: () => {
      handelSuccess();
      message.success({
        content: 'Organisation Deleted Successfully.',
        duration: 3,
      });
    },
  });
};

import { useMutation, useQuery } from '@tanstack/react-query';
import { App } from 'antd';

import userService, {
  UsersDataType,
  DataUserIdReq,
  UpdateUserReq,
} from '@/api/services/userService';

export const useUsersListApi = (params: any) => {
  return useQuery({
    queryKey: ['usersList'],
    queryFn: () => userService.getUserList(params),
  });
};

export const useAllUsersListApi = () => {
  return useQuery({
    queryKey: ['allUsersList'],
    queryFn: () => userService.getAllUserList(),
  });
};

export const useCreateUser = (handelSuccessCreate: VoidFunction) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (data: UsersDataType) => userService.createUser(data),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: () => {
      handelSuccessCreate();
      message.success({
        content: 'User Added Successfully.',
        duration: 3,
      });
    },
  });
};

export const useUpdateUser = (handelSuccess: VoidFunction) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (data: UpdateUserReq) => userService.updateUser(data),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: () => {
      handelSuccess();
      message.success({
        content: 'User details are updated successfully.',
        duration: 3,
      });
    },
  });
};

export const useDeleteUser = (handelSuccess: VoidFunction) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (dataId: DataUserIdReq) => userService.deleteUser(dataId),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: () => {
      handelSuccess();
      message.success({
        content: 'User Deleted Successfully.',
        duration: 3,
      });
    },
  });
};

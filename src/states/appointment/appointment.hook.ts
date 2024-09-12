import { useMutation, useQuery } from '@tanstack/react-query';
import { App } from 'antd';

import appointmentService, {
  AppointmentIdReq,
  AppointmentDataType,
  UpdateAppointmentReq,
} from '@/api/services/appointment';

export const useAppointmentListApi = (params: any) => {
  return useQuery({
    queryKey: ['appointmentList'],
    queryFn: () => appointmentService.getAppointmentList(params),
  });
};

export const useUpcomingAppointmentApi = () => {
  return useQuery({
    queryKey: ['upcoming_appointment_list'],
    queryFn: () => appointmentService.getUpcomingAppointment(),
  });
};

export const useCreateAppointment = (handelSuccessCreate: VoidFunction) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (data: AppointmentDataType) => appointmentService.createAppointment(data),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: () => {
      handelSuccessCreate();
      message.success({
        content: 'Appointment Created Successfully.',
        duration: 3,
      });
    },
  });
};

export const useUpdateAppointment = (handelSuccessCreate: VoidFunction) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (data: UpdateAppointmentReq) => appointmentService.updateAppointment(data),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: () => {
      handelSuccessCreate();
      message.success({
        content: 'Appointment Details Are Updated Successfully.',
        duration: 3,
      });
    },
  });
};

export const useDeleteAppointment = (handelSuccess: VoidFunction) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (dataId: AppointmentIdReq) => appointmentService.deleteAppointment(dataId),
    onError: () =>
      message.error({
        content: 'Somthing Went Wrong! Please Try Again.',
        duration: 3,
      }),
    onSuccess: () => {
      handelSuccess();
      message.success({
        content: 'Appointment Deleted Successfully.',
        duration: 3,
      });
    },
  });
};

import API from '../api';
import apiClient from '../apiClient';

export interface AppointmentDataType {
  name: string;
  description: string;
  schedule_date_time: Date | string;
  doctor_id: string;
  co_host_id: string;
}
export interface AppointmentApiRes {
  appointment_list: Array<any>;
  count: number;
}
export interface AppointmentIdReq {
  id: string;
}
export interface UpdateAppointmentReq {
  id: string;
  payload: AppointmentDataType;
}

const getAppointmentList = (param: any) => {
  const query = `?page=${param.page}&limit=${param.limit}&search=${param.search}`;
  const response = apiClient.get<{ appointment_list: Array<any>; count: number }>({
    url: API.appointment.List + query,
  });
  return response;
};

const createAppointment = (data: AppointmentDataType) => {
  const response = apiClient.post<any>({ url: API.appointment.create, data });
  return response;
};

const updateAppointment = (dataVal: UpdateAppointmentReq) => {
  const data = dataVal.payload;
  const response = apiClient.patch<any>({ url: API.appointment.update + dataVal.id, data });
  return response;
};

const deleteAppointment = (data: AppointmentIdReq) => {
  const response = apiClient.delete<any>({ url: API.appointment.delete + data.id });
  return response;
};

const getUpcomingAppointment = () => {
  const response = apiClient.get<any[]>({
    url: API.appointment.upcoming,
  });
  return response;
};

export default {
  getAppointmentList,
  createAppointment,
  deleteAppointment,
  updateAppointment,
  getUpcomingAppointment,
};

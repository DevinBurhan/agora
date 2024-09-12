import API from '../api';
import apiClient from '../apiClient';

export interface UsersDataType {
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  title: string;
  gender: string;
  phone_number: number | string;
  position: string;
  department: string;
  province: string;
  persal_number: number | string;
}
export interface UserApiRes {
  userList: Array<any>;
  count: number;
}
export interface DataUserIdReq {
  id: string;
}
export interface UpdateUserReq {
  id: string;
  payload: UsersDataType;
}

const getUserList = (param: any) => {
  const query = `?page=${param.page}&limit=${param.limit}&search=${param.search}`;
  const response = apiClient.get<UserApiRes[]>({ url: API.user.userList + query });
  return response;
};

const createUser = (data: UsersDataType) => {
  const response = apiClient.post<any>({ url: API.user.createUser, data });
  return response;
};

const updateUser = (dataVal: UpdateUserReq) => {
  const data = dataVal.payload;
  const response = apiClient.patch<any>({ url: API.user.updateUser + dataVal.id, data });
  return response;
};

const deleteUser = (data: DataUserIdReq) => {
  const response = apiClient.delete<any>({ url: API.user.deleteUser + data.id });
  return response;
};

const getAllUserList = () => {
  const response = apiClient.get<any[]>({ url: API.user.allUserList });
  return response;
};

export default {
  getUserList,
  createUser,
  updateUser,
  deleteUser,
  getAllUserList,
};

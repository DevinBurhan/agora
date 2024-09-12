import API from '../api';
import apiClient from '../apiClient';

import { UserInfo, UserToken } from '#/entity';

export interface SignInReq {
  email: string;
  password: string;
}

export interface SignUpReq extends SignInReq {
  email: string;
}

export type SignInRes = UserToken & { user: UserInfo };
export interface ResetPassReq {
  id?: string;
  password: string;
}

export enum UserApi {
  Logout = '/auth/logout',
  Refresh = '/auth/refresh',
  User = '/user',
}

const signin = (data: SignInReq) => apiClient.post<any>({ url: API.auth.login, data });
const signup = (data: SignUpReq) => apiClient.post<SignInRes>({ url: API.auth.signup, data });
const forgotPass = (data: SignUpReq) => apiClient.post<any>({ url: API.auth.forgotpass, data });
const resetPass = (dataVal: ResetPassReq) => {
  const data = { password: dataVal.password };
  const resp = apiClient.post<any>({ url: `${API.auth.resetPass}${dataVal.id}`, data });
  return resp;
};
const logout = () => apiClient.get({ url: UserApi.Logout });
const findById = (id: string) => apiClient.get<UserInfo[]>({ url: `${UserApi.User}/${id}` });

export default {
  signin,
  signup,
  findById,
  logout,
  forgotPass,
  resetPass,
};

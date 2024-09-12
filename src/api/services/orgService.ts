import API from '../api';
import apiClient from '../apiClient';

export interface OrgReq {
  email: string;
  password?: string;
  name: string;
}
export interface OrgApiRes {
  orgList: Array<any>;
  count: number;
}
export interface DataOrgIdReq {
  id: string;
}
export interface UpdateOrgPayload {
  email: string;
  password?: string;
  name: string;
}
export interface UpdateOrgReq {
  id: string;
  payload: UpdateOrgPayload;
}

const getOrgList = (param: any) => {
  const query = `?page=${param.page}&limit=${param.limit}&search=${param.search}`;
  const response = apiClient.get<OrgApiRes>({ url: API.organization.orgList + query });
  return response;
};

const createOrganization = (data: OrgReq) => {
  const response = apiClient.post<any>({ url: API.organization.createOrg, data });
  return response;
};

const updateOrganization = (dataVal: UpdateOrgReq) => {
  const data: UpdateOrgPayload = dataVal.payload;
  const response = apiClient.patch<any>({ url: API.organization.updateOrg + dataVal.id, data });
  return response;
};

const deleteOrganization = (data: DataOrgIdReq) => {
  const response = apiClient.delete<any>({ url: API.organization.deleteOrg + data.id });
  return response;
};

export default {
  getOrgList,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};

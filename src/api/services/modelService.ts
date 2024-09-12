import API from '../api';
import apiClient from '../apiClient';

import { Model } from '#/entity';

export interface ListApiRes {
  modelList: Array<any>;
  count: number;
}

export interface DeleteIdReq {
  id: string;
}

export interface UpdateReq {
  id: string;
  payload: Model;
}

const getModelList = (param: any) => {
  const query = `?page=${param.page}&limit=${param.limit}&search=${param.search}`;
  const response = apiClient.get<ListApiRes[]>({ url: API.model.modelList + query });
  return response;
};

const createModel = (data: Model) => {
  const response = apiClient.post<any>({ url: API.model.createModel, data });
  return response;
};

const updateModel = (dataVal: UpdateReq) => {
  const data = dataVal.payload;
  const response = apiClient.patch<any>({ url: API.model.updateModel + dataVal.id, data });
  return response;
};

const deleteModel = (data: DeleteIdReq) => {
  const response = apiClient.delete<any>({ url: API.model.deleteModel + data.id });
  return response;
};

export default {
  getModelList,
  createModel,
  updateModel,
  deleteModel,
};

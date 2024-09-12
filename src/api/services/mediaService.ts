import API from '../api';
import apiClient from '../apiClient';

import { Model } from '#/entity';

export interface ListApiRes {
  mediaList: Array<any>;
  count: number;
}

export interface DeleteIdReq {
  id: string;
}

export interface UpdateReq {
  id: string;
  payload: Model;
}

const getMediaList = (param: any) => {
  const query = `?page=${param.page}&limit=${param.limit}&search=${param.search}`;
  const response = apiClient.get<ListApiRes[]>({ url: API.media.mediaList + query });
  return response;
};

const createMedia = (data: Model) => {
  const response = apiClient.post<any>({ url: API.media.createMedia, data });
  return response;
};

const updateMedia = (dataVal: UpdateReq) => {
  const data = dataVal.payload;
  const response = apiClient.patch<any>({ url: API.media.updateMedia + dataVal.id, data });
  return response;
};

const deleteMedia = (data: DeleteIdReq) => {
  const response = apiClient.delete<any>({ url: API.media.deleteMedia + data.id });
  return response;
};

export default {
  getMediaList,
  createMedia,
  updateMedia,
  deleteMedia,
};

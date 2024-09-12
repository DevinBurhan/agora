import API from '../api';
import apiClient from '../apiClient';

export interface ListApiRes {
  dataList: Array<any>;
  count: number;
}

const getAgentList = (param: any) => {
  const query = `?page=${param.page}&limit=${param.limit}&search=${param.search}`;
  const response = apiClient.get<ListApiRes[]>({ url: API.remoteAssiste.agentList + query });
  return response;
};

const getVideoList = (param: any) => {
  const query = `?page=${param.page}&limit=${param.limit}&search=${param.search}`;
  const response = apiClient.get<ListApiRes[]>({ url: API.remoteAssiste.videoList + query });
  return response;
};
const getScreenShotList = (param: any) => {
  const query = `?page=${param.page}&limit=${param.limit}&search=${param.search}`;
  const response = apiClient.get<ListApiRes[]>({ url: API.remoteAssiste.screenShotList + query });
  return response;
};

export default {
  getAgentList,
  getVideoList,
  getScreenShotList,
};

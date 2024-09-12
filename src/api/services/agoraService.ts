import API from '../api';
import apiClient from '../apiClient';

export interface GetAgoraTokenReq {
  payload: any | object;
}

const getAgoraToken = (val: GetAgoraTokenReq) => {
  const data = val.payload;
  const response = apiClient.post<any>({ url: API.agora.getToken, data });
  return response;
};

export default {
  getAgoraToken,
};

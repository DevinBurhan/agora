import { useQuery } from '@tanstack/react-query';

import assistService from '@/api/services/assistService';

export const useAgentListApi = (params: any) => {
  return useQuery({
    queryKey: ['assist-agent-list'],
    queryFn: () => assistService.getAgentList(params),
  });
};

export const useVideoListApi = (params: any) => {
  return useQuery({
    queryKey: ['assist-video-list'],
    queryFn: () => assistService.getVideoList(params),
  });
};

export const useScreenShotListApi = (params: any) => {
  return useQuery({
    queryKey: ['assist-screenshot-list'],
    queryFn: () => assistService.getScreenShotList(params),
  });
};

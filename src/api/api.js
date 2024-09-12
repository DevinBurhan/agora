const API = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    forgotpass: '/auth/forgot-password',
    resetPass: '/auth/reset-password/',
  },
  organization: {
    orgList: '/organisation/list',
    createOrg: '/organisation/add',
    updateOrg: '/organisation/update/',
    deleteOrg: '/organisation/delete/',
  },
  user: {
    userList: '/user/list',
    createUser: '/user/add',
    updateUser: '/user/update/',
    deleteUser: '/user/delete/',
    allUserList: '/user/list-all',
  },
  model: {
    modelList: '/model/list',
    createModel: '/model/add',
    updateModel: '/model/update/',
    deleteModel: '/model/delete/',
  },
  media: {
    mediaList: '/media/list',
    createMedia: '/media/add',
    updateMedia: '/media/update/',
    deleteMedia: '/media/delete/',
  },
  remoteAssiste: {
    agentList: '/agent/list',
    videoList: '/video/list',
    screenShotList: '/acreenshot/list',
  },
  appointment: {
    List: '/appointment/list',
    update: '/appointment/update/',
    create: '/appointment/create',
    delete: '/appointment/delete/',
    upcoming: '/appointment/upcoming-appointments',
  },
  agora: { getToken: '/agora/generate-token' },
};
export default API;

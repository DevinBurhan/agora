import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import {
  ORGANIZATION_PERMISSIONS_LIST,
  PERMISSION_LIST,
  USERS_PERMISSIONS_LIST,
} from '@/_mock/assets';
import authService, { SignInReq } from '@/api/services/authService';
import { getItem, removeItem, setItem } from '@/utils/storage';

import { UserInfo, UserToken } from '#/entity';
import { BasicStatus, StorageEnum } from '#/enum';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type AuthStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useAuthStore = create<AuthStore>((set) => ({
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo });
      setItem(StorageEnum.User, userInfo);
    },
    setUserToken: (userToken) => {
      set({ userToken });
      setItem(StorageEnum.Token, userToken);
    },
    clearUserInfoAndToken() {
      set({ userInfo: {}, userToken: {} });
      removeItem(StorageEnum.User);
      removeItem(StorageEnum.Token);
    },
  },
}));

export const useUserInfo = () => useAuthStore((state) => state.userInfo);
export const useUserToken = () => useAuthStore((state) => state.userToken);
export const useUserPermission = () => useAuthStore((state) => state.userInfo.permissions);
export const useUserActions = () => useAuthStore((state) => state.actions);

export const useSignIn = () => {
  const navigatge = useNavigate();
  const { message } = App.useApp();
  const { setUserToken, setUserInfo } = useUserActions();

  const signInMutation = useMutation(authService.signin);

  const signIn = async (data: SignInReq) => {
    try {
      const res = await signInMutation.mutateAsync(data);
      const token = res.access_token;
      const userData: UserInfo = {
        id: res.user_id,
        email: res.email,
        firstName: res?.first_name ?? '',
        lastName: res?.last_name ?? '',
        avatar: '',
        role: res.role,
        status: BasicStatus.ENABLE,
        organisationId: res.organisation_id,
      };
      if (res.role === 'admin') {
        userData.permissions = PERMISSION_LIST;
      } else if (res.role === 'organiser') {
        userData.permissions = ORGANIZATION_PERMISSIONS_LIST;
      } else {
        userData.permissions = USERS_PERMISSIONS_LIST;
      }
      Cookies.set('token', token);
      setUserToken({ accessToken: token, refreshToken: token });
      setUserInfo(userData);
      window.location.reload();
      navigatge(HOMEPAGE, { replace: true });
    } catch (err) {
      message.warning({
        content: err.message,
        duration: 3,
      });
    }
  };

  return signIn;
};

// export const useForgotPass = () => {
//   const router = useRouter();
//   const { message } = App.useApp();
//   const forgotPassMutation = useMutation(authService.forgotPass);
//   const forgotPass = async (data: SignUpReq) => {
//     try {
//       const res = await forgotPassMutation.mutateAsync(data);
//       message.success({
//         content: 'Reset password link has been sent to your email.',
//         duration: 3,
//       });
//       router.replace('/');
//     } catch (err) {
//       message.warning({
//         content: err.message,
//         duration: 3,
//       });
//     }
//   };

//   return forgotPass;
// };

// export const useForgotPass = (onSuccess) => {
//   const router = useRouter();
//   const { message } = App.useApp();
//   return useMutation({
//     mutationFn: (data: SignUpReq) => authService.forgotPass(data),
//     onError: (err: any) =>
//       message.warning({
//         content: err.message,
//         duration: 3,
//       }),
//     onSuccess: (data) => {
//       console.log('🚀 ~ useSignUp ~ data:', data);
//       message.success({
//         content: 'Reset password link has been sent to your email.',
//         duration: 3,
//       });
//       onSuccess();
//       router.replace('/');
//     },
//   });
// };

export default useAuthStore;

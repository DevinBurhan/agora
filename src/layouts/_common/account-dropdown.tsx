import { Divider, MenuProps } from 'antd';
import Dropdown, { DropdownProps } from 'antd/es/dropdown/dropdown';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { IconButton } from '@/components/icon';
import { useLoginStateContext } from '@/pages/sys/login/providers/LoginStateProvider';
import { useRouter } from '@/router/hooks';
import { useUserInfo, useUserActions } from '@/store/authStore';
import { useThemeToken } from '@/theme/hooks';
import { setItem } from '@/utils/storage';

import { StorageEnum } from '#/enum';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

/**
 * Account Dropdown
 */
export default function AccountDropdown() {
  const { replace } = useRouter();
  const { firstName, lastName, email, avatar, id, organisationId } = useUserInfo();
  const { clearUserInfoAndToken } = useUserActions();
  const { backToLogin } = useLoginStateContext();
  const { t } = useTranslation();
  const logout = () => {
    try {
      // todo const logoutMutation = useMutation(userService.logout);
      // todo logoutMutation.mutateAsync();
      clearUserInfoAndToken();
      setItem(StorageEnum.Token, null);
      backToLogin();
    } catch (error) {
      console.log(error);
    } finally {
      replace('/login');
    }
  };
  const { colorBgElevated, borderRadiusLG, boxShadowSecondary } = useThemeToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: colorBgElevated,
    borderRadius: borderRadiusLG,
    boxShadow: boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  const dropdownRender: DropdownProps['dropdownRender'] = (menu) => (
    <div style={contentStyle}>
      <div className="flex flex-col items-start p-4">
        {organisationId === null || organisationId === undefined ? (
          <div>Admin</div>
        ) : (
          <div>
            {firstName && firstName !== '' && organisationId ? (
              <h4>
                {firstName} {lastName}
              </h4>
            ) : (
              organisationId?.name
            )}
          </div>
        )}

        <div className="text-gray">{email}</div>
      </div>
      <Divider style={{ margin: 0 }} />
      {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
    </div>
  );

  const items: MenuProps['items'] = [
    {
      label: <NavLink to="/profile">{t('sys.menu.user.profile')}</NavLink>,
      key: '0',
    },
    // {
    //   label: <NavLink to="/management/user/account">{t('sys.menu.user.account')}</NavLink>,
    //   key: '1',
    // },
    { type: 'divider' },
    {
      label: <button className="font-bold text-warning">{t('sys.login.logout')}</button>,
      key: '1',
      onClick: logout,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} dropdownRender={dropdownRender}>
      <IconButton className="h-10 w-10 transform-none px-0 hover:scale-105">
        <img className="h-8 w-8 rounded-full" src={avatar} alt="" />
      </IconButton>
    </Dropdown>
  );
}

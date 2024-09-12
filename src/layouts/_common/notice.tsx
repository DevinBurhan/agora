import { Badge, Drawer, Tabs, TabsProps } from 'antd';
import Color from 'color';
import { CSSProperties, ReactNode, useState } from 'react';

import CyanBlur from '@/assets/images/background/cyan-blur.png';
import RedBlur from '@/assets/images/background/red-blur.png';
import { IconButton, Iconify, SvgIcon } from '@/components/icon';
import ProTag from '@/theme/antd/components/tag';
import { useThemeToken } from '@/theme/hooks';

export default function NoticeButton() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const themeToken = useThemeToken();
  const [count, setCount] = useState(4);

  const style: CSSProperties = {
    backdropFilter: 'blur(20px)',
    backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundColor: Color(themeToken.colorBgContainer).alpha(0.9).toString(),
    backgroundPosition: 'right top, left bottom',
    backgroundSize: '50, 50%',
  };

  return (
    <div>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <Badge
          count={count}
          styles={{
            root: { color: 'inherit' },
            indicator: { color: '#fff' },
          }}
        >
          <Iconify icon="solar:bell-bing-bold-duotone" size={24} />
        </Badge>
      </IconButton>
      <Drawer
        placement="right"
        title="Notifications"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closable={false}
        width={420}
        styles={{
          body: { padding: 0 },
          mask: { backgroundColor: 'transparent' },
        }}
        style={style}
        extra={
          <IconButton
            style={{ color: themeToken.colorPrimary }}
            onClick={() => {
              setCount(0);
              setDrawerOpen(false);
            }}
          >
            <Iconify icon="solar:check-read-broken" size={20} />
          </IconButton>
        }
        footer={
          <div
            style={{ color: themeToken.colorTextBase }}
            className="flex h-10 w-full items-center justify-center font-semibold"
          >
            View All
          </div>
        }
      >
        <NoticeTab />
      </Drawer>
    </div>
  );
}

function NoticeTab() {
  const tabChildren: ReactNode = (
    <div className="text-sm">
      <div className="mt-8 flex">
        <IconButton>
          <SvgIcon icon="ic_order" size={30} />
        </IconButton>
        <div className="ml-2">
          <div>
            <span className="font-light">Your order is placed waiting for shipping</span>
          </div>
          <span className="text-xs font-light opacity-60">4 days ago</span>{' '}
        </div>
      </div>

      <div className="mt-8 flex">
        <IconButton>
          <SvgIcon icon="ic_mail" size={30} />
        </IconButton>
        <div className="ml-2">
          <div>
            <span className="font-light">You have new mail</span>
          </div>
          <span className="text-xs font-light opacity-60">5 days ago</span>{' '}
        </div>
      </div>

      <div className="mt-8 flex">
        <IconButton>
          <SvgIcon icon="ic_chat" size={30} />
        </IconButton>
        <div className="ml-2">
          <div>
            <span className="font-light">You have new message 5 unread message</span>
          </div>
          <span className="text-xs font-light opacity-60">7 days ago</span>
        </div>
      </div>

      <div className="mt-8 flex">
        <IconButton>
          <SvgIcon icon="ic_delivery" size={30} />
        </IconButton>
        <div className="ml-2">
          <div>
            <span className="font-light">Delivery processing your order is being shipped</span>
          </div>
          <span className="text-xs font-light opacity-60">8 days ago</span>{' '}
        </div>
      </div>
    </div>
  );
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <div className="flex">
          <span>All</span>
          <ProTag color="processing">22</ProTag>
        </div>
      ),
      children: tabChildren,
    },
    {
      key: '2',
      label: (
        <div className="flex">
          <span>Unread</span>
          <ProTag color="error">12</ProTag>
        </div>
      ),
      children: tabChildren,
    },
    {
      key: '3',
      label: (
        <div className="flex">
          <span>Archived</span>
          <ProTag color="green">10</ProTag>
        </div>
      ),
      children: tabChildren,
    },
  ];
  return (
    <div className="flex flex-col px-6">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Drawer } from 'antd';
import Color from 'color';
import { m } from 'framer-motion';
import { CSSProperties, useState } from 'react';
import screenfull from 'screenfull';

import CyanBlur from '@/assets/images/background/cyan-blur.png';
import RedBlur from '@/assets/images/background/red-blur.png';
import { varHover } from '@/components/animate/variants/action';
import { IconButton, SvgIcon } from '@/components/icon';
import { useSettingActions, useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';

import { ThemeMode } from '#/enum';

/**
 * App Setting
 */
export default function SettingButton() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { colorPrimary, colorTextSecondary, colorBgContainer } = useThemeToken();

  const settings = useSettings();
  const { themeMode } = settings;
  const { setSettings } = useSettingActions();

  const setThemeMode = (themeMode: ThemeMode) => {
    setSettings({
      ...settings,
      themeMode,
    });
  };

  const style: CSSProperties = {
    backdropFilter: 'blur(20px)',
    backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundColor: Color(colorBgContainer).alpha(0.9).toString(),
    backgroundPosition: 'right top, left bottom',
    backgroundSize: '50, 50%',
  };

  const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen);
  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFullscreen(!isFullscreen);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <m.div
          animate={{
            rotate: [0, drawerOpen ? 0 : 360],
          }}
          transition={{
            duration: 12,
            ease: 'linear',
            repeat: Infinity,
          }}
          whileTap="tap"
          whileHover="hover"
          variants={varHover(1.05)}
          onClick={() => setDrawerOpen(true)}
        >
          <IconButton className="h-10 w-10">
            <SvgIcon icon="ic-setting" size="24" />
          </IconButton>
        </m.div>
      </div>
      <Drawer
        placement="right"
        title="Settings"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closable={false}
        width={280}
        styles={{
          body: { padding: 0 },
          mask: { backgroundColor: 'transparent' },
        }}
        style={style}
        extra={
          <IconButton onClick={() => setDrawerOpen(false)} className="h-9 w-9 hover:scale-105">
            <CloseOutlined className="text-gray-400" />
          </IconButton>
        }
        footer={
          <Button type="dashed" block size="large" onClick={toggleFullScreen}>
            <div className="flex items-center justify-center">
              {isFullscreen ? (
                <>
                  <SvgIcon
                    icon="ic-settings-exit-fullscreen"
                    color={colorPrimary}
                    className="!m-0"
                  />
                  <span className="ml-2">Exit FullScreen</span>
                </>
              ) : (
                <>
                  <SvgIcon icon="ic-settings-fullscreen" className="!m-0" />
                  <span className="ml-2 text-gray">FullScreen</span>
                </>
              )}
            </div>
          </Button>
        }
      >
        <div className="flex flex-col gap-6 p-6">
          {/* theme mode */}
          <div>
            <div className="mb-3 text-base font-semibold" style={{ color: colorTextSecondary }}>
              Mode
            </div>
            <div className="flex flex-row gap-4">
              <Card
                onClick={() => setThemeMode(ThemeMode.Light)}
                className="flex h-20 w-full cursor-pointer items-center justify-center"
              >
                <SvgIcon
                  icon="ic-settings-mode-sun"
                  size="24"
                  color={themeMode === ThemeMode.Light ? colorPrimary : ''}
                />
              </Card>
              <Card
                onClick={() => setThemeMode(ThemeMode.Dark)}
                className="flex h-20 w-full cursor-pointer items-center justify-center"
              >
                <SvgIcon
                  icon="ic-settings-mode-moon"
                  size="24"
                  color={themeMode === ThemeMode.Dark ? colorPrimary : ''}
                />
              </Card>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

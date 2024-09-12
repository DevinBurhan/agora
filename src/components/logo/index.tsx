import { NavLink } from 'react-router-dom';

import darkLogo from '@/assets/images/logos/small-logo-2.png';
import lightLogo from '@/assets/images/logos/transperent-small-logo.png';
import { useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';

interface Props {
  size?: number | string;
}
function Logo({ size = 50 }: Props) {
  const { colorPrimary } = useThemeToken();
  const settings = useSettings();
  const { themeMode } = settings;
  return (
    <NavLink to="/">
      {/* <Iconify icon="solar:code-square-bold" color={colorPrimary} size={size} /> */}
      {themeMode === 'dark' ? (
        <img src={lightLogo} alt="head-gear-and-streaming" width={45} height={45} />
      ) : (
        <img src={darkLogo} alt="head-gear-and-streaming" width={45} height={45} />
      )}
    </NavLink>
  );
}

export default Logo;

import { App as AntdApp } from 'antd';
import { Helmet } from 'react-helmet-async';

import Logo from '@/assets/images/logos/small-logo-3.png';
import Router from '@/router/index';
import AntdConfig from '@/theme/antd';

import { MotionLazy } from './components/animate/motion-lazy';

function App() {
  return (
    <AntdConfig>
      <AntdApp>
        <MotionLazy>
          <Helmet>
            <title>Head Gear Admin</title>
            <link rel="icon" href={Logo} />
          </Helmet>
          <Router />
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
  );
}

export default App;

import { Suspense, lazy } from 'react';

import { Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const Calendar = lazy(() => import('@/pages/sys/others/calendar'));

function Wrapper({ children }: any) {
  return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}
const others: AppRouteObject[] = [
  {
    path: 'calendar',
    element: (
      <Wrapper>
        <Calendar />
      </Wrapper>
    ),
    meta: {
      label: 'sys.menu.calendar',
      icon: <Iconify icon="solar:calendar-bold-duotone" size={24} />,
      key: '/calendar',
    },
  },
  // {
  //   path: 'kanban',
  //   element: (
  //     <Wrapper>
  //       <Kanban />
  //     </Wrapper>
  //   ),
  //   meta: {
  //     label: 'sys.menu.kanban',
  //     icon: <Iconify icon="solar:clipboard-bold-duotone" size={24} />,
  //     key: '/kanban',
  //   },
  // },
];

export default others;

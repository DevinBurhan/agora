import { useCallback, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import PageError from '@/pages/sys/error/PageError';
import { useUserToken } from '@/store/authStore';

import { useRouter } from '../hooks';

type Props = {
  children: React.ReactNode;
};
export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const { accessToken } = useUserToken();

  const check = useCallback(() => {
    if (!accessToken) {
      router.replace('/login');
    }
  }, [router, accessToken]);

  useEffect(() => {
    check();
  }, [check, accessToken]);

  return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
}

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StorageKeys } from '@utils/index';
import { useTestRunnerDispatch } from 'test-runner/store';
import { setLinkToken } from 'test-runner/store/participant';

type AuthData = {
  token: string;
  testId: string | null;
  params: Record<string, string>;
} | null;

type UseAuthTokenFromUrlResult = {
  authData: AuthData;
  loading: boolean;
};

/**
 * Secure hook for JWT token initialization with complete URL cleaning
 * @returns Contains validated token, optional testId, and sanitized params
 */
export function useAuthTokenFromUrl(): UseAuthTokenFromUrlResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useTestRunnerDispatch();
  const [authData, setAuthData] = useState<AuthData>(null);
  const [loading, setLoading] = useState(true);

  const cleanSensitiveParams = useCallback(() => {
    const sensitiveParams = ['token', 'testId', 'auth'];
    const newParams = new URLSearchParams(searchParams);
    let hasChanges = false;

    sensitiveParams.forEach(param => {
      if (newParams.has(param)) {
        newParams.delete(param);
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const validateAndExtractToken = useCallback((): AuthData => {
    const token = searchParams.get('token');
    if (!token) {
      cleanSensitiveParams();
      return null;
    }
    dispatch(setLinkToken(token));

    const testId = searchParams.get('testId');
    const params: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      if (!['token', 'testId', 'auth'].includes(key)) {
        params[key] = value;
      }
    });

    return { token, testId, params };
  }, [searchParams, cleanSensitiveParams, dispatch]);

  useEffect(() => {
    const extracted = validateAndExtractToken();

    if (extracted) {
      const cleanup = setTimeout(() => {
        sessionStorage.removeItem(StorageKeys.TOKEN);
      }, 300_000); // 5 minutes

      setAuthData(extracted);
      cleanSensitiveParams();

      return () => clearTimeout(cleanup);
    } else {
      setAuthData(null);
    }

    setLoading(false);
  }, [validateAndExtractToken, cleanSensitiveParams]);

  return { authData, loading };
}

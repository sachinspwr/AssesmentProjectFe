import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router';
import { useTestRunnerSelector } from 'test-runner/store';
import { TestFlowRoutes } from 'test-runner/core';
import { selectLinkToken } from 'test-runner/store/participant';

export function RequireLinkTokenGuard() {
  const linkToken = useTestRunnerSelector(selectLinkToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!linkToken) {
      navigate(TestFlowRoutes.ERROR_ACCESS_DENIED, {
        state: {
          error: 'Invalid access. Please use your original test link.',
        },
        replace: true,
      });
    }
  }, [linkToken, navigate]);

  return <Outlet />;
}

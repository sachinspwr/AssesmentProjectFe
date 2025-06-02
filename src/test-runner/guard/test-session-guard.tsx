// src/guards/test-session.guard.tsx
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TestFlowRoutes } from 'test-runner/core';
import { useTestRunnerSelector } from 'test-runner/store';
import { selectSessionToken, selectTestDetails } from 'test-runner/store/participant';

export function TestSessionGuard() {
  const navigate = useNavigate();
  const sessionToken = useTestRunnerSelector(selectSessionToken);
  const testDetails = useTestRunnerSelector(selectTestDetails);

  useEffect(() => {
    if (!sessionToken || !testDetails) {
      navigate(TestFlowRoutes.ERROR_ACCESS_DENIED, {
        state: {
          error: 'Test or session information is missing. Please try again from your original test link.',
        },
        replace: true,
      });
    }
  }, [sessionToken, testDetails, navigate]);

  if (!sessionToken || !testDetails) {
    return null; // Return null while redirecting
  }

  return <Outlet />;
}
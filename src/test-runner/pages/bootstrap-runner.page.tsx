import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VLoader } from '@components/molecules';
import { TestFlowRoutes } from 'test-runner/core';
import { useAuthTokenFromUrl, useTestWorkflow } from 'test-runner/hooks';
import { tokenService } from '@services/token.service';

export function BootstrapRunnerPage() {
  const navigate = useNavigate();
  const { authData, loading: authLoading } = useAuthTokenFromUrl();

  const { token, registrationRequired, testDetails, session, loading, error, startTestFlow } = useTestWorkflow();

  // Validate tet initialization data
  useEffect(() => {
    if (!authData) return;

    const initializeTest = async () => {
      const isValidToken = tokenService.isThisTokenValid(authData.token);

      if (!isValidToken) {
        navigate(TestFlowRoutes.ERROR_ACCESS_DENIED, {
          state: {
            error: 'Your access link is invalid or has expired. Please request a new one.',
          },
          replace: true,
        });
        return;
      }

      try {
        await startTestFlow(authData.token, authData.testId ?? undefined);
      } catch (err) {
        console.error('Test initialization failed:', err);
      }
    };

    initializeTest();
  }, [authData, navigate, startTestFlow]);

  // Validate initialize session
  useEffect(() => {
    if (registrationRequired) {
      navigate(TestFlowRoutes.PARTICIPANT_REGISTRATION, {
        state: { token },
        replace: true,
      });
      return;
    }

    if (error) {
      navigate(TestFlowRoutes.ERROR_ACCESS_DENIED, {
        state: { error: error || 'Authentication failed.' },
        replace: true,
      });
      return;
    }

    if (!token) return;

    if (session?.token && testDetails) {
      navigate(TestFlowRoutes.TEST_OVERVIEW, {
        state: {
          sessionToken: session.token,
          testDetails,
        },
        replace: true,
      });
    }
  }, [token, registrationRequired, session, testDetails, error, navigate]);

  const getLoadingMessage = () => {
    if (!token) return 'Validating your access...';
    if (!session) return 'Creating your test session...';
    if (!testDetails) return 'Loading test content...';
    return 'Preparing your test environment...';
  };

  if (authLoading || loading || !authData) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <VLoader />
        <span className="mt-4 text-lg">{getLoadingMessage()}</span>
      </div>
    );
  }

  return null;
}

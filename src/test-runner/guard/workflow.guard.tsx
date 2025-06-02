// components/TestWorkflowGuard.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { TestWorkflowState } from '../types';
import { selectWorkflowState } from 'test-runner/store';

interface TestWorkflowGuardProps {
  children: React.ReactNode;
  requiredState: TestWorkflowState;
  fallbackPath: string;
}

// Define the valid progression order of workflow states
const WORKFLOW_STATE_ORDER: readonly TestWorkflowState[] = [
  TestWorkflowState.INITIAL,
  TestWorkflowState.PARTICIPANT_TOKEN_FETCHING,
  TestWorkflowState.REGISTRATION_REQUIRED,
  TestWorkflowState.PARTICIPANT_TOKEN_ACQUIRED,
  TestWorkflowState.SESSION_CREATED,
  TestWorkflowState.TEST_OVERVIEW,
  TestWorkflowState.TEST_STARTED,
  TestWorkflowState.TEST_IN_PROGRESS,
  TestWorkflowState.TEST_SUBMITTED,
  TestWorkflowState.FEEDBACK_REQUIRED,
  TestWorkflowState.RESULTS_AVAILABLE,
  TestWorkflowState.SIGN_OFF,
  TestWorkflowState.AUTH_ERROR, // optional, depending on how you want to treat auth errors
] as const;

// eslint-disable-next-line react/function-component-definition
export function TestWorkflowGuard({ children, requiredState, fallbackPath }: TestWorkflowGuardProps) {
  const currentState = useSelector(selectWorkflowState);

  // if (currentState == null) {
  //   console.error('Workflow state is undefined or null — redirecting to fallback.');
  //   return <Navigate to={fallbackPath} replace />;
  // }

  // const currentIndex = WORKFLOW_STATE_ORDER.indexOf(currentState);
  // const requiredIndex = WORKFLOW_STATE_ORDER.indexOf(requiredState);

  // console.error(`Invalid current workflow state: ${currentState}, ${currentIndex}, ${requiredIndex}`);

  // if (currentIndex === -1) {
  //   return <Navigate to={fallbackPath} replace />;
  // }

  // if (requiredIndex === -1) {
  //   console.error(`Invalid required workflow state: ${requiredState}`);
  //   // Safer to redirect instead of rendering children in this case
  //   return <Navigate to={fallbackPath} replace />;
  // }

  // if (currentIndex < requiredIndex) {
  //   return <Navigate to={fallbackPath} replace />;
  // }

  return <>{children}</>;
}

TestWorkflowGuard.displayName = 'TestWorkflowGuard';

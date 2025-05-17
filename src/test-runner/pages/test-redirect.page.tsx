import { tokenService } from '@services/token.service';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TestRedirectPage() {
  const { testLinkToken } = useParams<{ testLinkToken: string }>();
  const navigate = useNavigate();

  if (!testLinkToken) {
    navigate('invalid-link');
  }

  useEffect(() => {
    tokenService.saveTokenInStorage(testLinkToken!);
    const testId = tokenService.getValueFromToken('testId');
    const redirectLink = testId ? `test/${testId}` : 'invalid-link';
    navigate(`/test-runner/${redirectLink}`);
  });

  return <div>redirecting.....</div>;
}

export { TestRedirectPage };

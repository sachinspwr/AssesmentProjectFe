import { VButton } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrivacyPolicyContent } from 'test-runner/components';
import { TestFlowRoutes } from 'test-runner/core';

export function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const policyData = {
    lastUpdated: 'May 28, 2025',
  };

  return (
    <div className="!mb-8">
      <header className="mb-8">
        <VTypography as="h1" className="text-3xl font-bold mb-2">
          Privacy Policy
        </VTypography>
        <VTypography as="p" className="!text-theme-secondary">
          Effective Date: {policyData.lastUpdated}
        </VTypography>
      </header>

      <main className="max-w-3xl p-6">
        <PrivacyPolicyContent />
      </main>

      {/* Fixed footer with action buttons */}
      <footer className="sticky bottom-0 p-4">
        <div className="max-w-3xl mx-auto flex justify-start gap-4">
          <div className="w-48">
            <VButton
              variant="negative"
              className="w-full"
              onClick={() => navigate(TestFlowRoutes.PRIVACY_POLICY_REJECTED)}
            >
              Reject
            </VButton>
          </div>
          <div className="w-72">
            <VButton variant="primary" className="w-full" onClick={() => navigate(TestFlowRoutes.TEST_INTERFACE)}>
              Accept & Continue
            </VButton>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PrivacyPolicyPage;

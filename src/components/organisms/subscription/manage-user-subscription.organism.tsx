import React, { useState } from 'react';
import { SubscriptionPlans } from './subscription-plans.organism';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { SubscriptionResponseDTO } from '@dto/response/subscription-option-response.dto';
import { SubscriptionPaymentProcessor } from './payment-processor.organism';
import { useSubscription } from '@hooks';
import toast from 'react-hot-toast';

type ManageUserSubscriptionProps = {
  onSubscriptionActivated: () => void;
};

function ManageUserSubscription({ onSubscriptionActivated }: ManageUserSubscriptionProps) {
  const { allSubscriptions, syncSubscriptions } = useSubscription();
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionResponseDTO | null>(null);

  const handleGetStarted = (subscription: SubscriptionResponseDTO) => {
    if (selectedSubscription?.id === subscription.id) {
      // Reset then re-set to force re-render
      setSelectedSubscription(null);
      setTimeout(() => setSelectedSubscription(subscription), 0);
    } else {
      setSelectedSubscription(subscription);
    }
  };

  const handlePaymentComplete = async () => {
    try {
    // Then sync the latest subscriptions
    await syncSubscriptions();
    
    // Reset selection and notify parent
    setSelectedSubscription(null);
    onSubscriptionActivated();
    } catch (e) {
      toast.error('Refresh Subscription Failed');
    }
  };

  return (
    <div className="space-y-8">
      <SubscriptionPlans userSubscriptions={allSubscriptions} onPlanSelected={handleGetStarted} />

      {/* Payment Processor */}
      {selectedSubscription && (
        <SubscriptionPaymentProcessor
          key={selectedSubscription.id}
          subscriptionId={selectedSubscription.id}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {/* FAQ/Support Link */}
      <div className="text-center pt-4">
        <VTypography as="p" className="text-sm text-theme-muted">
          Need help deciding?{' '}
          <a href="#" className="text-theme-primary hover:underline">
            Compare all features
          </a>{' '}
          or{' '}
          <a href="#" className="text-theme-primary hover:underline">
            contact our sales team
          </a>
          .
        </VTypography>
      </div>
    </div>
  );
}

export { ManageUserSubscription };

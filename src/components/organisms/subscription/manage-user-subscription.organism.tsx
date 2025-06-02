import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useSubscription } from '@hooks';
import { AccountSubscription } from 'models/account/account-subscription.model';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { SubscriptionPaymentProcessor } from './payment-processor.organism';
import { SubscriptionPlans } from './subscription-plans.organism';

type ManageUserSubscriptionProps = {
  onSubscriptionActivated: () => void;
  isEnterpriseMode?: boolean; // Add this prop
};

function ManageUserSubscription({
  onSubscriptionActivated,
  isEnterpriseMode = false
}: ManageUserSubscriptionProps) {
  const { allSubscriptions, syncSubscriptions } = useSubscription();
  const [selectedSubscription, setSelectedSubscription] = useState<AccountSubscription | null>(null);

  // Filter subscriptions based on enterprise mode
  const filteredSubscriptions = isEnterpriseMode
    ? allSubscriptions.filter(
      subscription =>
        subscription.subscription.type === "Custom"
    )
    : allSubscriptions.filter(
      subscription =>
        subscription.subscription.type === "Standard"
    );

  const handleGetStarted = (subscription: AccountSubscription) => {
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
      <SubscriptionPlans
        userSubscriptions={filteredSubscriptions}
        onPlanSelected={handleGetStarted}
        isEnterpriseMode={isEnterpriseMode}
      />

      {/* Payment Processor */}
      {selectedSubscription && (
        <SubscriptionPaymentProcessor
          key={selectedSubscription.id}
          subscriptionId={selectedSubscription.id}
          onPaymentComplete={handlePaymentComplete}
          subscriptions={selectedSubscription}
          isEnterprise={isEnterpriseMode}
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

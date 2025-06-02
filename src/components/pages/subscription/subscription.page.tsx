import React, { useState } from 'react';
import { VRadioButtonGroup } from '@components/molecules';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VButton } from '@components/atoms';
import { useScroll } from '@hooks';
import { AccountSubscriptions } from '@components/organisms/subscription/account-subscriptions.organism';
import { AccountSubscriptionOrders } from '@components/organisms/subscription/account-subscription-orders-organism';

type SubscriptionviewMode = 'my-subscriptions' | 'billing';

const SUBSCRIPTION_TAB_OPTIONS = [
  { label: 'My Subscriptions', value: 'my-subscriptions' },
  { label: 'Billing History', value: 'billing' },
];

export function Subscriptionpage({ className = '', isEnterpriseMode = false }: { className?: string, isEnterpriseMode?: boolean }) {
  const { scrollToTop } = useScroll();
  const [currentView, setCurrentView] = useState<SubscriptionviewMode>('my-subscriptions');
  const [isManagingSubscription, setIsManagingSubscription] = useState(false);

  const handleViewChange = (value: string) => {
    setCurrentView(value as SubscriptionviewMode);
    setIsManagingSubscription(false);
  };

  const handleManageModeChange = (status: boolean) => {
    scrollToTop({ behavior: 'smooth' });
    setIsManagingSubscription(status);
  };

  return (
    <div className={`relative w-full flex flex-col  min-h-screen bg-skin-theme-light ${className}`}>
      <VTypography as="h3" className="">
        Subscriptions
      </VTypography>

      <div className="my-5 flex justify-between items-center border-b-2 py-4 w-full">
        <VRadioButtonGroup
          name="subscription-tabs"
          options={SUBSCRIPTION_TAB_OPTIONS}
          defaultValue="my-subscriptions"
          onChange={handleViewChange}
          direction="horizontal"
          wrapperClasses="!w-fit"
        />

        <div className="w-56 flex justify-end">
          <VButton
            variant="primary"
            className={currentView === 'my-subscriptions' ? '' : 'invisible'}
            onClick={() => setIsManagingSubscription(!isManagingSubscription)}
          >
            {isManagingSubscription ? 'Back To Subscriptions' : 'Manage Plan'}
          </VButton>
        </div>
      </div>

      {currentView === 'my-subscriptions' ? (
        <AccountSubscriptions
          isManagingSubscription={isManagingSubscription}
          onManageModeToggle={handleManageModeChange}
          isEnterpriseMode={isEnterpriseMode}
        />
      ) : (
        <AccountSubscriptionOrders />
      )}
    </div>
  );
}


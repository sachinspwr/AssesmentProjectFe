import React from 'react';
import { VLoader } from '@components/molecules';
import { SubscriptionCard } from './subscription-card.organism';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useFetchAvailableSubscriptionsQuery } from 'store/slices/subscription-option.slice';
import { HiCheckCircle } from 'react-icons/hi2';
import { Subscription, UserSubscription } from 'models';

type SubscriptionPlansProps = {
  userSubscriptions?: UserSubscription[];
  heading?: string;
  showIncludedInPlanDetail?: boolean;
  onPlanSelected?: (subscription: Subscription) => void;
};

// Compare prices and return the action label
const getActionLabel = (
  current: Subscription | undefined,
  target: Subscription
): 'Upgrade' | 'Downgrade' | 'Get Started' => {
  if (!current || current.id === target.id) return 'Get Started';
  return target.priceUsd > current.priceUsd ? 'Upgrade' : 'Downgrade';
};

function SubscriptionPlans({
  heading = 'Choose the Right Plan for You',
  userSubscriptions = [],
  showIncludedInPlanDetail = true,
  onPlanSelected,
}: SubscriptionPlansProps) {
  const { data: subscriptions, isLoading } = useFetchAvailableSubscriptionsQuery();

  if (isLoading) {
    return <VLoader size="md" />;
  }

  if (!subscriptions?.length) {
    return (
      <VTypography as="p" color="muted" className="text-center py-8">
        No subscription plans available
      </VTypography>
    );
  }

  const hasAnySubscription = userSubscriptions.length > 0;
  const currentSubscription = hasAnySubscription
    ? subscriptions.find((s) => s.id === userSubscriptions[0]?.subscriptionId)
    : undefined;

  return (
    <>
      {/* Header */}
      <div className="text-center">
        <VTypography as="h3" className="font-bold text-theme-heading">
          {heading}
        </VTypography>
        <VTypography as="p" className="mt-4 text-theme-body max-w-3xl mx-auto">
          Get access to premium features and resources tailored to your needs. All plans come with a 14-day money-back
          guarantee.
        </VTypography>
      </div>

      {/* Shared Features */}
      {showIncludedInPlanDetail && (
        <div className="bg-theme-default-alt rounded-xl p-6 mt-6">
          <VTypography as="h4" className="text-lg font-semibold mb-4 text-theme-heading">
            What's Included in All Plans:
          </VTypography>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Multiple Question Types',
              'Automated Grading',
              'Question Randomization',
              'Time-Limited Exams',
              'Scheduled Availability',
              'Practice Tests',
              'Instant Results',
              'Accessibility Tools',
              'Multi-Language Support',
            ].map((feature) => (
              <li key={feature} className="flex items-start">
                <HiCheckCircle className="flex-shrink-0 text-theme-positive mt-1 mr-2" />
                <VTypography as="span" className="text-theme-body">
                  {feature}
                </VTypography>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isLoading && <VLoader size="md" />}

      {/* Upgrade Info */}
      {hasAnySubscription && (
        <VTypography as="p" className="text-center my-6 text-theme-body font-medium">
          You can upgrade or downgrade your plan below.
        </VTypography>
      )}

      {/* Plans */}
      <div className="flex justify-center px-4 sm:px-6">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {subscriptions.map((subscription) => {
              const isUserSubscribed = userSubscriptions.some((us) => us.subscriptionId === subscription.id);
              const actionLabel = getActionLabel(currentSubscription, subscription);

              return (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                  isActive={isUserSubscribed}
                  isDisabled={isUserSubscribed}
                  actionLabel={actionLabel}
                  onGetStarted={() => onPlanSelected?.(subscription)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export { SubscriptionPlans };

import { NoSubscription } from './no-subscriptions.organism';
import { useSubscription } from '@hooks';
import { ManageUserSubscription } from './manage-user-subscription.organism';
import { AccountSubscriptionDetails } from './account.subscription-detail.organism';
import { useAppSelector } from 'store/store';

interface AccountSubscriptionsProps {
  onManageModeToggle: (state: boolean) => void;
  isManagingSubscription?: boolean;
  isEnterpriseMode?: boolean; // Add this prop to determine if we're in enterprise mode
}

function AccountSubscriptions({
  onManageModeToggle,
  isManagingSubscription,
  isEnterpriseMode = false
}: AccountSubscriptionsProps) {
  const { allSubscriptions = [] } = useSubscription();
  const tenantId = useAppSelector((state) => state.account.user?.tenantId);

  // Filter subscriptions based on enterprise mode
  const filteredSubscriptions = isEnterpriseMode
    ? allSubscriptions.filter(
      subscription =>
        // subscription.subscription.type === "Enterprise" ||
        subscription.subscription.subscriptionCategory === "Enterprise"
    )
    : allSubscriptions.filter(
      subscription =>
        // subscription.subscription.type === "Enterprise" ||
        subscription.subscription.subscriptionCategory === "Individual"
    );

  const hasNoSubscriptions = filteredSubscriptions.length === 0;

  return (
    <div className="flex flex-col gap-4">
      {hasNoSubscriptions && !isManagingSubscription && (
        <NoSubscription onSubscribe={() => onManageModeToggle(true)} />
      )}

      {!hasNoSubscriptions && (
        <>
          {isManagingSubscription && !tenantId ? (
            <ManageUserSubscription
              onSubscriptionActivated={() => onManageModeToggle(false)}
              isEnterpriseMode={isEnterpriseMode} // Pass this prop down if needed
            />
          ) : (
            filteredSubscriptions.map((subscription) => (
              <AccountSubscriptionDetails
                key={subscription.id}
                subscription={subscription}
                isExpandedonLoad={filteredSubscriptions.length <= 1}
              />
            ))

          )}
        </>
      )}
    </div>
  );
}

export { AccountSubscriptions };
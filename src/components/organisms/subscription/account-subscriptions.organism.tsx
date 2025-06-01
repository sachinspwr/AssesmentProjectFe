import { NoSubscription } from './no-subscriptions.organism';
import { useSubscription } from '@hooks';
import { ManageUserSubscription } from './manage-user-subscription.organism';
import { AccountSubscriptionDetails } from './account.subscription-detail.organism';

interface AccountSubscriptionsProps {
  onManageModeToggle: (state: boolean) => void;
  isManagingSubscription?: boolean;
}

function AccountSubscriptions({ onManageModeToggle, isManagingSubscription }: AccountSubscriptionsProps) {
  const { allSubscriptions = [] } = useSubscription();

  const hasNoSubscriptions = allSubscriptions.length === 0;

  return (
    <div className="flex flex-col gap-4">
      {hasNoSubscriptions && !isManagingSubscription && <NoSubscription onSubscribe={() => onManageModeToggle(true)} />}

      {!hasNoSubscriptions && (
        <>
          {isManagingSubscription ? (
            <ManageUserSubscription onSubscriptionActivated={() => onManageModeToggle(false)} />
          ) : (
            allSubscriptions.map((subscription) => (
              <AccountSubscriptionDetails
                key={subscription.id}
                subscription={subscription}
                isExpandedonLoad={allSubscriptions.length <= 1}
              />
            ))

          )}
        </>
      )}
    </div>
  );
}

export { AccountSubscriptions };

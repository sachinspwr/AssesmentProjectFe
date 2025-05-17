import { VButton } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';

type NoSubscriptionProps = {
  onSubscribe: () => void;
};

function NoSubscription({ onSubscribe }: NoSubscriptionProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 py-10">
      <VTypography as="h4">No Subscription Found</VTypography>
      <VTypography as="p" className="text-theme-muted">
        You don't have an active subscription. Subscribe now to unlock features.
      </VTypography>
      <div className="flex flex-col items-center gap-3">
        <VButton onClick={onSubscribe}>Subscribe Now</VButton>
      </div>
    </div>
  );
}

export { NoSubscription };

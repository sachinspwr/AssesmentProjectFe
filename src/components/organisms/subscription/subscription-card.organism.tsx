import { HiCheckCircle } from 'react-icons/hi';
import { VButton, VCard } from '@components/atoms';
import { SubscriptionResponseDTO } from '@dto/response/subscription-option-response.dto';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VBadge } from '@components/molecules';

interface SubscriptionCardProps {
  subscription: SubscriptionResponseDTO;
  onGetStarted?: (subscription: SubscriptionResponseDTO) => void;
  isLoading?: boolean;
  highlight?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  actionLabel?: 'Upgrade' | 'Downgrade' | 'Get Started'
}

function SubscriptionCard({
  subscription,
  onGetStarted,
  isLoading = false,
  highlight = false,
  isActive = false,
  isDisabled = false,
  actionLabel
}: SubscriptionCardProps) {
  const descriptionArray = Array.isArray(subscription.description)
    ? subscription.description
    : JSON.parse(subscription.description || '[]');

  return (
    <VCard className="relative">
      {/* Highlight badge */}
      {highlight && (
        <div className="absolute right-4">
          <VBadge variant="positive" label="Best Value" />
        </div>
      )}

      {/* Active badge */}
      {isActive && (
        <div className="absolute right-4 top-4">
          <VBadge variant="primary" label="Active" />
        </div>
      )}

      <div className="p-2">
        {/* Header */}
        <div className="mb-4">
          <VTypography as="h3" className={`font-bold ${highlight ? 'text-theme-brand' : 'text-theme-heading'}`}>
            {subscription.name}
          </VTypography>
        </div>

        {/* Price */}
        <div className="mb-6 ml-3">
          <div className="flex items-end">
            <span className={`text-3xl font-bold ${highlight ? 'text-theme-brand' : 'text-theme-heading'}`}>
              ${subscription.priceUsd}
            </span>
            <span className="text-theme-muted ml-1">/month</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 ml-3 mb-6 min-h-32">
          {descriptionArray.map((item: string, index: number) => (
            <li key={index} className="flex items-start">
              <HiCheckCircle className="flex-shrink-0 mt-1 mr-2 text-theme-brand" />
              <VTypography as="span" className="text-theme-body">
                {item}
              </VTypography>
            </li>
          ))}
        </ul>

        {/* Button */}
        {onGetStarted && !isActive && (
          <VButton
            label={isActive ? 'Active' : actionLabel || 'Get Started'}
            variant={highlight ? 'primary' : 'secondary'}
            size="md"
            isLoading={isLoading}
            onClick={() => onGetStarted(subscription)}
            className="w-full"
            disabled={isDisabled || isActive}
          />
        )}
      </div>
    </VCard>
  );
}

export { SubscriptionCard };

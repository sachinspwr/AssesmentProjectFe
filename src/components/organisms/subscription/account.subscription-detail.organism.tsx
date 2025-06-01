import React, { useState } from 'react';
import { format } from 'date-fns';
import { VButton, VCard, VICon, VSwitch } from '@components/atoms';
import { VBadge } from '@components/molecules';
import { BsCheck } from 'react-icons/bs';
import { DownloadInvoice } from './download-invoice.organism';
import { getVarientFromPaymentStatus, getVarientFromSubscriptionStatus } from '@utils/functions';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useLoggedInUser } from '@hooks';
import { AccountSubscription } from 'models/account/account-subscription.model';
import { PaymentStatus } from '@utils/enums/payment-status.enum';

interface SubscriptionDetailsSectionProps {
  subscription: AccountSubscription;
  isExpandedonLoad?: boolean;
  onToggleAutoRenewal?: (value: boolean) => void;
}

export function AccountSubscriptionDetails({
  subscription,
  isExpandedonLoad,
  onToggleAutoRenewal,
}: SubscriptionDetailsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(isExpandedonLoad);

  const {
    subscription: plan,
    status,
    account,
    startDate,
    endDate,
    accountSubscriptionPayment,
    accountSubscriptionLimit = [],
  } = subscription || {};

  const { firstName, lastName, email, mobile, company, companyRole } = account?.user || {};

  const formattedLimits = accountSubscriptionLimit.map((limit) => ({
    key: limit.subscriptionLimit?.key
      ? limit.subscriptionLimit.key
          .split('_')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : 'Unknown',
    value: limit.value,
    total: limit.subscriptionLimit?.value || 0,
    usedPercentage: limit.subscriptionLimit?.value
      ? Math.min(100, (limit.value / limit.subscriptionLimit.value) * 100)
      : 0,
  }));

  const descriptionArray = Array.isArray(plan.description) ? plan.description : JSON.parse(plan.description || '[]');
  const subscriptionStatusVariant = getVarientFromSubscriptionStatus(status).type;
  const paymentStatus = accountSubscriptionPayment?.status;
  const paymentStatusVariant = getVarientFromPaymentStatus(paymentStatus ?? PaymentStatus.PENDING).type;
  const loggedUser = useLoggedInUser();
  console.log('subscription', subscription);
  console.log('userSubscriptionLimit', accountSubscriptionLimit);
  const renderToggleButton = (
    <div className="py-3">
      <VButton
        variant="link"
        size="sm"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="text-theme-primary !w-28"
      >
        {isExpanded ? 'View Less' : 'View More'}
      </VButton>
    </div>
  );

  return (
    <div className="space-y-6">
      <VCard className="!p-0 shadow-none border-none">
        {/* Header */}
        <div className="flex items-center justify-between py-1 border-b">
          <div>
            <VTypography as="h4">Subscription Details</VTypography>
            <p className="mt-1 text-sm text-theme-muted">
              {firstName || loggedUser?.firstName}'s {plan.name}
            </p>
          </div>
          {accountSubscriptionPayment && (
            <div className="flex ">
              <VSwitch label="Primary" checked={status === 'active'} />
              <DownloadInvoice subscription={subscription} />
            </div>
          )}
        </div>

        {/* Main Info Sections */}
        <div className="divide-y divide-theme-border">
          {/* Plan Overview */}
          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoItem label="Plan Name" value={plan.name} />
            <InfoItem label="Price" value={`$${plan.priceUsd?.toFixed(2) || '0.00'} / month`} />
            <div>
              <p className="text-sm font-medium text-theme-muted">Status</p>
              <div className="mt-1">
                <VBadge variant={subscriptionStatusVariant} className="text-xs">
                  {status.toUpperCase()}
                </VBadge>
              </div>
            </div>
          </div>

          {/* Dates and Payment */}
          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoItem label="Start Date" value={format(new Date(startDate), 'MMM d, yyyy')} />
            <InfoItem label="End Date" value={format(new Date(endDate), 'MMM d, yyyy')} />
            <div>
              <p className="text-sm font-medium text-theme-muted">Payment Status</p>
              <div className="mt-1">
                <VBadge variant={paymentStatusVariant} className="text-xs">
                  {paymentStatus?.toUpperCase() ?? 'NONE'}
                </VBadge>
              </div>
            </div>
          </div>

          {/* Auto Renewal */}
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-theme-muted">Auto-renewal</p>
              <p className="mt-1 text-sm text-theme-body">
                {status === 'active' ? 'Automatically renews on expiry' : 'Will not renew automatically'}
              </p>
            </div>
            <VSwitch
              checked={status === 'active'}
              disabled={status !== 'active'}
              onChange={(isOn) => onToggleAutoRenewal?.(Boolean(isOn))}
            />
          </div>

          {/* View More Toggle */}
          {!isExpanded && renderToggleButton}

          {/* Expanded Section */}
          {isExpanded && (
            <>
              {/* Plan Features */}
              <div className="px-6 py-5">
                <SectionTitle title="Plan Features" />
                <ul className="space-y-3">
                  {descriptionArray.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <VICon icon={BsCheck} className="flex-shrink-0 w-5 h-5 text-theme-positive mt-0.5 mr-3" />
                      <span className="text-theme-body">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* User Information */}
              <div className="px-6 py-5">
                <SectionTitle title="User Information" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <InfoItem label="Full Name" value={`${firstName} ${lastName}`} />
                    <InfoItem label="Email" value={email || 'Not Provided'} />
                    <InfoItem label="Mobile" value={mobile || 'Not provided'} />
                  </div>
                  <div className="space-y-4">
                    <InfoItem label="Company" value={company || 'Not Provided'} />
                    <InfoItem label="Role" value={companyRole || 'Not Provided'} />
                  </div>
                </div>
              </div>

              <div className="px-6 py-5">
                <SectionTitle title="Subscription Limits" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formattedLimits.map((limit, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-theme-muted">{limit.key}</p>
                        <p className="text-xs text-theme-muted">
                          {limit.value} / {limit.total}
                        </p>
                      </div>
                      {limit.total > 0 && (
                        <div className="w-full bg-theme-border rounded-full h-2 border border-theme-border-dark">
                          <div
                            className={`h-full rounded-full ${
                              limit.usedPercentage >= 90 ? 'bg-theme-negative' : 'bg-theme-primary'
                            } border-r border-white/50`}
                            style={{ width: `${limit.usedPercentage}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {renderToggleButton}
            </>
          )}
        </div>
      </VCard>
    </div>
  );
}

/** Helper Components **/

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-theme-muted">{label}</p>
      <p className="mt-1 text-theme-body">{value}</p>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <p className="text-sm font-medium text-theme-muted mb-3">{title}</p>;
}

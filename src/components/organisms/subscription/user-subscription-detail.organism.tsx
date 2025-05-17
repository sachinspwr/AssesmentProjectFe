import React, { useState } from 'react';
import { format } from 'date-fns';
import { VButton, VCard, VICon, VSwitch } from '@components/atoms';
import { VBadge } from '@components/molecules';
import { BsCheck } from 'react-icons/bs';
import { DownloadInvoice } from './download-invoice.organism';
import { UserSubscription } from 'models';
import { getVarientFromPaymentStatus, getVarientFromSubscriptionStatus } from '@utils/functions';
import { VTypography } from '@components/molecules/typography/v-typography.mol';

interface SubscriptionDetailsSectionProps {
  subscription: UserSubscription;
  isExpandedonLoad?: boolean;
  onToggleAutoRenewal?: (value: boolean) => void;
}

export function UserSubscriptionDetails({
  subscription,
  isExpandedonLoad,
  onToggleAutoRenewal,
}: SubscriptionDetailsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(isExpandedonLoad);

  const { subscription: plan, status, user, startDate, endDate, userSubscriptionPayment } = subscription;

  const { firstName, lastName, email, mobile, company, companyRole } = user;

  const descriptionArray = Array.isArray(plan.description) ? plan.description : JSON.parse(plan.description || '[]');

  const subscriptionStatusVariant = getVarientFromSubscriptionStatus(status).type;
  const paymentStatus = userSubscriptionPayment?.status;
  const paymentStatusVariant = getVarientFromPaymentStatus(paymentStatus).type;

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
              {firstName}'s {plan.name}
            </p>
          </div>
          {userSubscriptionPayment && <DownloadInvoice subscription={subscription} />}
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
                    <InfoItem label="Email" value={email} />
                    <InfoItem label="Mobile" value={mobile || 'Not provided'} />
                  </div>
                  <div className="space-y-4">
                    <InfoItem label="Company" value={company || 'Not provided'} />
                    <InfoItem label="Role" value={companyRole || 'Not provided'} />
                  </div>
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

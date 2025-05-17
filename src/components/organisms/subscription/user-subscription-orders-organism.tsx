import { useState, useMemo } from 'react';
import { useFetchAccountSubscriptionOrdersQuery } from 'store/slices/account-subscription.slice';
import { useLoggedInUser } from '@hooks';
import { defaultFormatDtTm, getVarientFromSubscriptionStatus } from '@utils/functions';
import { mapper } from 'mapper';
import { UserSubscriptionOrderModel } from 'models';
import { UserSubscriptionOrderResponseDTO } from '@dto/response/user-subscription-order.response.dto';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VImage } from '@components/atoms';
import { VBadge, VLoader } from '@components/molecules';
import { PaymentStatus } from '@utils/enums/payment-status.enum';
import { OrderFilters } from './user-subscription-filter-order.organism';
import { AxiosBaseQueryError } from 'api/base.query';

function UserSubscriptionOrders() {
  const user = useLoggedInUser();
  const { data = [], isLoading, error } = useFetchAccountSubscriptionOrdersQuery(user?.id ?? '', { skip: !user });
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Map user subscription orders to the Subscription model
  const mappedOrders = mapper.mapArray(data, UserSubscriptionOrderResponseDTO, UserSubscriptionOrderModel);

  const filteredOrders = useMemo(() => {
    if (!mappedOrders.length) return [];
    if (selectedStatus === 'all') {
      return [...mappedOrders];
    }
    return mappedOrders.filter((order) => order.status?.toLowerCase() === selectedStatus.toLowerCase());
  }, [mappedOrders, selectedStatus]);

  const handleStatusFilterChange = (statusValue: string | string[]) => {
    const newStatus = Array.isArray(statusValue) ? statusValue[0] || 'all' : statusValue;
    setSelectedStatus(newStatus);
  };

  const handleOrderVisibilityToggle = (statusType: 'completed' | 'pending') => {
    const statusValue = statusType === 'completed' ? PaymentStatus.COMPLETED : PaymentStatus.PENDING;
    setSelectedStatus((prev) => (prev === statusValue ? 'all' : statusValue));
  };

  const columns: VTableColumn<UserSubscriptionOrderModel>[] = [
    {
      key: 'subscription',
      label: 'Plan Details',
      sortable: true,
      customRender: ({ subscription }) => (
        <div className="space-y-1">
          <VTypography className="font-medium text-theme-on-default">{subscription?.name || '—'}</VTypography>
          <div className="flex items-center gap-2">
            <VTypography className="text-sm text-theme-muted">
              {subscription?.priceUsd?.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
              })}
            </VTypography>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Order Status',
      sortable: true,
      customRender: ({ status }) => (
        <VBadge variant={getVarientFromSubscriptionStatus(status).type} className="capitalize">
          {status?.toLowerCase() || '—'}
        </VBadge>
      ),
    },
    {
      key: 'amount',
      label: 'Payment',
      sortable: true,
      customRender: ({ amount, currency, method }) => (
        <div className="space-y-1">
          <VTypography className="text-theme-on-default">
            {Number(amount)?.toLocaleString('en-IN', {
              style: 'currency',
              currency: currency || 'INR',
              minimumFractionDigits: 2,
            })}
          </VTypography>
          {method && <VTypography className="text-xs text-theme-muted">via {method}</VTypography>}
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Initiated On',
      sortable: true,
      customRender: ({ createdAt }) => (
        <div className="flex flex-col">
          <VTypography className="text-sm font-medium text-theme-on-default">
            {defaultFormatDtTm(createdAt)}
          </VTypography>
        </div>
      ),
    },
  ];

  const hasNoData = !isLoading && mappedOrders.length === 0;

  if (isLoading) return <VLoader />;

  return (
    <div className="relative w-full flex flex-col min-h-screen bg-skin-theme-light">
      <div className="flex flex-col gap-6">
        <OrderFilters
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusFilterChange}
          onToggleStatus={handleOrderVisibilityToggle}
        />

        {hasNoData && (error as AxiosBaseQueryError).status === 404 ? (
          <div className="mt-4 flex-1 flex flex-col items-center justify-center">
            <VImage src="../../src/assets/images/no orders.png" className="max-w-96 h-auto" />
            <VTypography className="my-8" as="h5">
              No Subscription Orders Found
            </VTypography>
          </div>
        ) : (
          <VTable
            title={`Total Orders (${filteredOrders.length})`}
            data={filteredOrders}
            columns={columns}
            loading={isLoading}
            itemsPerPage={6}
          />
        )}
      </div>
    </div>
  );
}

export { UserSubscriptionOrders };

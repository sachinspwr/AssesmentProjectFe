import { useAppSelector, useAppDispatch } from 'store/store';
import { useFetchAccountSubscriptionsQuery } from 'store/slices/account-subscription.slice';
import { setUserSubscriptions } from 'store/slices/account.slice';
import { useEffect, useMemo } from 'react';
import { mapper } from 'mapper';
import { AccountSubscription } from 'models/account/account-subscription.model';
import { AccountSubscriptionResponseDTO } from '@dto/response/account/account-subscription-response.dto';

interface SubscriptionStatus {
  allSubscriptions: AccountSubscription[];
  activeSubscription: AccountSubscription | null;
  hasActiveSubscription: boolean;
  isLoading: boolean;
  isError: boolean;
  isSyncing: boolean;
  syncSubscriptions: () => void;
}

export const useSubscription = (): SubscriptionStatus => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.account.user?.id);
  // Only select subscriptions once to prevent unnecessary updates
  const reduxSubscriptions = useAppSelector(
    (state) => state.account.user?.subscriptions ?? [],
  );

  const {
    data: subscriptions = [],
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useFetchAccountSubscriptionsQuery(userId || '', {
    skip: !userId,
    refetchOnMountOrArgChange: false,
  });

  // Memoize the mapped subscriptions to prevent new references
  const userSubscriptions = useMemo(() => {
    return mapper.mapArray(subscriptions, AccountSubscriptionResponseDTO, AccountSubscription);
  }, [subscriptions]);

  // Only update Redux if the data actually changed
  useEffect(() => {
    if (userSubscriptions.length > 0) {
      const shouldUpdate = JSON.stringify(userSubscriptions) !== JSON.stringify(reduxSubscriptions);
      if (shouldUpdate) {
        dispatch(setUserSubscriptions([...userSubscriptions]));
      }
    }
  }, [userSubscriptions, reduxSubscriptions, dispatch]);

  // Memoize the effective subscriptions
  const effectiveSubscriptions = useMemo(() => {
    return userSubscriptions.length > 0 ? userSubscriptions : reduxSubscriptions;
  }, [userSubscriptions, reduxSubscriptions]);

  // Memoize the entire return object to prevent unnecessary re-renders
  return useMemo(() => ({
    allSubscriptions: effectiveSubscriptions,
    activeSubscription: effectiveSubscriptions.find(sub => sub.status === 'active') ?? null,
    hasActiveSubscription: effectiveSubscriptions.some(sub => sub.status === 'active'),
    isLoading,
    isError,
    isSyncing: isFetching,
    syncSubscriptions: refetch,
  }), [effectiveSubscriptions, isLoading, isError, isFetching, refetch]);
};
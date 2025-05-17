import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'store/store';

//Add any routes want to exclude
const ALLOWED_PATHS = [
] as const;

export function SubscriptionGuard() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => state.account);

  // Memoize subscription check to prevent unnecessary re-renders
  const hasActiveSubscription = useMemo(() => {
    return Boolean(user?.subscriptions?.length);
  }, [user?.subscriptions]);

  // Memoize path check for performance
  const isAllowedPath = useMemo(() => {
    return ALLOWED_PATHS.some(path => pathname.startsWith(path));
  }, [pathname]);

  useEffect(() => {
    if (!user) return; // No user? Let auth guards handle it

    const shouldRedirect = !hasActiveSubscription && !isAllowedPath;
    
    if (shouldRedirect) {
      navigate('/subscriptions/upgrade', { 
        replace: true,
        state: { from: pathname }
      });
    }
  }, [user, hasActiveSubscription, isAllowedPath, pathname, navigate]);

  // Grant access if either:
  // 1. User has active subscriptions, OR
  // 2. Current path is explicitly allowed
  const shouldRenderOutlet = hasActiveSubscription || isAllowedPath;

  return shouldRenderOutlet ? <Outlet /> : null;
}
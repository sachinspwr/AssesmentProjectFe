// components/HydrationProvider.tsx
import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserResponseDTO } from '@dto/response';
import { tokenService } from '@services/token.service';
import { mapper } from 'mapper';
import { User} from 'models';
import { accountApiSlice, setUser, setUserSubscriptions } from 'store/slices/account.slice';
import { accountSubscriptionApiSlice } from 'store/slices/account-subscription.slice';
import { useAppDispatch } from 'store/store';
import { VLoader } from '@components/molecules/index';
import { AccountSubscriptionResponseDTO } from '@dto/response/account/account-subscription-response.dto';
import { AccountSubscription } from 'models/account/account-subscription.model';

interface HydrationProviderProps {
  redirectOptions?: {
    toRoute?: '/dashboard';
  };
}

export function HydrationProvider({ redirectOptions }: HydrationProviderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const initialLoad = useRef(true);

  useEffect(() => {
    const bootstrapApp = async () => {
      
      
      try {
        const payload = tokenService.getTokenPayload();
        if (!payload?.id) {
          throw new Error('Authentication required');
        }

        // Parallel data fetching
        const [userProfile, subscriptions] = await Promise.all([
          dispatch(accountApiSlice.endpoints.loadProfile.initiate(payload.id)).unwrap(),
          dispatch(
            accountSubscriptionApiSlice.endpoints.fetchAccountSubscriptions.initiate(payload.id)
          ).unwrap().catch(err => {
            if (err?.status === 404) return [];
            throw err;
          })
        ]);

        // Data mapping
        const user = mapper.map(userProfile, UserResponseDTO, User);
        const userSubscriptions = mapper.mapArray(
          subscriptions,
          AccountSubscriptionResponseDTO,
          AccountSubscription
        );

        // Store updates
        dispatch(setUser({ ...user }));
        dispatch(setUserSubscriptions(JSON.parse(JSON.stringify(userSubscriptions))));

        setStatus('ready');

        if (redirectOptions?.toRoute && initialLoad.current) {
          initialLoad.current = false;
          navigate(redirectOptions?.toRoute ?? '/dashboard', { replace: true });
          return;
        }

      } catch (error) {
        console.error('App bootstrap failed:', error);
        setStatus('error');
        navigate('/sign-in', { replace: true });
      }
    };

    bootstrapApp();
  }, [dispatch, navigate, redirectOptions]);

  if (status === 'loading') {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <VLoader />
        <span className="mt-4 text-lg">Loading application...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <span className="text-theme-muted text-lg">Failed to initialize application</span>
        <p className="text-muted-foreground">Redirecting to login...</p>
      </div>
    );
  }

  return <Outlet />;
}


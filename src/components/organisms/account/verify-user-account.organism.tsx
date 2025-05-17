import React, { useEffect } from 'react';
import { useVerifyAccountMutation } from 'store/slices/account.slice';
import { VLoader } from '@components/molecules';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

type VerifyAccountProps = {
  className?: string;
  onComplete: OnComplete;
};

function VerifyUserAccount({ className, onComplete }: VerifyAccountProps) {
  const location = useLocation();
  const [triggerVerifyAccount, { isLoading }] = useVerifyAccountMutation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('verifier');

    if (!token) {
      toast.error('Verification token is missing.');
      onComplete({ isSuccess: false, error: new Error('No verification token found.') });
      return;
    }

    triggerVerifyAccount({ verifyAccountToken: token })
      .unwrap()
      .then(() => {
        onComplete({ isSuccess: true });
      })
      .catch((err) => {
        onComplete({ isSuccess: false, error: err });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return isLoading ? <VLoader classNames={className ?? ''} /> : null;
}

export { VerifyUserAccount };

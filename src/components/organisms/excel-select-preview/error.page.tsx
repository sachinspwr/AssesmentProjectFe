// pages/Errorpage.tsx

import { VButton } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useLocation, useNavigate } from 'react-router-dom';

type ErrorState = {
  error?: string;
  statusCode?: number;
};

export function Errorpage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ErrorState | undefined;

  const errorMessage = state?.error || 'Something went wrong. Please try again later.';
  const statusCode = state?.statusCode || 500;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-theme-primary p-4">
      <div className="max-w-md space-y-6">
        <div className="space-y-2 flex flex-col justify-center items-center">
          <VTypography as="h1" className="text-6xl !font-bold text-destructive">
            {statusCode}
          </VTypography>
          <VTypography as="h5" className="font-semibold text-theme-primary">
            Server Error
          </VTypography>
          <VTypography as="p" className="text-theme-secondary">
            {errorMessage}
          </VTypography>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <VButton
            onClick={() => navigate(-1)}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Go Back
          </VButton>
          <VButton
            onClick={() => navigate('/')}
            className="w-full sm:w-auto"
          >
            Return Home
          </VButton>
        </div>
      </div>
    </main>
  );
}

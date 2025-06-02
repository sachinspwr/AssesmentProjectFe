import { VButton } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { TbLockAccess } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';

export function ForbiddenPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const showBack = searchParams.get('showBack') === 'true';

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full p-8 text-center">
        <TbLockAccess className="h-16 w-16 mx-auto mb-8 !text-theme-negative" />
        <VTypography as="h2" className="mb-2">
          Forbidden
        </VTypography>

        <VTypography as="p" className="!mb-6">
          You do not have permission to access this resource. Please contact your administrator.
        </VTypography>

        {showBack ? (
          <VButton variant="negative" onClick={() => navigate('/')}>
            Go to Home
          </VButton>
        ) : (
          <VButton variant="negative" onClick={() => navigate('/')}>
            Contact Support
          </VButton>
        )}
      </div>
    </div>
  );
}

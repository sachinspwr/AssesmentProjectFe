import { VButton } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-theme-primary">
      <div className="max-w-md space-y-6">
        <div className="space-y-2 flex flex-col justify-center items-center">
          <VTypography as='h1' className="text-6xl !font-bold">
            404
          </VTypography>
          <VTypography as='h5' className=" font-semibold text-theme-primary">
            page Not Found
          </VTypography>
          <VTypography as='p' className="text-theme-secondary">
            Oops! The page you're looking for doesn't exist.
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

export { NotFoundPage };
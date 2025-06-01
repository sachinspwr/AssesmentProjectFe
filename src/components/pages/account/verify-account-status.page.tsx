import React from 'react';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VImage } from '@components/atoms/image/v-image.atom';
import { VBrandHeader } from '@components/organisms/layout/v-brand-title.organism';
import { useLocation } from 'react-router-dom';
import { VLink } from '@components/atoms';

function VerifyAccountStatuspage() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const error = queryParams.get('error')!;

  return (
    <div className="h-screen flex flex-col justify-center items-center lg:flex-row gap-10">
      <div className="w-full flex justify-center items-center bg-theme-highlight h-full">
        <VImage src="src\assets\svgs\verify-account.svg" className="w-2/3 h-4/5" />
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-6/12 flex flex-col justify-center items-center gap-4">
          <VBrandHeader title="Test Engine" className=" absolute top-8 right-16 text-right" />

          {error ? (
            <div className="flex flex-col justify-center items-center gap-1 ">
              <VTypography as="h3" className='font-[400]'>Account Verification Failed</VTypography>
              <VTypography as="p" color="negative">
                {error}
              </VTypography>
            </div>
          ) : (
            <div className="text-center flex flex-col justify-center items-center gap-1 ">
              <VTypography as="h3">Account Verified Successfully!</VTypography>
              <VTypography as="p" color="secondary">
                You can now log in to your new account!
              </VTypography>
            </div>
          )}

          <VLink to="/sign-in" className="no-underline">
            Go to Login
          </VLink>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccountStatuspage;

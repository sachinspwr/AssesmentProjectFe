import React from 'react';
import { VLink } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VImage } from '@components/atoms/image/v-image.atom';
import { VBrandHeader } from '@components/organisms/layout/v-brand-title.organism';

function ResetPasswordSuccesspage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center lg:flex-row gap-10">
      <div className="w-full flex justify-center items-center bg-theme-highlight h-full">
        <VImage src="src/assets/svgs/reset-password.svg" className="max-w-full h-auto" />
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-5/12 flex flex-col justify-center items-center gap-4">
          <VBrandHeader title="Test Engine" className=" absolute top-8 right-16 text-right" />

          <div className="flex flex-col justify-center items-center gap-1 ">
            <VTypography as="h3" className='font-[400]'>
              Password Reset Successfully!
            </VTypography>
            <VTypography as="p" color="secondary">
              You can now login with your new password
            </VTypography>
          </div>

          <VLink to='/sign-in'className="no-underline">
            Go to Login
          </VLink>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordSuccesspage;

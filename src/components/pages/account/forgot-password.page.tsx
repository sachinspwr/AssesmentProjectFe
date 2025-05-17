import React from 'react';
import { Image } from '@components/atoms';
import { ForgotPasswordForm } from '@components/organisms';
import { VLink } from '@components/atoms/link/v-link.atom';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VBrandHeader } from '@components/organisms/layout/v-brand-title.organism';

function ForgotPasswordPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center lg:flex-row gap-10">
      <div className="w-full flex justify-center items-center bg-theme-highlight h-full">
        <Image src="src/assets/svgs/forgot-password.svg" className="max-w-full h-auto" />
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-3/6 flex flex-col justify-center items-center gap-5">
          <VBrandHeader title="Test Engine" className=" absolute top-8 right-16 text-right" />

          <div className="w-full flex flex-col gap-2">
            <VTypography as="h3">Forgot Password?</VTypography>
            <VTypography as="p" color="secondary">
              No worrries, we will send you reset instructions
            </VTypography>
          </div>

          <ForgotPasswordForm />

          <div className="flex gap-2 justify-center items-center text-theme-secondary">
            <VLink to="/sign-in" className="no-underline">
              Back to login
            </VLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ForgotPasswordPage };

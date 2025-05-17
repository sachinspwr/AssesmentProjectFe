import React from 'react';
import { Image, VButton } from '@components/atoms';
import { VLink } from '@components/atoms/link/v-link.atom';
import { SignUpForm } from '@components/organisms';
import { VBrandHeader } from '@components/organisms/layout/v-brand-title.organism';
import { VTypography } from '@components/molecules/typography/v-typography.mol';

function RegisterPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center lg:flex-row gap-10">
      <div className="w-full flex justify-center items-center bg-theme-highlight h-full">
        <Image src="src/assets/svgs/register.svg" className="max-w-full h-auto" />
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-3/6 flex flex-col justify-center items-center gap-4">
          <VBrandHeader title="Test Engine" className="absolute top-8 right-16 text-right" />

          <div className="w-full">
            <VTypography as="p" color="secondary" className="text-lg">
              Welcome!
            </VTypography>
            <VTypography as="h2" color="brand">
              Create a New Account
            </VTypography>
          </div>

          <VButton>Sign up with Gmail</VButton>

          <div className="w-full inline-flex h-2/5 items-center justify-center">
            <hr className="w-6/12 border border-y-1 bg-skin-theme-invert" />
            <div className="px-6 bg-skin-theme">or </div>
            <hr className="w-6/12 border border-y-1 bg-skin-theme-invert" />
          </div>

          <SignUpForm />

          <div className="flex gap-2 justify-center items-center">
            Already have an account?
            <VLink to="/sign-in" className="no-underline">
              Click to Login
            </VLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export { RegisterPage };

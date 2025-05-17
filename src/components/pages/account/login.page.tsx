import React from 'react';
import { LoginForm } from '@components/organisms';
import { VLink } from '@components/atoms/link/v-link.atom';
import { VImage } from '@components/atoms/image/v-image.atom';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VBrandHeader } from '@components/organisms/layout/v-brand-title.organism';
import { LoginWithGoogle } from '@components/organisms/auth';

function LoginPage() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center lg:flex-row gap-10">
        <div className="w-full flex justify-center items-center bg-theme-highlight h-full">
          <VImage src="src/assets/svgs/login.svg" className="max-w-full h-auto" />
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-3/6 flex flex-col justify-center items-center gap-5">
            <VBrandHeader title="Test Engine" className="absolute top-8 right-16 text-right" />

            <div className="w-full">
              <VTypography as="p" color="secondary" className="text-lg">
                Welcome Back!
              </VTypography>
              <VTypography as="h2" color="brand">
                Login to get started
              </VTypography>
            </div>

            <LoginWithGoogle />

            <div className="w-full inline-flex h-2/5 items-center justify-center">
              <hr className="w-6/12 border border-y-1 bg-skin-theme-invert" />
              <div className="px-6 bg-skin-theme">or </div>
              <hr className="w-6/12 border border-y-1 bg-skin-theme-invert" />
            </div>

            <LoginForm />

            <div className="flex gap-2 justify-center items-center text-theme-secondary">
              Don't have an account?
              <VLink to="/sign-up" className="no-underline ">
                Create Account
              </VLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { LoginPage };

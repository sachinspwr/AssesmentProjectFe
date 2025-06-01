import React from 'react';
import {  VButton, VImage } from '@components/atoms';
import { VBrandHeader } from '@components/organisms/layout/v-brand-title.organism';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useNavigate } from 'react-router-dom';

function RegisterUserSuccesspage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col lg:flex-row justify-center items-center gap-10">
      {/* Left Section - Image */}
      <div className="w-full h-full flex justify-center items-center bg-theme-highlight">
        <VImage src="src/assets/svgs/register.svg" className="max-w-full h-auto" alt="Registration Success" />
      </div>

      {/* Right Section - Message */}
      <div className="w-full flex justify-center items-center">
        <div className="w-8/12 flex flex-col justify-center items-center gap-4">
          <VBrandHeader title="Test Engine" className="absolute top-8 right-16 text-right" />

          <div className="text-center flex flex-col justify-center items-center gap-1">
            <VTypography as="h3" className='font-[400]'>Registration Successful!</VTypography>
            <VTypography as="p" color="secondary">
              A verification email has been sent to your inbox. Please check your email to activate your account and get started!
            </VTypography>
          </div>

          <VButton onClick={() => navigate('/sign-in')} className="!w-4/12">
            Go to Login
          </VButton>
          
        </div>
      </div>
    </div>
  );
}

export default RegisterUserSuccesspage;

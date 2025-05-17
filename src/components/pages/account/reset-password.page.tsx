import React from 'react';
import { Image } from '@components/atoms';
import { ResetPasswordForm } from '@components/organisms';
import { VLink } from '@components/atoms/link/v-link.atom';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VBrandHeader } from '@components/organisms/layout/v-brand-title.organism';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ResetPasswordPage() {   
  const navigate = useNavigate();
  
  const handleComplete: OnComplete = (result) => {
    if (!result.isSuccess) {
      toast.error(result.error.message);
    } else {
      navigate('/reset-password-success')
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center lg:flex-row gap-10">
      <div className="w-full flex justify-center items-center bg-theme-highlight h-full">
        <Image src="src/assets/svgs/reset-password.svg" className="max-w-full h-auto" />
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-3/6 flex flex-col justify-center items-center gap-5">
          <VBrandHeader title="Test Engine" className=" absolute top-8 right-16 text-right" />

          <div className="w-full">
            <VTypography as="h3">Setup New Password</VTypography>
          </div>

          <ResetPasswordForm onComplete={handleComplete}/>

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

export { ResetPasswordPage };

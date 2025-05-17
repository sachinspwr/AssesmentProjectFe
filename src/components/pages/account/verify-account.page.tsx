import React from 'react';
import { VerifyUserAccount } from '@components/organisms';
import { useNavigate } from 'react-router-dom';

function VerifyAccountPage() {
  const navigate = useNavigate();
  
  const handleComplete: OnComplete = (result) => {
    if (!result.isSuccess) {
      navigate(`/verify-account-status?error=${result.error.message}`)
    } else {
      navigate('/verify-account-status')
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-skin-theme">
      <VerifyUserAccount onComplete={handleComplete}/>
    </div>
  );
}

export default VerifyAccountPage;

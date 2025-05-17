import { tokenService } from '@services/token.service';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    tokenService.clearToken();
    navigate('/sign-in');
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="font-semibold tracking-wide">Logging out...</p>
    </div>
  );
}

export { LogoutPage };

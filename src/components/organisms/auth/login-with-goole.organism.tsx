import { VButton } from '@components/atoms';
import { StorageKeys } from '@utils/index';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// components/GoogleLoginButton.tsx
function LoginWithGoogle() {
  const navigate = useNavigate();

  const openGooglePopup = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/google?from=popup`,
      'GoogleAuth',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        // Handle successful auth
        localStorage.setItem(StorageKeys.TOKEN, event.data.token);
        navigate('/bootstrap');
      } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
        // Handle errors
        toast('Auth failed:', event.data.error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  return <VButton onClick={openGooglePopup}>Login with Gmail</VButton>;
}

export { LoginWithGoogle };

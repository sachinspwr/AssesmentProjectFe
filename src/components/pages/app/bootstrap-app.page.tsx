import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function BootstrapAppPage() {
  const navigate = useNavigate();

  /*todo check permissions and then show either app launhcer
    or directly pp if it has only one app permission */
  useEffect(() => {
    navigate('/apps');
  }, [navigate]);

  
  return null;
}



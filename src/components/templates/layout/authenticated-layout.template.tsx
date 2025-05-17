import { Outlet, useNavigate } from 'react-router-dom';
import { tokenService } from '@services/token.service';

function AuthenticatedLayout() {
  const navigate = useNavigate();
  // Check token existence and validity
  const isValidToken = tokenService.isTokenValid();

  if (!isValidToken) {
    navigate('/sign-in')
  }

  return (
    <div className="relative bg-theme-default">
      <div className="transition-all duration-300">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export { AuthenticatedLayout };

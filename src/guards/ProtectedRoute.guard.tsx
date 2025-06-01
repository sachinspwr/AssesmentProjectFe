import { Permissions } from '@utils/enums';
import { Navigate } from 'react-router-dom';
import { currentUserPermissionNames } from 'store/slices/account.slice';
import { useAppSelector } from 'store/store';

type ProtectedRouteProps = {
  required: string | string[];
  children: JSX.Element;
};
const ProtectedRoute = ({ required, children }: ProtectedRouteProps) => {
  const userPermissions = useAppSelector(currentUserPermissionNames);
  const requiredPermissions = Array.isArray(required) ? required : [required];
  const isAllowed = requiredPermissions.every((perm) => userPermissions?.includes(perm));

  if (!isAllowed) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;

import { currentUserPermissionNames } from 'store/slices/account.slice';
import { useAppSelector } from 'store/store';

type PermissionGateProps = {
  required: string | string[];
  children: React.ReactNode;
};

export const PermissionGate = ({ required, children }: PermissionGateProps) => {
  const userPermissions = useAppSelector(currentUserPermissionNames) ?? [];
  const requiredPermissions = Array.isArray(required) ? required : [required];
  const isAllowed = requiredPermissions.every((p) => userPermissions?.includes(p));
  return isAllowed ? <>{children}</> : null;
};

//   if (hasPermission(currentUser.permissions, Permissions.USER_CREATE)) {
//     // Show Create User Button
//   }

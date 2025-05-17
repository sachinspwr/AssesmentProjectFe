// hooks/useLoggedInUser.ts
import { useAppSelector } from 'store/store';
import { selectCurrentUser } from 'store/slices/account.slice';

const useLoggedInUser = () => {
  return useAppSelector(selectCurrentUser);
};

export { useLoggedInUser };
// hooks/useSidebar.ts
import { useEffect, useState } from 'react';
import { setIsSidebarVisible } from 'store/slices/ui.slice';
import { useAppDispatch } from 'store/store';

export const useSidebar = () => {
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setIsSidebarVisible(false));
    };
  }, [dispatch]);

  return { isMounted };
};
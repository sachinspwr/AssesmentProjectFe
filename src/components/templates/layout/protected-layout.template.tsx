// src/components/templates/layout/protected-layout.tsx
import { Outlet } from 'react-router-dom';

// implement roles, permissions check
export function ProtectedLayout() {

  return <Outlet />;
}

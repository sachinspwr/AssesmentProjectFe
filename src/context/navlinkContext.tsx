// Updated NavlinkContext.ts
import React, { createContext, useContext, useState, ReactNode } from 'react';

type NavlinkContextType = {
  mainLinks: NavLink[];
  setMainLinks: (links: NavLink[]) => void;
};

const NavlinkContext = createContext<NavlinkContextType | undefined>(undefined);

export const useNavlinkContext = () => {
  const context = useContext(NavlinkContext);
  if (!context) {
    throw new Error('useNavlinkContext must be used within a NavlinkProvider');
  }
  return context;
};

export function NavlinkProvider({ children }: { children: ReactNode }) {
  const [mainLinks, setMainLinks] = useState<SidebarItem[]>([]);

  return (
    <NavlinkContext.Provider value={{ mainLinks, setMainLinks }}>
      {children}
    </NavlinkContext.Provider>
  );
}
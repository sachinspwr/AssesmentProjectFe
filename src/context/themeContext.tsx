// src/context/ThemeContext.tsx
import { Theme } from '@types';
import React, { createContext, useState, ReactNode } from 'react';

type ThemeContextProps = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'theme-dark',
  setTheme: () => {},
});

type ThemeProviderProps = {
  children: ReactNode;
};

// eslint-disable-next-line react/function-component-definition
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('theme-light');

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };

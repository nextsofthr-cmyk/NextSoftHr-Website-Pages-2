import React from 'react';
import { 
  ThemeProvider as GlobalThemeProvider, 
  useTheme as useGlobalTheme 
} from '../../homepage/context/ThemeContext';

export type Theme = 'light' | 'dark';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <GlobalThemeProvider>{children}</GlobalThemeProvider>;
};

export const useTheme = () => {
  return useGlobalTheme();
};

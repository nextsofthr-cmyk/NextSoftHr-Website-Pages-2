import React from 'react';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CurrencyProvider } from './context/CurrencyContext';

export default function RecruitmentBoardRoute() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}


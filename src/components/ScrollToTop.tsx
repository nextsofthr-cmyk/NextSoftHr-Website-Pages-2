import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { reapplyLanguageOnRouteChange } from '../utils/translationManager';

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
    reapplyLanguageOnRouteChange();
  }, [pathname]);

  return null;
};

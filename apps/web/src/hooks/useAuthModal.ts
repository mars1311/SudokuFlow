import { useState, useCallback } from 'react';

type AuthMode = 'signin' | 'signup' | 'recovery';


export const useAuthModal = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'));
    setError(null);
  }, []);


  return { mode, isLoading, error, toggleMode, setMode, setIsLoading, setError };
};
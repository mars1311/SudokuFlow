import { useState } from 'react';
import { signInWithGoogle } from '@sudoku/firebase';
import { FirebaseError } from 'firebase/app';
import useSudokuStore from '../../../store/store';

interface GoogleAuthState {
  isLoading: boolean;
  error: string | null;
}

const GOOGLE_AUTH_ERRORS: Record<string, string> = {
  'auth/popup-closed-by-user': 'Sign in was cancelled.',
  'auth/popup-blocked': 'Popup was blocked by browser. Please allow popups.',
  'auth/cancelled-popup-request': 'Sign in was cancelled.',
  'auth/account-exists-with-different-credential': 'An account already exists with this email.',
}

export const useGoogleAuthSignIn = () => {
    const { setCurrentUser } = useSudokuStore()

  const [authState, setAuthState] = useState<GoogleAuthState>({
    isLoading: false,
    error: null
  })

  const googleAuthSignIn = async () => {
    setAuthState({ isLoading: true, error: null });
    try {
      const user = await signInWithGoogle()
      setAuthState({ isLoading: false, error: null });
      setCurrentUser(user);
      return user;
    }
    catch(error) {
       const message = error instanceof FirebaseError
        ? (GOOGLE_AUTH_ERRORS[error.code] ?? 'Something went wrong. Please try again.')
        : 'Something went wrong. Please try again.';
       setAuthState({
        isLoading: false,
        error: message
      })

      return null
    }
  }
  return {...authState, googleAuthSignIn}
};

import { useState } from 'react';
import { signInWithEmail } from '@sudoku/firebase';
import { FirebaseError } from 'firebase/app';
import useSudokuStore from '../../../store/store';

interface SignInState {
  isLoading: boolean;
  error: string | null;
}

const FIREBASE_ERRORS: Record<string, string> = {
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/invalid-email': 'Please enter a valid email address.',
}

export const useSignIn = () => {
  const { setCurrentUser } = useSudokuStore()

  const [authState, setAuthState] = useState<SignInState>({
    isLoading: false,
    error: null
  })

  const signIn = async (email: string, password: string) => {
    setAuthState({ isLoading: true, error: null });
    try {
      const user = await signInWithEmail(email, password)
      setAuthState({ isLoading: false, error: null });
      setCurrentUser(user)
      return user;
    }
    catch(error) {
       const message = error instanceof FirebaseError
        ? (FIREBASE_ERRORS[error.code] ?? 'Something went wrong. Please try again.')
        : 'Something went wrong. Please try again.';
       setAuthState({
        isLoading: false,
        error: message
      })

      return null
    }
  }
  return {...authState, signIn}
};

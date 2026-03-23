import { useState, useCallback } from 'react';
import { signUpWithEmail } from '../services/authService';
import { FirebaseError } from 'firebase/app';


interface SignUpState {
  isLoading: boolean;
  error: string | null;

}

const FIREBASE_ERRORS: Record<string, string> = {
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/invalid-email': 'Please enter a valid email address.',
};

export const useSignUp = () => {
  const [authState, setAuthState] = useState<SignUpState>({
    isLoading: false,
    error: null
  })

  const signUp = async (name: string, email: string, password: string) => {
    setAuthState({ isLoading: true, error: null });
    try {
      const user = await signUpWithEmail(name, email, password)
      setAuthState({ isLoading: false, error: null });
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
  return {...authState, signUp}
};

// export const useSignUp = () => {
//   const [state, setState] = useState<SignUpState>({
//     isLoading: false,
//     error: null,
//   })

//   const signUp = useCallback(async (name: string, email: string, password: string) => {
//     setState({ isLoading: true, error: null });
//     try {
//       const user = await signUpWithEmail(name, email, password);
//       setState({ isLoading: false, error: null });
//       return user;
//     }
//     catch (err) {
//       const message = err instanceof FirebaseError
//         ? (FIREBASE_ERRORS[err.code] ?? 'Something went wrong. Please try again.')
//         : 'Something went wrong. Please try again.';

//       setState({
//         isLoading: true,
//         error: message
//       })

//       return null;
//     }
//   }, [])

//   return { ...state, signUp };
// }
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const auth = getAuth();
const googleProvider = new GoogleAuthProvider()

const signUpWithEmail = async (name: string, email: string, password: string) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  updateProfile(user, { displayName: name });
  return user;
} 

const signInWithEmail = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export const signInWithGoogle = async () => {
  const { user } = await signInWithPopup(auth, googleProvider)
  return user
}

export { signUpWithEmail, signInWithEmail };
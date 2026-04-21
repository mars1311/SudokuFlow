import { 
  getAuth,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const auth = getAuth();
const googleProvider = new GoogleAuthProvider()

const signUpWithEmail = async (name: string, email: string, password: string) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: name });
  return user;
} 

const signInWithEmail = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

const signInWithGoogle = async () => {
  const { user } = await signInWithPopup(auth, googleProvider)
  return user
}

const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email)
}

export { signUpWithEmail, signInWithEmail, signInWithGoogle, resetPassword, auth};
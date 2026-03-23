import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
const auth = getAuth();

const signUpWithEmail = async (name: string, email: string, password: string) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  updateProfile(user, { displayName: name });
} 



const signInWithEmail = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  signInWithEmailAndPassword(auth, email, password)

}

export { signUpWithEmail, signInWithEmail };
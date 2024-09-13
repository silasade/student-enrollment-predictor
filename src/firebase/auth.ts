import { error } from "console";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
async function CreateUserWithEmailAndPassword(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}
async function SignINithEmailAndPassword(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
async function SignInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  return result;
}
function siginOut() {
  return auth.signOut();
}
function PasswordReset(email: string) {
  return sendPasswordResetEmail(auth, email);
}
function PasswordChange(password: string) {
  try {
    if (auth.currentUser) return updatePassword(auth.currentUser, password);
    else throw new Error("You are not logged in!");
  } catch (error) {
    console.log(error);
  }
}
export {CreateUserWithEmailAndPassword,PasswordChange,PasswordReset,SignInWithGoogle,SignINithEmailAndPassword,siginOut}
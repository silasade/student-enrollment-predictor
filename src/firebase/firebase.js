// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq-7D4GQj8X7HaFhyIbf8Oq8TRE8GsMcY",
  authDomain: "student-enrollment-prediction.firebaseapp.com",
  projectId: "student-enrollment-prediction",
  storageBucket: "student-enrollment-prediction.appspot.com",
  messagingSenderId: "927122065244",
  appId: "1:927122065244:web:f38f90b45fd9300f192399",
  measurementId: "G-BFR9G9MFSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth= getAuth(app)

export {auth, app}
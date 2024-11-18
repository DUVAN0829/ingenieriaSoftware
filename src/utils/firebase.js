
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVTVXa5SFel6Z53fHBNUq3ywExLIwKncs",
  authDomain: "react-firebase-js-6dbf7.firebaseapp.com",
  projectId: "react-firebase-js-6dbf7",
  storageBucket: "react-firebase-js-6dbf7.appspot.com",
  messagingSenderId: "197353549064",
  appId: "1:197353549064:web:726f3347805626d1f850bd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) //Permite autenticar usuario. iniciar sesión etc.
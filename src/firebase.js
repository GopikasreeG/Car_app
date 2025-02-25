// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAtlDh9rWtVKde87rlCshAnzTETvj7uMXg",
    authDomain: "seventh-torch-427505-m3.firebaseapp.com",
    projectId: "seventh-torch-427505-m3",
    storageBucket: "seventh-torch-427505-m3.firebasestorage.app",
    messagingSenderId: "5045675710",
    appId: "1:5045675710:web:fe51f9070df01e0e13a0ef"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgF0T9likRBmNMNjkLuCR2prMUtirpxF4",
  authDomain: "munch-6303f.firebaseapp.com",
  projectId: "munch-6303f",
  storageBucket: "munch-6303f.firebasestorage.app",
  messagingSenderId: "665224414010",
  appId: "1:665224414010:web:707a2c598cffdfec238603",
  measurementId: "G-E1FED4ZF44"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
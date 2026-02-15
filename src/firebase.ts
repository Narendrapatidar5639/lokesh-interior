import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCV7y2oQqBwtqhztqt_PySJkltu2dio6iA",
  authDomain: "luckyinterior-b88f5.firebaseapp.com",
  projectId: "luckyinterior-b88f5",
  storageBucket: "luckyinterior-b88f5.firebasestorage.app",
  messagingSenderId: "18277583263",
  appId: "1:18277583263:web:fd979c8f45926f39e255aa",
  measurementId: "G-7YVKEQX2G7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
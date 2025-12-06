// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnh_A4Hbq9wqJOsTBYnq1NXZwqjyU6UUY",
  authDomain: "folio-ia.firebaseapp.com",
  projectId: "folio-ia",
  storageBucket: "folio-ia.firebasestorage.app",
  messagingSenderId: "882035516392",
  appId: "1:882035516392:web:e4ab32825b5d0be8daba5d",
  measurementId: "G-RGVTSFY4J2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
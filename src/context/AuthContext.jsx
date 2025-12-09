// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider, db } from "../Services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// ... existing code ...

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider: Initializing...");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("AuthProvider: User state changed:", currentUser);
      setUser(currentUser ?? null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = async () => {
    try {
      console.log("Starting Google Login...");
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google Auth Success:", user.uid);

      // Check if user exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      console.log("Checking Firestore for user:", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        console.log("User not found in Firestore. Creating new document...");
        // Create new user document
        const [firstName, ...lastNameParts] = (user.displayName || "").split(
          " "
        );
        const lastName = lastNameParts.join(" ");

        await setDoc(userDocRef, {
          uid: user.uid,
          firstName: firstName || "",
          lastName: lastName || "",
          displayName: user.displayName,
          email: user.email,
          createdAt: new Date(),
        });
        console.log("Firestore document created successfully for Google user.");
      } else {
        console.log("User already exists in Firestore.");
      }
      return result;
    } catch (error) {
      console.error("Google verify error", error);
      alert("Google Login/Firestore Error: " + error.message);
      throw error;
    }
  };

  const logout = () => signOut(auth);

  const value = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

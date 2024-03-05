'use client';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";

interface AuthContextValue {
  user: User | null;
  signUp: (email: string, password: string) => Promise<any>;
  logIn: (email: string, password: string) => Promise<any>;
  logOut: () => Promise<void>;
  googleSignIn: () => Promise<any>;
  setUser: (user: User | null) => void;
}

const userAuthContext = createContext<AuthContextValue>({
  user: null,
  signUp: async () => {},
  logIn: async () => {},
  logOut: async () => {},
  googleSignIn: async () => { },
  setUser: () => {},
});

export function UserAuthContextProvider({ children,initialState=null }:{
  children: React.ReactNode,initialState?:User|null}) {
  const [user, setUser] = useState<User | null>(initialState || null);

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, signUp, logIn, logOut, googleSignIn,setUser }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

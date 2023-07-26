"use client"
import { initializeApp } from "firebase/app"
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

const firebaseConfig = {
  apiKey: "AIzaSyAzMH0_Wp6CQLKxr9orrwpNhzB3JpowPyE",
  authDomain: "edh-power-auth.firebaseapp.com",
  projectId: "edh-power-auth",
  storageBucket: "edh-power-auth.appspot.com",
  messagingSenderId: "455964869403",
  appId: "1:455964869403:web:9c52da1ec545527bf789be"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function AuthProvider({ children }) {
  const [user, setUser] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      console.log("auth state changed")
      setUser(_user)
    })
  }, [])


  const handleLogin = (result) => {
    setUser(result.user)
  }

  const handleLogout = () => {
    console.log("logging out")
    setUser()
  }

  return <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
    {children}
  </AuthContext.Provider>
}
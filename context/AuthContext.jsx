"use client"
import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { createContext, useState, useEffect } from "react"

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

export function AuthProvider({ children }){
  const [user, setUser] = useState()

  useEffect(() => {
    if(!user) {
      const user = auth.currentUser;
      if(user) {
        setUser(user)
      }
    }
  }, [])

  const handleLogin = (result) => {
    setUser(result.user)
  }

  const handleLogout = () => {
    setUser()
  }

  return <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
    {children}
  </AuthContext.Provider>
}
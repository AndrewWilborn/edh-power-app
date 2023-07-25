import './globals.css'
import { Inter } from 'next/font/google'
import { useState, useEffect, createContext } from 'react'
import NavBar from './shared/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EDH Power',
  // TODO: add description
  description: '',
}

export const AuthContext = createContext(null)

export default function RootLayout({ children }) {
  const [user, setUser] = useState();

  const _setUser = (data) => {
    sessionStorage.setItem("user", JSON.stringify(data));
    setUser(data)
  }

  useEffect(() => {
    if (!user) {
      const previousUser = sessionStorage.getItem("user");
      if (previousUser) {
        setUser(JSON.parse(previousUser));
      }
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-900"}>
        <AuthContext.Provider value={{ user, setUser: _setUser }}>
          <NavBar />
          {children}
        </AuthContext.Provider>
      </body>
    </html>
  )
}

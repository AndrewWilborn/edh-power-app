import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './shared/Navbar'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EDH Power',
  // TODO: add description
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-900"}>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

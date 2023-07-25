import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './shared/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EDH Power',
  // TODO: add description
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <NavBar />
        {children}
      </body>
    </html>
  )
}

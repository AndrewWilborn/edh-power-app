"use client"

import { AuthContext } from "@/app/context/AuthContext"
import Link from "next/link"
import { useContext } from "react"
import UserDropdown from "./UserDropdown"

export default function SigninNav() {
  const {user} = useContext(AuthContext)
  return (
    <>
    {user
      ? <UserDropdown />
      : <Link href="/login" type="button" className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-orange-600 hover:bg-orange-700 focus:ring-orange-800">Sign In</Link>
    }
    </>
  )
}
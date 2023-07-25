"use client"

import { AuthContext } from "@/context/AuthContext"
import Link from "next/link"
import { useContext } from "react"

export default function SigninNav() {
  const {user} = useContext(AuthContext)
  user && console.log(user)
  return (
    <>
    {user
      ? <img src={user.photoURL} className="h-9"/>
      : <Link href="/login" type="button" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-orange-600 hover:bg-orange-700 focus:ring-orange-800">Sign In</Link>
    }
    </>
  )
}
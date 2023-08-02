"use client"

import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext, auth } from "@/context/AuthContext";
import Link from "next/link";


export default function LoginForm({ isModal }) {
  const { handleLogin } = useContext(AuthContext)

  const router = useRouter();

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        handleLogin(result)
        // use router to send user back to home page
        !isModal && router.push("/");
      })
      .catch((err) => alert(err.message));
  }

  const handleLoginWithEmailAndPassword = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        handleLogin(result)
        // use router to send user back to home page
        !isModal && router.push("/");
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-4">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Log In</h1>
      </div>
      <button onClick={handleGoogle} type="button" className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mb-4">
        <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z">
          </path>
        </svg>
        Sign in with Google
      </button>
      <div className="flex flex-col w-full">
        <h2 className="sm:text-xl text-l font-medium title-font mb-4 text-white">Use Email and Password</h2>
      </div>
      <form onSubmit={handleLoginWithEmailAndPassword}>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-full">
              <div className="relative">
                <label for="email" className="leading-7 text-sm text-gray-400">Email:</label>
                <input type="email" id="email" name="email" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label for="password" className="leading-7 text-sm text-gray-400">Password:</label>
                <input type="password" id="password" name="password" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-full">
              <input type="submit" value="Log In" className="flex justify-center w-full mx-auto text-white bg-green-500 border-0 py-2 focus:outline-none hover:bg-green-600 rounded text-md" />
            </div>
          </div>
        </div>
      </form>
      <div className="my-2">
        {isModal
          ? <button className="hover:underline"
            onClick={() => {isModal(false)}}>Create Account</button>
          : <Link className="hover:underline"
            href="/signup">Create Account</Link>
        }
      </div>
    </div>
  )
}
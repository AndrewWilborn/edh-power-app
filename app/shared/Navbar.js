import Link from "next/link"
import SigninNav from "./SigninNav"

export default function NavBar() {

  return (

    <nav className="bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <img src="/images/android-chrome-512x512.png" className="h-8 mr-3" alt="EDH Power logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">EDH Power</span>
        </Link>
        <div className="flex md:order-2">
          <SigninNav />
          {/* <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button> */}
        </div>
      </div>
    </nav>

  )
}
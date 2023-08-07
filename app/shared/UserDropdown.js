"use client"

import { useContext, useRef, useState } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import Link from "next/link";

export default function UserDropdown() {

  const ref = useRef();

  const { handleLogout } = useContext(AuthContext);

  const [showDropdown, setShowDropdown] = useState(false);

  const listener = (e) => {
    // Do nothing if clicking ref's element or descendent elements
    if (!ref?.current || ref.current.contains(e.target)) {
      return;
    }
    setShowDropdown(false);
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
  };

  const toggleDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false)
    } else {
      setShowDropdown(true)
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
    }
  }

  return (
    <div ref={ref} className="relative inline-block text-left">
      <div>
        <button onClick={toggleDropdown} type="button" className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-50 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500" id="options-menu">
          <svg width="20" fill="currentColor" height="20" className="text-gray-100" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z">
            </path>
          </svg>
        </button>
      </div>
      {showDropdown &&
        <div className="absolute right-0 w-56 mt-2 origin-top-right rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link onClick={handleLogout} href="#" className="block px-4 py-2 text-md text-gray-100 hover:text-white hover:bg-gray-600" role="menuitem">
              <span className="flex flex-col">
                <span>
                  Log Out
                </span>
              </span>
            </Link>
          </div>
        </div>
      }
    </div>

  )
}
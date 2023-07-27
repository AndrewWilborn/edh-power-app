"use client"

import { AuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useContext } from "react"

export default function rate({ params: {deckid} }) {

  const { user } = useContext(AuthContext)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ratingVal = e.target.rating.value
    try {
      const response = await fetch("http://localhost:3000/ratings", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': user.accessToken
        },
        body: JSON.stringify({
          deckId: deckid,
          ratingVal: ratingVal
        }),
      })
      //router.push('/')
    } catch (error) {
      alert(error);
    }
  }

  return (
    <section className="text-gray-400 bg-gray-900 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-4">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Rate Deck</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default range</label>
                  <input id="rating" type="range" min="0" max="1000" className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700" />
                </div>
              </div>
              <div className="p-2 w-full">
                <input type="submit" value="Submit Rating" className="flex justify-center w-full mx-auto text-white bg-green-500 border-0 py-2 focus:outline-none hover:bg-green-600 rounded text-md" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
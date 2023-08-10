"use client"
import { AuthContext } from "@/context/AuthContext"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext } from "react"

export default function editDeck({ params: { deckid } }) {

  const router = useRouter()

  const { user } = useContext(AuthContext)

  const handleDelete = async () => {
    await fetch(`https://edh-power-api.azurewebsites.net/decks/${deckid}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': user.accessToken
      }
    })
    router.push("/")
  }

  return (
    <section className="text-gray-400 bg-gray-900 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <h2>Are you sure you would like to delete this deck?</h2>
        <button onClick={() => (router.push("/"))} type="button" className="py-3">Click here to return to home</button>
        <br/>
        <button onClick={handleDelete} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete Deck</button>
      </div>
    </section>
  )
}
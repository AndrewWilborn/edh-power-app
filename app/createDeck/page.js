"use client"

import { AuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"

export default function createDeck() {

  const { user } = useContext(AuthContext)

  const router = useRouter()

  const [showPartner, setShowPartner] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const deck_name = e.target.name.value
    const decklist_url = e.target.decklist.value
    const partner = e.target.partner.value
    let commander = ""
    let commanderName = e.target.commander.value
    commanderName = commanderName.trim()
    commanderName = commanderName.replace(" ", "+")
    try {
      const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${commanderName}`);
      const data = await response.json()
      commander = data.id

      // Post deck to database
      const postResponse = await fetch("https://edh-power-api.azurewebsites.net/decks", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': user.accessToken
        },
        body: JSON.stringify({
          commander: commander,
          deck_name: deck_name,
          decklist_url: decklist_url,
          partner: partner,
          timestamp: Date.now()
        }),
      })
      router.push('/')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <section className="text-gray-400 bg-gray-900 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">Deck Creation</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-gray-400">Name:</label>
                  <input type="text" id="name" name="name" placeholder="What is your deck called" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="commander" className="leading-7 text-sm text-gray-400">Commander:</label>
                  <input type="text" id="commander" name="commander" placeholder="Add the name of your commander here" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="px-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input onChange={() => {setShowPartner(!showPartner)}} type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-300">Partner/Background?</span>
                </label>
              </div>
              {showPartner &&
                <div className="px-2 pb-2 w-full">
                  <div className="relative">
                    <label for="partner" className="leading-7 text-sm text-gray-400">Partner:</label>
                    <input type="text" id="partner" name="partner" placeholder="Add the name of your partner/background here" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
              }
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="decklist" className="leading-7 text-sm text-gray-400">Decklist URL:</label>
                  <input type="text" id="decklist" name="decklist" placeholder="A link to your decklist (optional)" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full">
                <input type="submit" value="Create Deck" className="flex justify-center w-full mx-auto text-white bg-green-500 border-0 py-2 focus:outline-none hover:bg-green-600 rounded text-md" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
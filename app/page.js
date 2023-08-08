"use client"
import { useContext, useEffect, useState } from "react"
import Card from "./shared/card"
import Link from "next/link"
import { AuthContext } from "@/context/AuthContext"
import QRCode from "./shared/QRCode"
import Hero from "./shared/Hero"

export default function Home() {

  const [decks, setDecks] = useState([])

  const { user } = useContext(AuthContext)

  useEffect(() => {
    fetch(`https://edh-power-api.azurewebsites.net/decks/${user ? user.uid : ""}`)
      .then(response => response.json())
      .then(data => {
        if(user){
          data.sort((a, b) => b.avg_rating - a.avg_rating)
        } else{
          data.sort((a, b) => b.timestamp - a.timestamp)
        }
        setDecks(data)
      })
      .catch(err => (console.error(err.message)))
  }, [setDecks, user])

  const [showQR, setShowQR] = useState(false)
  const [QRString, setQRString] = useState("")
  const handleQR = (str) => {
    setQRString(str)
    setShowQR(true)
  }

  return (
    <section className="text-gray-400 body-font bg-gray-900">
      <div className="container px-5 py-24 mx-auto">
        {!user &&
          <Hero />
        }
        <div className="flex flex-wrap w-full">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h2 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">{user ? "My Decks" : "All Decks"}</h2>
            <div className="h-1 w-20 bg-orange-500 rounded"></div>
          </div>
        </div>
        {
          user &&
          <div className="flex flex-wrap w-full">
            <Link href="/createDeck" type="button" className="mb-4 py-2 px-6 md:px-16 bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-orange-200 text-white transition mx-auto p-10 ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
              + New Deck
            </Link>
          </div>
        }

        <div className="flex flex-wrap -m-4">
          {!decks
            ? <p>Loading...</p>
            : decks.map(deck =>
              <Card deck={deck} key={deck.id} handleQR={handleQR} />
            )
          }
        </div>
      </div>
      {showQR && <QRCode url={QRString} setShowQR={setShowQR} />}
    </section>
  )
}

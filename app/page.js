"use client"
import { useContext, useEffect, useState } from "react"
import Card from "./shared/Card";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import QRCode from "./shared/QRCode";

export default function Home() {

  const [decks, setDecks] = useState([]);

  const { user } = useContext(AuthContext)

  useEffect(() => {
    fetch(`https://edh-power-api.azurewebsites.net/decks/${user ? user.uid : ""}`)
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => b.timestamp - a.timestamp)
        setDecks(data)
      })
      .catch(alert)
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
          <>
            <h2 className="text-white">Hero with CTA to signup</h2>
          </>
        }
        <div className="flex flex-wrap w-full">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">{user ? "My Decks" : "All Decks"}</h1>
            <div className="h-1 w-20 bg-orange-500 rounded"></div>
          </div>
          {
            user &&
            <Link href="/createDeck" type="button" className="mb-4 py-2 px-4 bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-orange-200 text-white transition mx-auto p-10 ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
              + New Deck
            </Link>
          }
        </div>

        <div className="flex flex-wrap -m-4">
          {!decks
            ? <p>Loading...</p>
            : decks.map(deck =>
              <Card deck={deck} key={deck.id} handleQR={handleQR}/>
            )
          }
        </div>
      </div>
      {showQR && <QRCode url={QRString} setShowQR={setShowQR}/>}
    </section>
  )
}

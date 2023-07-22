"use client"
import { useEffect, useState } from "react"
import Card from "./shared/card";

export default function Home() {

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/decks")
      .then(response => response.json())
      .then(data => {
        setDecks(data)
        console.log(data[0].deck_name)
      })
      .catch(alert)
  }, [setDecks])

  return (
    <section className="text-gray-400 body-font bg-gray-900">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-8">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">H1 Here</h1>
            <div className="h-1 w-20 bg-yellow-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-400 text-opacity-90">Possible Description here</p>
        </div>
        {!decks
          ? <p>Loading...</p>
          : decks.map(deck =>
            <Card deck={deck} />
          )

        }
      </div>
    </section>
  )
}

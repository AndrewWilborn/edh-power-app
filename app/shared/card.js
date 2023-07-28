"use client"

import { useEffect, useState } from "react"

export default function Card({ deck }) {

  console.log(deck)

  const [commander, setCommander] = useState()

  useEffect(() => {
    fetch(`http://localhost:3000/cards/${deck.commander}`)
      .then(response => response.json())
      .then(data => setCommander(data))
      .catch(alert)
  }, [setCommander])

  return (
    <div className="xl:w-1/4 md:w-1/2 p-4">
      <div className="bg-gray-800 bg-opacity-40 p-6 rounded-lg">
        <img className="w-full rounded object-cover object-center mb-6" src={commander ? commander.image_uri : ""} alt="content" />
        <h2 className="text-lg text-white font-medium title-font mb-2">{deck.deck_name}</h2>
        <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2">
          <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500" style={{ width: `${deck.avg_rating / 10}%` }}></div>
        </div>
        <h3 className="tracking-widest text-orange-400 text-xs font-medium title-font">Commander: {commander ? commander.name : ""}</h3>
      </div>
    </div>
  )
}
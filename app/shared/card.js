"use client"

import { useEffect, useState } from "react"

export default function Card({deck}) {
  
  const [commander, setCommander] = useState()

  useEffect(() => {
    fetch(`http://localhost:3000/cards/${deck.commander}`)
      .then(response => response.json())
      .then(data => setCommander(data))
      .catch(alert)
  }, [setCommander])

  return (
    <div className="flex flex-wrap -m-4">
    <div className="xl:w-1/4 md:w-1/2 p-4">
      <div className="bg-gray-800 bg-opacity-40 p-6 rounded-lg">
        <img className="h-40 rounded w-full object-cover object-center mb-6" src={commander ? commander.image_uri : ""} alt="content"/>
          <h2 className="text-lg text-white font-medium title-font mb-4">{deck.deck_name}</h2>
          <h3 className="tracking-widest text-orange-400 text-xs font-medium title-font">{commander ? commander.name : ""}</h3>
          <p className="leading-relaxed text-base">P Tag</p>
      </div>
    </div>
  </div>
  )
}
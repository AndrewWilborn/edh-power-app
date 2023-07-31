"use client"

import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/AuthContext"

export default function Card({ deck, handleQR }) {

  const { user } = useContext(AuthContext)

  const [commander, setCommander] = useState()
  const [partner, setPartner] = useState()
  useEffect(() => {
    fetch(`http://localhost:5001/cards/${deck.commander}`)
      .then(response => response.json())
      .then(data => setCommander(data))
      .catch(alert)
    deck.partner && fetch(`http://localhost:5001/cards/${deck.partner}`)
      .then(response => response.json())
      .then(data => setPartner(data))
      .catch(alert)
  }, [setCommander, setPartner])

  const [showDropdown, setShowDropdown] = useState(false)

  const toggleArt = () => {
    fetch(`http://localhost:5001/toggleArt/${deck.id}`)
      .then(response => response.json())
      .then(data => {
        fetch(`http://localhost:5001/cards/${data.newId}`)
          .then(response => response.json())
          .then(data => setCommander(data))
      })
      .catch(alert)
  }

  const h3Style = "tracking-widest text-orange-400 text-xs font-medium title-font mb-1";

  return (
    <div className="xl:w-1/3 md:w-1/2 w-full p-4">
      <div className="bg-gray-800 bg-opacity-40 rounded-lg">
        <div className={`w-full aspect-2/1 bg-cover rounded-lg flex flex-col items-end justify-between`} style={{ backgroundImage: `url('${commander ? commander.image_uri : ""})` }}>
          <button onClick={() => { toggleArt() }}>Change Art</button>
          <p className="text-xs text-gray-300 px-1">{commander && commander.artist}</p>
        </div>
        <div className="px-4 pt-1">
          <h2 className="text-lg text-white font-medium title-font mb-1">{deck.deck_name}</h2>
          <h3 className={h3Style}>Commander: {commander ? commander.name : ""}{partner && " and " + partner.name}</h3>
          <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-1">
            <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500" style={{ width: `${deck.avg_rating / 10}%` }}></div>
          </div>
          <h2>Joke Low Mid High Very High</h2>
          <h3 className={h3Style}>{deck.num_ratings} Ratings</h3>
          {deck.decklist_url && <h3 className={h3Style}>{deck.decklist_url}</h3>}
        </div>
        {showDropdown
          ? <button onClick={() => { handleQR("LONG STRING THIS STIRNG IS VERY VERY VERY LONG LONG STRING ITS LONG") }}>Button</button>
          : ((user && user.uid) == (deck && deck.owner))
          && <button onClick={() => { setShowDropdown(true) }}>Show Dropdown</button>
        }
      </div>
    </div>
  )
}
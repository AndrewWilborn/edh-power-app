"use client"

import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/AuthContext"
import Ratingbar from "./Ratingbar"

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
        <div className={`w-full aspect-2/1 bg-cover rounded-lg flex flex-col items-end justify-between`} style={{ backgroundImage: `radial-gradient(transparent, #00000088), url('${commander ? commander.image_uri : ""})` }}>
          <button onClick={() => { toggleArt() }}>
            <img src="/images/pen-svgrepo-com.svg" className="h-6 m-1" />
          </button>
          <p className="text-xs text-gray-300 px-1">{commander && commander.artist}</p>
        </div>
        <div className="px-4 pt-1">
          <h2 className="text-lg text-white font-medium title-font mb-1">{deck.deck_name}</h2>
          <h3 className={h3Style}>Commander: {commander ? commander.name : ""}{partner && " and " + partner.name}</h3>
          <Ratingbar rating={deck.avg_rating}/>
          <h3 className={h3Style}>{deck.num_ratings} Rating{deck.num_ratings !== 1 && 's'}</h3>
          {deck.decklist_url && <h3 className={h3Style}>{deck.decklist_url}</h3>}
          {
            ((user && user.uid) == (deck && deck.owner)) &&
            <button className=""
              onClick={() => { handleQR(`http://localhost:3000/rate/${deck.id}`) }}>
              Get Ratings</button>
          }
        </div>
      </div>
    </div>
  )
}
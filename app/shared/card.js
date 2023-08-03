"use client"

import { useEffect, useState } from "react"
import Ratingbar from "./Ratingbar"
import Link from "next/link"

export default function Card({ deck, handleQR }) {
  const [showDropdown, setShowDropdown] = useState(false)

  const [commander, setCommander] = useState()
  const [partner, setPartner] = useState()
  useEffect(() => {
    fetch(`https://edh-power-api.azurewebsites.net/cards/${deck.commander}`)
      .then(response => response.json())
      .then(data => setCommander(data))
      .catch(alert)
    deck.partner && fetch(`https://edh-power-api.azurewebsites.net/cards/${deck.partner}`)
      .then(response => response.json())
      .then(data => setPartner(data))
      .catch(alert)
  }, [setCommander, setPartner])

  const toggleArt = () => {
    fetch(`https://edh-power-api.azurewebsites.net/toggleArt/${deck.id}`)
      .then(response => response.json())
      .then(data => {
        fetch(`https://edh-power-api.azurewebsites.net/cards/${data.newId}`)
          .then(response => response.json())
          .then(data => setCommander(data))
      })
      .catch(alert)
  }

  const h3Style = "tracking-widest text-orange-400 text-xs font-medium title-font mb-1";

  return (
    <div className="xl:w-1/3 md:w-1/2 w-full px-4 my-2">
      <div className="bg-gray-800 bg-opacity-40 rounded-lg">
        <div className={`w-full aspect-16/7 bg-cover rounded-lg flex flex-col items-end justify-between`} style={{ backgroundImage: `radial-gradient(transparent, #00000088), url('${commander ? commander.image_uri : ""})` }}>
          <div className="flex justify-between w-full">
            {/*deck.decklist_url ? <a href={deck.decklist_url} className="h-6 m-1"><p className="text-gray-300 text-xs">View Decklist</p></a> : <div />*/}
            <button onClick={() => { toggleArt() }}>
              <img src="/images/image-regular.svg" className="h-6 m-1" />
            </button>
          </div>
          <div className="flex justify-between w-full">
            <h2 className="text-lg text-white font-medium title-font px-1">{deck.deck_name}</h2>
            <p className="h-auto mt-auto text-xs text-gray-300 px-1">{commander && commander.artist}</p>
          </div>
        </div>
        <div className="px-4 pt-1">
          <h3 className={h3Style}>Commander: {commander ? commander.name : ""}</h3>
          {partner && <h3 className={h3Style}>And: {partner.name}</h3>}
          <Ratingbar rating={deck.avg_rating} />
          <h3 className={h3Style}>{deck.num_ratings} Rating{deck.num_ratings !== 1 && 's'}</h3>
          {
            deck.owner &&
            <>
              {showDropdown &&
                <div className="flex w-full justify-around">
                  <button className="flex flex-col w-1/2"
                    onClick={() => { handleQR(`http://localhost:3000/rate/${deck.id}`) }}>
                    <img src="/images/qrcode-solid.svg" className="h-6 m-1 w-full text-center" />
                    <p className="w-full text-center">Get Ratings</p>
                  </button>
                  <Link className="flex flex-col w-1/2"
                    href={`/edit/${deck.id}`}>
                    <img src="/images/pen-svgrepo-com.svg" className="h-6 m-1 w-full text-center" />
                    <p className="w-full text-center">Edit Deck</p>
                  </Link>
                </div>
              }
              <button className="mx-auto w-full"
                onClick={() => { setShowDropdown(!showDropdown) }}>Show Dropdown</button>
            </>
          }
        </div>
      </div>
    </div>
  )
}
"use client"

import { useEffect, useState } from "react"
import { useQRCode } from "next-qrcode"

export default function Card({ deck }) {

  console.log(deck)

  const [commander, setCommander] = useState()

  const [showQR, setShowQR] = useState(false)

  const { Canvas } = useQRCode()

  useEffect(() => {
    fetch(`http://localhost:3000/cards/${deck.commander}`)
      .then(response => response.json())
      .then(data => setCommander(data))
      .catch(alert)
  }, [setCommander])

  const hanldeQR = () => {
    setShowQR(true)
  }

  const h3Style = "tracking-widest text-orange-400 text-xs font-medium title-font mb-1";

  return (
    <div className="xl:w-1/3 md:w-1/2 w-full p-4">
      <div className="bg-gray-800 bg-opacity-40 rounded-lg">
        {/* <img className="w-full rounded object-cover object-center mb-6" src={commander ? commander.image_uri : ""} alt="content" /> */}
        <div className={`w-full aspect-2/1 bg-cover rounded-lg flex flex-col items-end`} style={{ backgroundImage: `url('${commander ? commander.image_uri : ""})` }}>
          <p>Change Art</p>
          <p className="">Artist Name</p>
        </div>
        <div className="px-4 pt-1">
          <h2 className="text-lg text-white font-medium title-font mb-1">{deck.deck_name}</h2>
          <h3 className={h3Style}>Commander: {commander ? commander.name : ""}</h3>
          <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-1">
            <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500" style={{ width: `${deck.avg_rating / 10}%` }}></div>
          </div>
          <h2>Joke Low Mid High Very High</h2>
          <h3 className={h3Style}>{deck.num_ratings} Ratings</h3>
          {deck.decklist_url && <h3 className={h3Style}>{deck.decklist_url}</h3>}
        </div>
        {showQR
          ? <Canvas
            text={'https://github.com/bunlong/next-qrcode'}
            options={{
              level: 'M',
              margin: 3,
              scale: 4,
              width: 200,
              color: {
                dark: '#010599FF',
                light: '#FFBF60FF',
              },
            }} />
          : <button onClick={hanldeQR} className="btn btn-blue">Placeholder QR Code Button</button>
        }
      </div>
    </div>
  )
}
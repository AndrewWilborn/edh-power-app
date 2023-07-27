"use client"

import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function createDeck() {

  const { user } = useContext(AuthContext)

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const owner = "placeholder";
    const deck_name = e.target.name.value;
    let commander = "";
    let commanderName = e.target.commander.value;
    commanderName = commanderName.trim();
    commanderName = commanderName.replace(" ", "+");
    try {
      const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${commanderName}`);
      const data = await response.json();
      commander = data.id;

      // TODO: verify that the card is a legal commander and throw a warning if it is illegal

      // Post deck to database
      const postResponse = await fetch("http://localhost:3000/decks", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': user.accessToken
        },
        body: JSON.stringify({
          owner: owner,
          commander: commander,
          avg_rating: 7, //placeholder value
          num_ratings: 69, // placeholder value
          deck_name: deck_name,
          timestamp: Date.now()
        }),
      });
      router.push('/')
    } catch (error) {
      alert(error);
    }
  }

  return (
    <section className="text-gray-400 bg-gray-900 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-4">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Deck Creation</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-gray-400">Name:</label>
                  <input type="text" id="name" name="name" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="commander" className="leading-7 text-sm text-gray-400">Commander:</label>
                  <input type="text" id="commander" name="commander" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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
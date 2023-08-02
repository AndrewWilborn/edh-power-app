import Link from "next/link";

export default function editDeck() {

  return (
    <section className="text-gray-400 bg-gray-900 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <h2 className="text-lg">WIP</h2>
        <h3 className="text-sm">Deck Editor is currently in development</h3>
        <br/>
        <br/>
        <Link href={"/"}>Click here to return to home</Link>
      </div>
    </section>
  )
}
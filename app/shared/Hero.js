import Link from "next/link"

export default function Hero() {
  return(
    <div className="w-full">
      <h1 className="text-3xl font-semibold text-gray-100">Welcome to EDH Power</h1>
      <p className="text-gray-400">EDH Power is a website designed to help EDH players communicate how powerful their decks are on a simple and intuitive visual scale.  Players can then use the site to get and provide feedback about the power level of eachothers decks.</p>
      <Link href={"/signup"} className="mb-2 block w-1/2 mx-auto py-3 text-base font-medium text-white focus:ring-4 focus:outline-none rounded-lg text-center bg-orange-600 hover:bg-orange-700">Sign Up</Link>
      {/* <Link href={"/about"} className="block w-1/2 mx-auto py-3 text-base font-medium text-slate-900 focus:ring-4 focus:outline-none rounded-lg text-center bg-gray-100 hover:bg-gray-300">Learn More</Link> */}
    </div>
  )
}
import Link from "next/link";

export default function Hero() {
  return(
    <div className="w-full">
      <h1 className="text-3xl font-semibold text-gray-100">Welcome to EDH Power</h1>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio quae aspernatur doloribus, animi, inventore at cupiditate consectetur sit fuga, architecto modi repellat dicta nam? Numquam facere mollitia non cumque rerum.</p>
      <Link href={"/signup"} className="block w-1/3 mx-auto px-10 py-3 text-base font-medium text-white focus:ring-4 focus:outline-none rounded-lg text-center bg-orange-600 hover:bg-orange-700">Sign Up</Link>
      <Link href={"/about"} className="block w-1/3 mx-auto px-10 py-3 text-base font-medium text-slate-900 focus:ring-4 focus:outline-none rounded-lg text-center bg-gray-100 hover:bg-gray-300">Learn More</Link>
    </div>
  )
}
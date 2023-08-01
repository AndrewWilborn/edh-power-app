import RatingLabel from "./RatingLabel"
import {getColor, getGradient} from "./getColor"

export default function Ratingbar({ rating }) {
  return (
    <>
      <div className="w-full h-7 bg-gray-400 rounded-full mb-1 p-0.5">
        <div className="w-full h-6 rounded-full bg-gray-700">
          <div className="h-6 rounded-full p-1"
            style={{
              width: `${rating / 10}%`, background: `rgb${getColor(rating / 10)}`,
              background: `${getGradient(rating / 10)}`
            }}></div>
        </div>
      </div>
      <RatingLabel />
    </>
  )
}
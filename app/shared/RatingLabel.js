export default function RatingLabel() {

  const labelClasses = "font-bold w-1/3 text-center"
  
  return (
    <div className="flex">
      <h2 style={{ color: "#4ade80" }} className={labelClasses} >Low</h2>
      <h2 style={{ color: "#ffaa10" }} className={labelClasses} >Mid</h2>
      <h2 style={{ color: "#ef4444" }} className={labelClasses} >High 🌶️</h2>
    </div>
  )
}
const lowColor = [190, 242, 100]
const midColor = [255, 170, 16]
const highColor = [239, 68, 68]

// Takes a location from 1-100 and returns a string for the rgb colors
export function getColor(location){
    if(location <= 20){
      return `(${lowColor[0]}, ${lowColor[1]}, ${lowColor[2]})`
    }
    if(location > 20 && location < 50){
      let result = []
      for(let i = 0; i < 3; i++){
        result.push(lowColor[i] + ((location - 20) / 30) * (midColor[i] - lowColor[i]))
      }
      return `(${result[0]}, ${result[1]}, ${result[2]})`
    }
    if(location === 50){
      return `(${midColor[0]}, ${midColor[1]}, ${midColor[2]})`
    }
    if(location > 50 && location < 80){
      let result = []
      for(let i = 0; i < 3; i++){
        result.push(midColor[i] + ((location - 50) / 30) * (highColor[i] - midColor[i]))
      }
      return `(${result[0]}, ${result[1]}, ${result[2]})`
    }
    if(location >= 80){
      return `(${highColor[0]}, ${highColor[1]}, ${highColor[2]})`
    }
}

export function getGradient(location){
  const endColor = getColor(location)
  const lowSpot = 100*20/location
  const midSpot = 100*50/location
  const highSpot = 100*80/location
  if(location <= 20){
    return `rgb${endColor}`
  }
  if(location > 20 && location < 50){
    return `linear-gradient(90deg, rgb(${lowColor[0]}, ${lowColor[1]}, ${lowColor[2]}) ${lowSpot}%, rgb${endColor} 100%)`
  }
  if(location >= 50 && location < 80){
    return `linear-gradient(90deg, rgb(${lowColor[0]}, ${lowColor[1]}, ${lowColor[2]}) ${lowSpot}%, rgb(${midColor[0]}, ${midColor[1]}, ${midColor[2]}) ${midSpot}%, rgb${endColor} 100%)`
  }
  if(location >= 80){
    return `linear-gradient(90deg, rgb(${lowColor[0]}, ${lowColor[1]}, ${lowColor[2]}) ${lowSpot}%, rgb(${midColor[0]}, ${midColor[1]}, ${midColor[2]}) ${midSpot}%, rgb(${highColor[0]}, ${highColor[1]}, ${highColor[2]}) ${highSpot}%, rgb${endColor} 100%)`
  }
}
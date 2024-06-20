function isDateValid(dateStr) {
    return !isNaN(new Date(dateStr));
  }

  function getAlphanumericCharacters(str) {
    let length = str.replace(/[^A-Za-z0-9]/g, '').length;
    console.log("Alphanumeric Characters: " + length + " points have been added.")
    return length
}

function getTrimmedValue(items){
  let points = 0
  for(let i in items){
    let trimmedDescription = items[i].shortDescription.trim()
    if(trimmedDescription.length % 3 == 0){
      points += Math.ceil(items[i].price *.2)
    }
}
  console.log("Trimmed Value: " + points + "  points have been added.")
  return points
}

function everyTwoItems(items){
  let count = Math.floor(items.length/2) * 5
  console.log("Every Two Items: " + count + " points have been added.")
  return count
}


function isMultipleOfQuarter(num) {
  console.log("Multiple of a Quarter: 25 points have been added.")
  return num % 0.25 === 0;
}
  
  module.exports = {
    isDateValid,
    getAlphanumericCharacters,
    isMultipleOfQuarter,
    getTrimmedValue,
    everyTwoItems
  }
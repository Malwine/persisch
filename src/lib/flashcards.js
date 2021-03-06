let data;

let currentSet;
let currentCard;
let previousCardIndex;
let randomCardIndex;
let maxMemoryRate = 3;

export function restoreState(currentSetIndex, currentCardIndex, currentData) {
  data = currentData;
  currentSet = data.sets[currentSetIndex];
  currentCard = currentSet.cards[currentCardIndex];
}

export function saveProgress() {
  if(typeof window !== "undefined" && window.localStorage){
    localStorage.setItem('progress', JSON.stringify(data))
  }
}

export function resetAllData() {
  localStorage.removeItem('progress')
}

export function restoreProgress(defaultData) {
  if(typeof window !== "undefined" && window.localStorage){
    if(!localStorage.getItem('progress')) {
      localStorage.setItem('progress', JSON.stringify(defaultData));
    }
    return JSON.parse(localStorage.getItem('progress'))
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// TODO: This function will be replaced the actual answer input
function randomAnswer() {
  return Math.random() >= 0.2;
}

export function start(responseData, setIndex) {
  data = responseData
  pickSet(setIndex)
  return pickCardRandom()
}

function pickSet(index) {
  currentSet = data.sets[index]
}

function hasValidMemoryRate(card) {
  return card.memoryRate < maxMemoryRate || card.memoryRate === undefined
}

function checkPreviousAndMemoryRate(index, currentCard) {
  let cardValid = index !== previousCardIndex && hasValidMemoryRate(currentCard)
  console.log("Card: ", currentCard.front, "| Is valid:", cardValid, "| memoryRate: ", currentCard.memoryRate, "| maxMemoryRate: ", maxMemoryRate)
  return cardValid
}

export function processAnswer(answer, card, set) {
  card.memoryRate += answer
    if (answer === 1) {
      set.progressRate += 1
    }
  return checkRemainingCards(set)
}

function pickCardRandom() {
  let cards = currentSet.cards

  // Choose one random card from the set
  randomCardIndex = getRandomInt(cards.length)
  currentCard = cards[randomCardIndex]

  // Check if chosen cards is valid
  if (checkPreviousAndMemoryRate(randomCardIndex, currentCard)) {
    previousCardIndex = randomCardIndex

    // Assign memoryRate 0 if there is no memoryRate yet
    currentCard.memoryRate = currentCard.memoryRate || 0
    return randomCardIndex

    //show back and answer buttons
    //processAnswer(currentCard, cards)
  } else {
    // Pick another card if not valid
    return pickCardRandom()
  }
}

function checkRemainingCards(set) {
  const cards = set.cards;
  console.log(currentCard.front, "MemoryRate is: ", currentCard.memoryRate)

  // Reset maxMemoryRate to enable last card to be chosen
  maxMemoryRate = 3

  // Loop and find out how many cards are left
  const cardsLeft = cards.filter(hasValidMemoryRate)
  console.log("CARDS LEFT: ", cardsLeft.length)

  if (cardsLeft.length > 1) {
    // Case 0: more then one valid card is left
    return pickCardRandom()
  } else if (cardsLeft.length === 1) {
    // Case 1: exactly 1 card left
    if (cardsLeft[0] === currentCard) {
      let remainingCards = cards.filter(card => {
        return card !== currentCard
      })
      let memoryRates = remainingCards.map(card => {
        return card.memoryRate
      })
      let max = Math.min.apply(null, memoryRates)

      maxMemoryRate = max + 1
      console.log("The new maxMemoryRate is: ", maxMemoryRate)
    }
    return pickCardRandom()
  } else {
    // Case 2: no cards left, user may reset
    alert("Congrats! You learned everything!")
  }
}

export function getProgressForSet(set) {
  set.progressRate = set.progressRate || 0
  const learningRateSum = set.cards.length * 3;
	return (set.progressRate / learningRateSum) * 100;
}

export function reset(set) {
  set.cards.forEach( card => {
    card.memoryRate = 0
  })
  previousCardIndex = undefined
  maxMemoryRate = 3
  set.progressRate = 0
}
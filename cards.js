let data;

let currentSet;
let currentCard;
let previousCardIndex;
let randomCardIndex;
let maxMemoryRate = 3;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// TODO: This function will be replaced the actual answer input
function randomAnswer() {
  return Math.random() >= 0.2;
}

fetch('data.json')
  .then(response => response.json())
  .then(responseData => { data = responseData })
  .then(() => { 
    start() // TODO: get the actual set from user input and start with it
  })

function start() {
  pickSet(0)
  pickCardRandom()
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

function processAnswer(card) {
  if (randomAnswer()) {
    console.log("Did you know this?: YES")
    card.memoryRate += 1
  } else {
    console.log("Did you know this?: NO")
    card.memoryRate -= 1
  }
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
    
    processAnswer(currentCard)

    checkRemainingCards(cards)

  } else {
    // Pick another card if not valid
    pickCardRandom()
  }
}

function checkRemainingCards(cards) {
  console.log(currentCard.front, "MemoryRate is: ", currentCard.memoryRate)

  // Reset maxMemoryRate to enable last card to be chosen
  maxMemoryRate = 3

  // Loop and find out how many cards are left
  const cardsLeft = cards.filter(hasValidMemoryRate)
  console.log("CARDS LEFT: ", cardsLeft.length)

  if (cardsLeft.length > 1) {
    // Case 0: more then one valid card is left
    pickCardRandom()
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
    pickCardRandom()
  } else {
    // Case 2: no cards left, user may reset
    if (confirm("You learned everything? Do you want to reset your progress to start again?")) {
      reset(cards)
    } else {
      console.log("Ok, see you another time!")
    }
  }
}

function reset(cards) {
  currentSet.cards = cards.map(card => {
    card.memoryRate = 0
    return card
  })
  previousCardIndex = undefined
  maxMemoryRate = 3

  console.log("All reset! Let's go!")
  pickCardRandom()
}
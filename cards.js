let data;

let currentSet;
let previousCardIndex;
let maxMemoryRate = 3;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomAnswer() {
  return Math.random() >= 0.2;
}

fetch('data.json')
  .then(response => response.json())
  .then(responseData => {
    data = responseData
  })
  .then(() => { start() })

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

function checkNextCard(index, currentCard) {
  let cardValid = index !== previousCardIndex && hasValidMemoryRate(currentCard)
  console.log("Card: ", currentCard.front, "| Is valid:", cardValid, "| memoryRate: ", currentCard.memoryRate, "| maxMemoryRate: ", maxMemoryRate)
  return cardValid
}

function pickCardRandom() {
  let cards = currentSet.cards

  //generate random number in array length
  let randomCardIndex = getRandomInt(cards.length)
  let currentCard = cards[randomCardIndex]

  if (checkNextCard(randomCardIndex, currentCard)) {
    previousCardIndex = randomCardIndex

    currentCard.memoryRate = currentCard.memoryRate || 0
    if (randomAnswer()) {
      console.log("Did you know this?: YES")
      currentCard.memoryRate += 1
    } else {
      console.log("Did you know this?: NO")
      currentCard.memoryRate -= 1
    }
    console.log(currentCard.front, "MemoryRate is: ", currentCard.memoryRate)
    //reset maxMemoryRate to enable last card to be chosen
    maxMemoryRate = 3

    //loop and find out what the status is
    const cardsLeft = cards.filter(hasValidMemoryRate)
    console.log("CARDS LEFT: ", cardsLeft.length)

    // case 0: more then one valid card is left
    if (cardsLeft.length > 1) {
      pickCardRandom()
    } else if (cardsLeft.length === 1) {
      // case 1: 1 card left
      if (cardsLeft[0] === currentCard) {
        let remainingCards = cards.filter(card => {
          return card !== currentCard
        })
        let memoryRates = remainingCards.map(card => {
          return card.memoryRate
        })
        var max = Math.min.apply(null, memoryRates)

        maxMemoryRate = max + 1
        console.log("The new maxMemoryRate is: ", maxMemoryRate)
      }
      pickCardRandom()
    } else {
      // case 2: no cards left
      if (confirm("You learned everything? Do you want to reset your progress to start again?")) {
        currentSet.cards = cards.map(card => {
          card.memoryRate = 0
          return card
        })
        previousCardIndex = undefined
        maxMemoryRate = 3
        console.log("All reset! Let's go!")
        pickCardRandom()
      } else {
        console.log("Ok, see you another time!")
      }
    }

  } else {
    //loop and find out what the status is
    pickCardRandom()
  }
}
# flashcards

A basic first implementation of the flashcards app.

### What will the app do?
- Users choose a vocabulary set
- Once selected the user is presented one vocabulary pair. (front & solution)
- They can see one side.
- User can swipe/click to see the solution
- User chooses option if they knew the solution

### v1 Features
- Learn with the flashcards sample set (swipe/flash, next card, shuffled or in order)
- Simple tracking of the learning success (card will appear again)
- Lightweight
- (Mobile first design)

### Algorithm

memoryRate: the number of times that user said they know the correct answer

Picking
- Pick random card
- Check if card is not the same as previous (safe previous)
- Check if memoryRate less than 3

Show Card
- Flip and decide if you knew it 
- Yes: memoryRate + 1
- No: memoryRate - 1

Cases
- All words are known: delete memoryRate and start again
- One card left? Show other known ones in between. Put cards into buckets: Known and Unknown

### Start server

`php -S "0.0.0.0:8080"`

### Sample JSON vocabulary set

```
{
  sets: [
    {
      name: "Articles for German nouns",
      description: "Learn the correct article for German nouns."
      cards: [
        {
          front: "Schreibtisch",
          frontDescription: "desk"
          back: "der",
          backDescription: "der Schreibtisch {m}"
        },
        {
          front: "Schreibtischlampe",
          frontDescription: "desk lamp"
          back: "die",
          backDescription: "die Schreibtischlampe {f}"
        },
        {
          front: "Tastatur",
          frontDescription: "keyboard"
          back: "die",
          backDescription: "die Tastatur {f}"
        },
        {
          front: "Telefon",
          frontDescription: "telefone"
          back: "das",
          backDescription: "das Telefon {n}"
        }
      ]
    }
  ]
}
```

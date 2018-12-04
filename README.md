# flashcards

A basic first implementation of the flashcards app.

### What will the app do?
- Users choose a vocabulary set
- Once selected the user is presented one vocabulary pair. (word & solution)
- They can see one side.
- User can swipe/click to see the solution
- User chooses option if they knew the solution

### v1 Features
- Learn with the flashcards sample set (swipe/flash, next card, shuffled or in order)
- Simple tracking of the learning success (card will appear again)
- Lightweight
- (Mobile first design)

### Sample JSON vocabulary set

```
{
  sets: [
    {
      id: 1,
      setName: "Articles for German nouns",
      SetDescription: "Learn the correct article for German nouns. Office vocabulary."
      vocabulary: [
        {
          id: 1,
          word: "Schreibtisch",
          wordDescription: "desk"
          flipSide: "der",
          flipSideDescription: "der Schreibtisch {m}"
          memoryRate: 0
        },
        {
          id: 2,
          word: "Schreibtischlampe",
          wordDescription: "desk lamp"
          flipSide: "die",
          flipSideDescription: "die Schreibtischlampe {f}"
          memoryRate: 0
        },
        {
          id: 3,
          word: "Tastatur",
          wordDescription: "keyboard"
          flipSide: "die",
          flipSideDescription: "die Tastatur {f}"
          memoryRate: 0
        },
        {
          id: 4,
          word: "Telefon",
          wordDescription: "telefone"
          flipSide: "das",
          flipSideDescription: "das Telefon {n}"
          memoryRate: 0
        },
      ]
    }
  ]
}
```

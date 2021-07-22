
// Create an empty helper function called calcHandScore that returns a fixed number of points for now, e.g. 1.

  // Use JSDoc function commenting with the following attributes.
  // Description of function
  // Description of each parameter
  // Description of return value
// calcHandScore will take an array of card objects and return the number of points that the user scored for the cards in their hand.
// Abstracting calcHandScore allows us to construct the primary game logic without worrying about hand-scoring logic.
// It will also make testing hand-scoring logic easier because we can test scoring of individual hands without running the whole game.

// Code the primary game logic using calcHandScore wherever we wish to calculate the score of a given hand. This logic should include the following.
  // The user has a global number of points.
  // The user clicks a button to deal cards.
  // The user selects which cards they want to keep.
  // The game replaces the unselected cards, calculates the hand score, and updates total points.
// Lay out game controls for mobile (portrait orientation), and set the max-width CSS property of the container so the layout is still friendly on a wider screen.

// init deck as an empty array
let deck = [];

// issue first two cards to player & first card to house
let playerHand = [];
let houseHand = []; //face down, face up

let cardSuitTally = {};
let cardValueTally = {};


//generates deck of cards ordered by rank e.g. AAAA -> 2222 -> 3333
const generateDeck = () => {
  const suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  const card = ["2","3","4","5","6","7","8","9","10","Jack","Queen","King", "Ace"];

  for (i = 0; i < 52; i++) {
    var newCard = {};
    deck[i] = newCard;
    newCard.rank = i+1;
    newCard.property = card[Math.floor(i / 4)];
    newCard.value = Math.floor(i/4)+2;
    newCard.suit = suits[(i + 4) % 4];
    newCard.name = newCard.property + " of " + newCard.suit;
  }
}

//shuffle the deck
const getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

const shuffleCards = function (deck) {
  let currentIndex = 0;
  while (currentIndex < deck.length) {
    let randomIndex = getRandomIndex(deck.length);
    let randomCard = deck[randomIndex];
    let currentCard = deck[currentIndex];
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return deck;
};

generateDeck();
shuffledDeck = shuffleCards(deck)
playerHand = shuffledDeck.splice(0,5);

const tallyHandValue = (hand) => {
  for (let i=0; i<hand.length; i+=1) {
    //if we have seen the card __ before, increment its count
    let cardValue = hand[i].value;
    if (cardValue in cardValueTally){
      cardValueTally[cardValue] +=1
    }
    //else, initialise count of this card __ to 1
    else{
      cardValueTally[cardValue] =1;
    }
  }

  for(cardValue in cardValueTally){
    console.log(`There are ${cardValueTally[cardValue]} ${cardValue} in the hand`);
  }
}

const tallyHandSuit = (hand) => {
  for (let i=0; i<hand.length; i+=1) {
    //if we have seen the card __ before, increment its count
    let cardSuit = hand[i].suit;
    if (cardSuit in cardSuitTally){
      cardSuitTally[cardSuit] +=1
    }
    //else, initialise count of this card __ to 1
    else{
      cardSuitTally[cardSuit] =1;
    }
  }

  for(cardSuit in cardSuitTally){
    console.log(`There are ${cardSuitTally[cardSuit]} ${cardSuit} in the hand`);
  }
}

// swap cards takes an array of indexes of cards needing to be swapped, then swaps them with another card in the deck
const swapCards = (array,hand) =>{
  for(let i=0; i<array.length;i+=1){
    let replacementCard = deck.pop();
    hand.splice(array[i],1,replacementCard);
    return hand;
  }
}

// comparison is a helper function.
const comparison = (a,b) => {
  return a.rank-b.rank;
}

// Sorts the playerHand by order of rank
playerHand.sort(comparison)


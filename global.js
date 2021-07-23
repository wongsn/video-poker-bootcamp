<<<<<<< HEAD
// Create an empty helper function called calcHandScore that returns a fixed number of points for now, e.g. 1.

// Use JSDoc function commenting with the following attributes.
// Description of function
// Description of each parameter
// Description of return value
=======

// Create an empty helper function called calcHandScore that returns a fixed number of points for now, e.g. 1.

  // Use JSDoc function commenting with the following attributes.
  // Description of function
  // Description of each parameter
  // Description of return value
>>>>>>> 7d25d2890ffb8695a57de656c793baa20370ca5b
// calcHandScore will take an array of card objects and return the number of points that the user scored for the cards in their hand.
// Abstracting calcHandScore allows us to construct the primary game logic without worrying about hand-scoring logic.
// It will also make testing hand-scoring logic easier because we can test scoring of individual hands without running the whole game.

// Code the primary game logic using calcHandScore wherever we wish to calculate the score of a given hand. This logic should include the following.
<<<<<<< HEAD
// The user has a global number of points.
// The user clicks a button to deal cards.
// The user selects which cards they want to keep.
// The game replaces the unselected cards, calculates the hand score, and updates total points.
// Lay out game controls for mobile (portrait orientation), and set the max-width CSS property of the container so the layout is still friendly on a wider screen.

// init deck and playerhand as an empty array
let deck = [];
let playerHand = [];

// init helper arrays and objects
let cardsToBeSwapped = [];

// init eventListeners
let betUp; let betDown; let deal; let
  swap;

let cardSuitTally = {};
let cardValueTally = {};

let pot = 100;
let bet = 0;

// generates deck of cards ordered by rank e.g. 2222 -> 3333 ... -> AAAA
// each card is an object with {rank, display in unicode, name of the card, suit, card value in numbers, display name}
const generateDeck = () => {
  const suits = ['♦', '♣', '♥', '♠'];
  const unicodeSuits = ['🃂', '🃒', '🂲', '🂢', '🃃', '🃓', '🂳', '🂣', '🃄', '🃔', '🂴', '🂤', '🃅', '🃕', '🂵', '🂥', '🃆', '🃖', '🂶', '🂦', '🃇', '🃗', '🂷', '🂧', '🃈', '🃘', '🂸', '🂨', '🃉', '🃙', '🂹', '🂩', '🃊', '🃚', '🂺', '🂪', '🃋', '🃛', '🂻', '🂫', '🃍', '🃝', '🂽', '🂭', '🃎', '🃞', '🂾', '🂮', '🃁', '🃑', '🂱', '🂡'];
  const cardName = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const color = ['red', 'black'];

  for (i = 0; i < 52; i++) {
    const newCard = {};
    deck[i] = newCard;
    newCard.rank = i + 1;
    newCard.display = unicodeSuits[i];
    newCard.property = cardName[Math.floor(i / 4)];
    newCard.color = color[Math.floor(i % 2)];
    newCard.value = Math.floor(i / 4) + 2;
    newCard.suit = suits[(i + 4) % 4];
    newCard.name = `${newCard.property} of ${newCard.suit}`;
  }
};

// shuffle the deck
const getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

const shuffleCards = function (deck) {
  let currentIndex = 0;
  while (currentIndex < deck.length) {
    const randomIndex = getRandomIndex(deck.length);
    const randomCard = deck[randomIndex];
    const currentCard = deck[currentIndex];
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return deck;
};

// behaviours when cards are selected to return
const playerSelectCard = (cardIndex) => {
  // eslint-disable-next-line prefer-const
  let selectedSuit = document.getElementById(`${playerHand[cardIndex].rank}`);
  const selectedCard = document.getElementById(`c${playerHand[cardIndex].rank}`);
  selectedCard.classList.toggle('is-flipped');
  if (selectedSuit.classList.contains('selected')) {
    selectedSuit.classList.remove('selected');
    console.log('click');
    const deselectIndex = cardsToBeSwapped.indexOf(cardIndex);
    cardsToBeSwapped.splice(deselectIndex, 1);
  } else {
    selectedSuit.classList.add('selected');
    cardsToBeSwapped.push(cardIndex);
  }
};

// swap cards takes an array of indexes of cards needing to be swapped, then swaps them with another card in the deck
const swapCards = (array, hand) => {
  console.log(array, hand);

  if (array.length === 0) {
    datafield.innerHTML = calcHandScore(hand);
    endTurn();
  } else {
    for (let i = 0; i < array.length; i += 1) {
      const selectedCard = document.getElementById(`c${playerHand[array[i]].rank}`);
      selectedCard.classList.toggle('slide-out-blurred-top');

      const selectedContainer = selectedCard.parentElement;
      setTimeout(() => { selectedContainer.removeChild(selectedCard); }, 500);
      const replacementCardObject = deck.pop();
      const replacementCard = createCard(replacementCardObject, array[i]);
      setTimeout(() => {
        replacementCard.classList.toggle('slide-in-blurred-top');
        selectedContainer.appendChild(replacementCard); }, 1000);
      // eslint-disable-next-line prefer-const
      hand.splice(array[i], 1, replacementCardObject);
    }
    datafield.innerHTML = calcHandScore(hand);
    endTurn();
  }
};

const createCard = (object, index) => {
  const suit = document.createElement('div');
  suit.classList.add('suit-front', object.color);
  suit.innerHTML = object.display;
  suit.id = object.rank;

  const suitback = document.createElement('div');
  suitback.classList.add('suit-back');
  suitback.innerHTML = '&#127136';
  suitback.id = object.rank;
  suit.addEventListener('click', () => { playerSelectCard(index); });
  suitback.addEventListener('click', () => { playerSelectCard(index); });

  const card = document.createElement('div');
  card.classList.add('cards');
  card.id = `c${object.rank}`;

  card.appendChild(suit);
  card.appendChild(suitback);

  return card;
};

// main creation function to visually display the cards from hand
const createCardsFromArray = (hand) => {
  for (let j = 0; j < hand.length; j += 1) {
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cardsContainer', 'slide-in-blurred-top');
    cardsContainer.id = `cc${j}`;
    cardsContainer.appendChild(createCard(hand[j], j));
    setTimeout(() => { playingfield.appendChild(cardsContainer); }, getRandomIndex(100));
  }
};

const changeBet = (direction) => {
  if (direction == 'up') {
    if (bet < 5) {
      bet += 1;
      datafield.innerHTML = `The current pot is ${pot - bet}. The bet amount is ${bet}.`;
    }
  } else if (direction == 'down') {
    if (bet > 0) {
      bet -= 1;
      datafield.innerHTML = `The current pot is ${pot - bet}. The bet amount is ${bet}.`;
    }
  }
};

const initGame = () => {
// initialise game by generating a shuffled deck and dealing five cards to the player
  playingfield.innerHTML = '';
  playerHand = [];
  cardsToBeSwapped = [];
  deck = [];
  cardSuitTally = {};
  cardValueTally = {};

  generateDeck();
  shuffledDeck = shuffleCards(deck);
  playerHand = shuffledDeck.splice(0, 5);
  pot -= bet;

  swap.disabled = false;
  betUp.disabled = true;
  betDown.disabled = true;
  deal.disabled = true;

  createCardsFromArray(playerHand);
};

const endTurn = () => {
  swap.disabled = true;
  betUp.disabled = false;
  betDown.disabled = false;
  deal.disabled = false;
};

// async loading to ensure html is parsed before DOM selection occurs
window.addEventListener('load', () => {
  const playingfield = document.getElementById('playingfield');
  const datafield = document.getElementById('datafield');
  datafield.innerHTML = `The current pot is ${pot}. The bet amount is ${bet}.`;

  betUp = document.getElementById('betup');
  betUp.addEventListener('click', () => { changeBet('up'); });
  betDown = document.getElementById('betdown');
  betDown.addEventListener('click', () => { changeBet('down'); });

  deal = document.getElementById('deal');
  deal.addEventListener('click', initGame);

  swap = document.getElementById('swap');
  swap.addEventListener('click', () => { swapCards(cardsToBeSwapped, playerHand); });
});

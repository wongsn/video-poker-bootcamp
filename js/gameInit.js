/**
 * @member
 */

/** @module gameinit */

// init deck and playerhand as an empty array
let deck = [];
let preserveDeck = [];
let playerHand = [];
let pot = 1000;
// eslint-disable-next-line prefer-const
let bet = 0;
// eslint-disable-next-line prefer-const
let numberOfHands = 1;
let cardSuitTally = {};
let cardValueTally = {};

// init helper arrays and objects
// cardsToBeSwapped is an array of indexes of cards that were selected
let cardsToBeSwapped = [];

// init inGame variables
let highscore; let highest = pot; let playername;

/**
 * Generates a deck.
 * Generates deck of cards ordered by rank e.g. 2222 -> 3333 ... -> AAAA
 * Each card is an object with {rank, display in unicode, name of the card, suit, card value in numbers, display name}
 * @constructor
 * @return {Array} The array of card objects
 */
const generateDeck = () => {
  const suits = ['♦', '♣', '♥', '♠'];
  const unicodeSuits = ['🃂', '🃒', '🂲', '🂢', '🃃', '🃓', '🂳', '🂣', '🃄', '🃔', '🂴', '🂤', '🃅', '🃕', '🂵', '🂥', '🃆', '🃖', '🂶', '🂦', '🃇', '🃗', '🂷', '🂧', '🃈', '🃘', '🂸', '🂨', '🃉', '🃙', '🂹', '🂩', '🃊', '🃚', '🂺', '🂪', '🃋', '🃛', '🂻', '🂫', '🃍', '🃝', '🂽', '🂭', '🃎', '🃞', '🂾', '🂮', '🃁', '🃑', '🂱', '🂡'];
  const cardName = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const color = ['red', 'black'];

  for (let i = 0; i < 52; i += 1) {
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

/**
 * Random Number Generator.
 * @generator
 * @param {number} max - The max range
 * @return {number} A random number based on an input of the ceiling of range
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// takes a deck and shuffles it
const shuffleCards = (deck) => {
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

/**
 * Create Card Object.
 * Takes the card object and the index within the hand
 * @method createCard
 * @param {object} object - the card object from the hand array.
 * @param {number} index - the index of the card object in the hand array.
 * @returns {element} card - a div element to be appended subsequently.
 */

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

/**
 * Main creation function to visually display the cards from hand
 * sets a Promise to complete sending one card down before the next one
 * @async
 * @function createCardsFromArray
 * @param {Array} hand - The given player hand
 * @return {Promise<function>} Appending the individual card to the playing field
 */

const createCardsFromArray = async (hand) => {
  for (let j = 0; j < hand.length; j += 1) {
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cardsContainer', 'slide-in-blurred-top');
    cardsContainer.id = `cc${j}`;
    cardsContainer.appendChild(createCard(hand[j], j));
    await new Promise((resolve) => {
      playingfield.appendChild(cardsContainer);
      setTimeout(resolve, 500); });
  }
};

// behaviours when cards are selected by player to return
// card flipping sound, add index of cards into array cardsToBeSwapped
const playerSelectCard = (cardIndex) => {
  // eslint-disable-next-line prefer-const
  toggleSounds('flip');
  const selectedSuit = document.getElementById(`${playerHand[cardIndex].rank}`);
  const selectedCardContainer = document.getElementById(`c${playerHand[cardIndex].rank}`);
  selectedCardContainer.classList.toggle('is-flipped');
  if (selectedSuit.classList.contains('selected')) {
    selectedSuit.classList.remove('selected');
    const deselectIndex = cardsToBeSwapped.indexOf(cardIndex);
    cardsToBeSwapped.splice(deselectIndex, 1);
  } else {
    selectedSuit.classList.add('selected');
    cardsToBeSwapped.push(cardIndex);
  }
};

const endTurn = () => {
  playingfield.style.pointerEvents = 'none';
  swap.disabled = true;
  betUp.disabled = false;
  betDown.disabled = false;
  handOne.disabled = false;
  handTen.disabled = false;
  cardSuitTally = {};
  cardValueTally = {};
  if (pot > highest) {
    highest = pot;
    highscore.innerHTML = `${playername} <p>High-score: ${highest}</p>`;
  }
};

// swap cards takes an array of indexes of cards needing to be swapped, then swaps them with another card in the deck
const drawCards = (array, hand, turn) => {
  // if playing multiple turns, ensure the deck that was used for the current hand is preserved for drawing cards
  deck = preserveDeck.map((x) => x);
  shuffledDeck = shuffleCards(deck);

  if (array.length === 0) {
    const earnings = calcHandScore(hand);
    // if (earnings > 0) {
    //   toggleSounds('winning');
    // } else {
    //   toggleSounds('losing');
    // }
    pot += earnings;
    showPot.innerHTML = pot;
    data.innerHTML = `Turn ${turn + 1}. ${scoreDescription(earnings)} <br> You've earned $${earnings}.`;
    endTurn();
  } else {
    for (let i = 0; i < array.length; i += 1) {
      console.log(array, array[i], hand, hand[array[i]]);
      const selectedCardContainer = document.getElementById(`c${hand[array[i]].rank}`);

      // change animation for returning cards
      selectedCardContainer.classList.remove('slide-in-blurred-top');
      selectedCardContainer.classList.add('slide-out-blurred-top');

      const selectedContainer = selectedCardContainer.parentElement;
      setTimeout(() => { selectedContainer.removeChild(selectedCardContainer); }, 500);

      const replacementCardObject = shuffledDeck.pop();
      const replacementCard = createCard(replacementCardObject, array[i]);

      toggleSounds('flick');

      setTimeout(() => {
        replacementCard.classList.add('slide-in-blurred-top');
        selectedContainer.appendChild(replacementCard); }, 800);

      hand.splice(array[i], 1, replacementCardObject);
      const earnings = calcHandScore(hand);

      // if (earnings > 0) {
      //   toggleSounds('winning');
      // } else {
      //   toggleSounds('losing');
      // }

      pot += earnings;
      showPot.innerHTML = pot;
      data.innerHTML = `Turn ${turn + 1}. ${scoreDescription(earnings)} <br> You've earned $${earnings}.`;
      endTurn();
    }
  }
};

// sets a Promise to resolve drawCards first before going to next turn (if turns > 1)
const handIterator = async (num) => {
  for (let i = 0; i < num; i += 1) {
    await new Promise((resolve) => {
      drawCards(cardsToBeSwapped, playerHand, i);
      setTimeout(resolve, 2500);
    });
    console.log(`iterated ${i + 1} times`);
  }
  deal.disabled = false;
};

// main game initialisation function
const initGame = () => {
  if (bet == 0) {
    toggleSounds('error');
    data.innerHTML = 'Bet cannot be 0!';
  }

  else if (bet * numberOfHands > pot) {
    toggleSounds('losing');
    data.innerHTML = 'You\'ve got no money left!';
  }

  else {
    // initialise game by clearing playingfield and other variables,
    // generating a shuffled deck and dealing five cards to the player
    playingfield.innerHTML = '';
    playingfield.style.pointerEvents = 'auto';
    playerHand = []; cardsToBeSwapped = []; deck = []; cardSuitTally = {}; cardValueTally = {};

    generateDeck(); shuffledDeck = shuffleCards(deck); playerHand = shuffledDeck.splice(0, 5);
    console.log(playerHand);
    preserveDeck = shuffledDeck.map((x) => x);

    pot -= bet * numberOfHands;
    setTimeout(() => {
      showPot.innerHTML = pot;
    }, 300);

    swap.disabled = false;
    betUp.disabled = true;
    betDown.disabled = true;
    handOne.disabled = true;
    handTen.disabled = true;
    deal.disabled = true;

    createCardsFromArray(playerHand);
    toggleSounds('issue');

    data.innerHTML = 'Select cards to return, and press Draw!';
  }
};

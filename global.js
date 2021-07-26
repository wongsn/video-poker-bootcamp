const setCookie = (cname, cvalue) => {
  document.cookie = `${cname}=${cvalue};SameSite=None; Secure;`;
};

const getCookie = (cname, hname) => {
  const name = `${cname}=`;
  const score = `${hname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
// init deck and playerhand as an empty array
let deck = [];
let preserveDeck = [];
let playerHand = [];
let numberOfHands = 1;

// init helper arrays and objects
// cardsToBeSwapped is an array of indexes of cards that were selected
let cardsToBeSwapped = [];

let pot = 1000;
let bet = 0;
let playingfield;

// init eventListeners
let betUp; let betamt; let betDown; let deal; let
  swap; let handOne; let handTen; let handamt;

let data; let showPot; let highscore; let handconfig; let highest = pot; let playername;

let cardSuitTally = {};
let cardValueTally = {};

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
const getRandomIndex = (max) => Math.floor(Math.random() * max);

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

// behaviours when cards are selected to return
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

// swap cards takes an array of indexes of cards needing to be swapped, then swaps them with another card in the deck
const drawCards = (array, hand, turn) => {
  deck = preserveDeck.map((x) => x);
  shuffledDeck = shuffleCards(deck);

  if (array.length === 0) {
    const earnings = calcHandScore(hand);
    if (earnings > 0) {
      toggleSounds('winning');
    } else {
      toggleSounds('losing');
    }
    pot += earnings;
    showPot.innerHTML = pot;
    data.innerHTML = `Turn ${turn + 1}. ${scoreDescription(earnings)} <br> You've earned $${earnings}.`;
    endTurn();
  } else {
    for (let i = 0; i < array.length; i += 1) {
      console.log(array, array[i], hand, hand[array[i]]);
      const selectedCardContainer = document.getElementById(`c${hand[array[i]].rank}`);
      if (selectedCardContainer.classList.contains('again')) {
        selectedCardContainer.classList.remove('slide-in-blurred-top');
        selectedCardContainer.classList.toggle('slide-out-blurred-top');
      }

      const selectedContainer = selectedCardContainer.parentElement;
      setTimeout(() => { selectedContainer.removeChild(selectedCardContainer); }, 200);

      const replacementCardObject = shuffledDeck.pop();
      const replacementCard = createCard(replacementCardObject, array[i]);
      toggleSounds('flick');
      setTimeout(() => {
        replacementCard.classList.toggle('slide-in-blurred-top');
        replacementCard.classList.toggle('again');
        selectedContainer.appendChild(replacementCard); }, 300);
      // eslint-disable-next-line prefer-const
      hand.splice(array[i], 1, replacementCardObject);
      const earnings = calcHandScore(hand);
      if (earnings > 0) {
        toggleSounds('winning');
      } else {
        toggleSounds('losing');
      }
      pot += earnings;

      showPot.innerHTML = pot;

      data.innerHTML = `Turn ${turn + 1}. ${scoreDescription(earnings)} <br> You've earned $${earnings}.`;
      endTurn();
    }
  }
};

const handIterator = async (num) => {
  for (let i = 0; i < num; i += 1) {
    await new Promise((resolve) => {
      drawCards(cardsToBeSwapped, playerHand, i);
      setTimeout(resolve, 2000);
    });
    console.log(`iterated ${i + 1} times`);
  }
  deal.disabled = false;
};

// takes the card object and the index within the hand
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

const changeBet = (direction) => {
  toggleSounds('token');
  if (direction == 'up') {
    if (bet < 5) {
      bet += 1;
      betamt.innerHTML = `${bet}`;
    }
  } else if (direction == 'down') {
    if (bet > 0) {
      bet -= 1;
      betamt.innerHTML = `${bet}`;
    }
  }
};

const changeHand = (scale) => {
  if (scale == 'ones') {
    if (numberOfHands < 50) {
      numberOfHands += 1;
    } else {
      numberOfHands = 1;
    }
  } else if (scale == 'tens') {
    if (numberOfHands == 50) {
      numberOfHands = 1;
    } else if (numberOfHands + 10 < 50) {
      numberOfHands += 10;
    } else if (numberOfHands + 10 > 50) {
      numberOfHands = 50;
    }
  }
  handamt.innerHTML = `${numberOfHands}`;
};

const toggleSounds = (type) => {
  if (type == 'issue') {
    const issue_aud = document.querySelector('#issue5');
    issue_aud.preload = 'auto';
    issue_aud.load();
    issue_aud.loop = false;
    issue_aud.play();
  }

  if (type == 'token') {
    const token_aud = document.querySelector('#token');
    token_aud.preload = 'auto';
    token_aud.load();
    token_aud.loop = false;
    token_aud.play();
  }

  if (type == 'winning') {
    const winning_aud = document.querySelector('#winninghand');
    winning_aud.preload = 'auto';
    winning_aud.load();
    winning_aud.loop = false;
    winning_aud.play();
  }

  if (type == 'losing') {
    const losing_aud = document.querySelector('#losinghand');
    losing_aud.preload = 'auto';
    losing_aud.load();
    losing_aud.loop = false;
    losing_aud.play();
  }

  if (type == 'flick') {
    const flick_aud = document.querySelector('#flick');
    flick_aud.preload = 'auto';
    flick_aud.load();
    flick_aud.loop = false;
    flick_aud.play();
  }

  if (type == 'flip') {
    const flip_aud = document.querySelector('#flip');
    flip_aud.preload = 'auto';
    flip_aud.load();
    flip_aud.loop = false;
    flip_aud.play();
  }

  if (type == 'error') {
    const error_aud = document.querySelector('#error');
    error_aud.preload = 'auto';
    error_aud.load();
    error_aud.loop = false;
    error_aud.play();
  }

  if (type == 'hand') {
    const hand_aud = document.querySelector('#hand');
    hand_aud.preload = 'auto';
    hand_aud.load();
    hand_aud.loop = false;
    hand_aud.play();
  }
};

const initGame = () => {
  if (bet == 0) {
    toggleSounds('error');
    data.innerHTML = 'Bet cannot be 0!';
  } else {
    // initialise game by generating a shuffled deck and dealing five cards to the player
    playingfield.innerHTML = '';
    playingfield.style.pointerEvents = 'auto';
    playerHand = [];
    cardsToBeSwapped = [];
    deck = [];
    cardSuitTally = {};
    cardValueTally = {};

    generateDeck();
    shuffledDeck = shuffleCards(deck);
    playerHand = shuffledDeck.splice(0, 5);
    console.log(playerHand);
    preserveDeck = shuffledDeck.map((x) => x);
    pot -= bet * numberOfHands;
    setTimeout(() => {
      showPot.innerHTML = pot;
    }, 500);

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

// async loading to ensure html is parsed before DOM selection occurs
window.addEventListener('load', () => {
  const stars = document.getElementById('stars');
  const moon = document.getElementById('moon');
  const mountains_front = document.getElementById('mountains_front');
  const mountains_behind = document.getElementById('mountains_behind');
  const title = document.getElementById('title');
  const btn = document.getElementById('btn');

  window.addEventListener('scroll', () => {
    const value = window.scrollY;
    stars.style.left = `${value * 0.25}px`;
    moon.style.top = `${value * 1.05}px`;
    mountains_front.style.top = `${value * 0}px`;
    mountains_behind.style.top = `${value * 0.5}px`;
    title.style.margintop = `${value * 1.5}px`;
    btn.style.marginTop = `${value * 1.5}px`;
  });

  const toggleBGAudio = document.getElementById('audiobtn');
  toggleBGAudio.addEventListener('click', () => {
    const bgaudio = document.querySelector('#bgaudio');
    bgaudio.preload = 'auto';
    bgaudio.loop = true;
    if (toggleBGAudio.classList.contains('fa-volume-up')) {
      // audio
      bgaudio.play();
      toggleBGAudio.classList.remove('fa-volume-up');
      toggleBGAudio.classList.add('fa-volume-mute');
    } else {
      bgaudio.pause();
      toggleBGAudio.classList.remove('fa-volume-mute');
      toggleBGAudio.classList.add('fa-volume-up');
    }
  });

  const logoheader = document.querySelectorAll('.logo-header');
  const intro = document.querySelector('.intro');
  setTimeout(() => {
    logoheader.forEach((span, index) => {
      setTimeout(() => {
        span.classList.add('active');
      }, (index + 1) * 800);
    });

    setTimeout(() => {
      logoheader.forEach((span, index) => {
        setTimeout(() => {
          span.classList.remove('active');
          span.classList.add('fade');
        }, (index + 1) * 2000);
      });
    }, 2000);

    setTimeout(() => {
      intro.style.top = '-100vh';
    }, 2000);
  });

  playingfield = document.getElementById('playingfield');
  data = document.getElementById('data');
  data.innerHTML = 'Use the arrows to increase bet amount, then submit the bet.';

  showPot = document.getElementById('odometer');
  showPot.innerHTML = `${pot}`;

  highscore = document.getElementById('highscore');

  btn.addEventListener('click', () => {
    playername = document.getElementById('name').value;
    const displayname = document.getElementById('player');
    displayname.innerHTML = playername;
    setCookie('player', playername);
    setCookie('highscore', highest);
    // if cookie exists, set highscore accordingly
    // if not, set highest as 1000
    highscore.innerHTML = `<i class="fas fa-user"></i> ${playername} <p>High-Score: ${highest}</p>`;
  });

  handconfig = document.getElementById('handconfig');

  betUp = document.getElementById('betup');
  betUp.addEventListener('click', () => { changeBet('up'); });
  betamt = document.getElementById('betamt');
  betamt.innerHTML = 0;
  betDown = document.getElementById('betdown');
  betDown.addEventListener('click', () => { changeBet('down'); });

  handOne = document.getElementById('plusonehand');
  handOne.addEventListener('click', () => { changeHand('ones'); toggleSounds('hand'); });
  handamt = document.getElementById('handamt');
  handamt.innerHTML = 1;
  handTen = document.getElementById('plustenhand');
  handTen.addEventListener('click', () => { changeHand('tens'); toggleSounds('hand'); });

  deal = document.getElementById('deal');
  deal.addEventListener('click', initGame);

  swap = document.getElementById('swap');
  swap.addEventListener('click', () => { handIterator(numberOfHands); });
});

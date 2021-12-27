// let cardSuitTally = {};
// let cardValueTally = {};

let highlighthand;

// change scorechart to reflect current winning hand by highlighting the respective winning combination
const toggleChart = (hand = '') => {
  const chartbody = document.querySelector('#chartbody');
  chartbody.style.color = 'rgba(0,0,0,0.1)';
  try {
    highlighthand.style.color = 'rgba(0,0,0,0.1)';
  } catch (error) {
    // do nothing
  }
  if (hand !== '') {
    highlighthand = document.querySelector(`#${hand}`);
    highlighthand.style.color = 'black';
  }
};

// https://www.gamblingsites.org/casino/video-poker/pay-tables/
// earnings multiplier
const multiplier = {
  royalFlush: 250,
  straightFlush: 50,
  fourOfAKind: 25,
  fullHouse: 9,
  flush: 6,
  straight: 4,
  threeOfAKind: 3,
  twoPairs: 2,
  jacksOrBetter: 1,
};

// scoreDescription returns the message based on earnings
const scoreDescription = (earnings) => {
  if (earnings == 4000) {
    return 'ROOOYALLL FLUSHHHH!';
  }

  const mult = earnings / bet;
  switch (mult) {
    case 0:
      return 'Too bad, try again!';
    case 250:
      return 'Royal Flush!';
    case 50:
      return 'Straight Flush!';
    case 25:
      return 'Four of a kind!';
    case 9:
      return 'Full house!';
    case 6:
      return 'Flush!';
    case 4:
      return 'Straight!';
    case 3:
      return 'Three of a kind!';
    case 2:
      return 'Two pairs!';
    case 1:
      return 'Jacks or Better!';
    default:
      break;
  }
};

// tally the respective values of the hand for counting
const tallyHandValue = (hand, tally) => {
  for (let i = 0; i < hand.length; i += 1) {
    // if we have seen the card __ before, increment its count
    const cardValue = hand[i].value;
    if (cardValue in tally) {
      tally[cardValue] += 1;
    }
    // else, initialise count of this card __ to 1
    else {
      tally[cardValue] = 1;
    }
  }

  for (cardValue in tally) {
    console.log(`There are ${tally[cardValue]} ${cardValue} in the hand`);
  }
};

// tally the suits of the hands for counting
const tallyHandSuit = (hand, tally) => {
  for (let i = 0; i < hand.length; i += 1) {
    // if we have seen the card __ before, increment its count
    const cardSuit = hand[i].suit;
    if (cardSuit in tally) {
      tally[cardSuit] += 1;
    }
    // else, initialise count of this card __ to 1
    else {
      tally[cardSuit] = 1;
    }
  }

  for (cardSuit in tally) {
    console.log(`There are ${tally[cardSuit]} ${cardSuit} in the hand`);
  }
};

// checks a sorted hand to see if the values are consecutive
const checkConsecutiveValue = (hand) => {
  for (let i = 0; i < hand.length - 1; i += 1) {
    if (hand[i + 1].value - hand[i].value == 1) {
      checkConsecutiveValue(hand.slice(i + 1, hand.length));
    } else {
      return false;
    }
  }
  return true;
};

// checks a sorted hand for same suits
const checkFlush = (handTally) => {
  const noOFsameSuits = Object.values(handTally);
  if (noOFsameSuits.includes(5)) {
    return true;
  } return false;
};

// calcHandScore calculates the earnings based on bet amount and hand
const calcHandScore = (hand) => {
  // helper function to help sort the cards
  const comparison = (a, b) => a.rank - b.rank;
  // Sorts the playerHand by order of rank for calculation
  const sortedHand = hand.map((x) => x);
  sortedHand.sort(comparison);

  tallyHandSuit(sortedHand, cardSuitTally);
  tallyHandValue(sortedHand, cardValueTally);

  // consecutive value implies royal flush, straight or straight flush

  if (checkConsecutiveValue(sortedHand)) {
    if (checkFlush(cardSuitTally)) {
      if (sortedHand[sortedHand.length - 1].value == 14) {
        if (bet == 5) {
          toggleChart('royalflush');
          return 4000;
        }
        toggleChart('royalflush');
        return bet * multiplier.royalFlush;
      }
      toggleChart('straightflush');
      return bet * multiplier.straightFlush;
    }
    toggleChart('straight');
    return bet * multiplier.straight;
  }

  // if not consecutive but same suits, flush
  if (checkFlush(cardSuitTally)) {
    toggleChart('flush');
    return bet * multiplier.flush;
  }

  // check for similar values
  const noOFsameValues = Object.values(cardValueTally);
  if (noOFsameValues.includes(4)) {
    toggleChart('fourofakind');
    return bet * multiplier.fourOfAKind;
  } if (noOFsameValues.includes(3) && noOFsameValues.includes(2)) {
    toggleChart('fullhouse');
    return bet * multiplier.fullHouse;
  } if (noOFsameValues.includes(3)) {
    toggleChart('threeofakind');
    return bet * multiplier.threeOfAKind;
  } if (noOFsameValues.includes(2)) {
    const arrayofpairs = noOFsameValues.filter((pairs) => pairs == 2);
    if (arrayofpairs.length == 2) {
      toggleChart('twopairs');
      return bet * multiplier.twoPairs;
    }
    const pairsValue = Object.keys(cardValueTally).find((key) => cardValueTally[key] === 2);
    if (pairsValue >= 11) {
      toggleChart('jacksorbetter');
      return bet * multiplier.jacksOrBetter;
    }
  }
  toggleChart('');
  return 0;
};

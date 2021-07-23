<<<<<<< HEAD
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

// tally the respective values of the hand for counting
const tallyHandValue = (hand) => {
  for (let i = 0; i < hand.length; i += 1) {
    // if we have seen the card __ before, increment its count
    const cardValue = hand[i].value;
    if (cardValue in cardValueTally) {
      cardValueTally[cardValue] += 1;
    }
    // else, initialise count of this card __ to 1
    else {
      cardValueTally[cardValue] = 1;
    }
  }

  for (cardValue in cardValueTally) {
    console.log(`There are ${cardValueTally[cardValue]} ${cardValue} in the hand`);
  }
};

// tally the suits of the hands for counting
const tallyHandSuit = (hand) => {
  for (let i = 0; i < hand.length; i += 1) {
    // if we have seen the card __ before, increment its count
    const cardSuit = hand[i].suit;
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    // else, initialise count of this card __ to 1
    else {
      cardSuitTally[cardSuit] = 1;
    }
  }

  for (cardSuit in cardSuitTally) {
    console.log(`There are ${cardSuitTally[cardSuit]} ${cardSuit} in the hand`);
  }
};

// checks a sorted hand to see if the values are consecutive
const checkConsecutiveValue = (hand) => {
  for (let i = 0; i <= hand.length - 2; i += 1) {
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
  if (noOFsameSuits.includes('5')) {
    return true;
  } return false;
};

const calcHandScore = (hand) => {
  // helper function to help sort the cards
  const comparison = (a, b) => a.rank - b.rank;
  // Sorts the playerHand by order of rank for calculation
  const sortedHand = hand.sort(comparison);

  tallyHandSuit(sortedHand);
  tallyHandValue(sortedHand);

  // consecutive value implies royal flush, straight or straight flush

  if (checkConsecutiveValue(sortedHand)) {
    if (checkFlush(cardSuitTally)) {
      if (sortedHand[sortedHand.length - 1].value == 13) {
        if (bet == 5) {
          pot += 4000;
        } else {
          pot += bet * multiplier.royalFlush;
        }
        return 'Royal Flush!' + ` Pot has ${pot}`;
      }
      pot += bet * multiplier.straightFlush;
      return 'Straight Flush!' + ` Pot has ${pot}`;
    }
    pot += bet * multiplier.straight;
    return 'Straight!' + ` Pot has ${pot}`;
  }

  const noOFsameValues = Object.values(cardValueTally);
  if (noOFsameValues.includes(4)) {
    pot += bet * multiplier.fourOfAKind;
    return 'Four of a kind!' + ` Pot has ${pot}`;
  } if (noOFsameValues.includes(3) && noOFsameValues.includes(2)) {
    pot += bet * multiplier.fullHouse;
    return 'Full house!' + ` Pot has ${pot}`;
  } if (noOFsameValues.includes(3)) {
    pot += bet * multiplier.threeOfAKind;
    return 'Three of a kind!' + ` Pot has ${pot}`;
  } if (noOFsameValues.includes(2)) {
    const arrayofpairs = noOFsameValues.filter((pairs) => pairs == 2);
    if (arrayofpairs.length == 2) {
      pot += bet * multiplier.twoPairs;
      return 'Two pairs!' + ` Pot has ${pot}`;
    }
    const pairsValue = Object.keys(cardValueTally).find((key) => cardValueTally[key] === 2);
    if (pairsValue >= 11) {
      pot += bet * multiplier.jacksOrBetter;
      return 'Jacks or Better!' + ` Pot has ${pot}`;
    }
    return 'Single Pair!' + ` Pot has ${pot}`;
  }
  return 'High Card!' + ` Pot has ${pot}`;
};

const highlightWinners = () => {

};
=======
// checkFlush is alrdy defined
// '♦', '♣', '♥', '♠'

// royalFlush: 250,
const testRoyal = [
  {
    property: 'A', rank: 52, suit: '♠', value: 14,
  },
  {
    property: 'K', rank: 48, suit: '♠', value: 13,
  },
  {
    property: 'Q', rank: 44, suit: '♠', value: 12,
  },
  {
    property: 'J', rank: 40, suit: '♠', value: 11,
  },
  {
    property: '10', rank: 36, suit: '♠', value: 10,
  },
];

// straightFlush: 50,
const testStraightFlush = [
  {
    property: '2', rank: 1, suit: '♦', value: 2,
  },
  {
    property: '3', rank: 5, suit: '♦', value: 3,
  },
  {
    property: '4', rank: 9, suit: '♦', value: 4,
  },
  {
    property: '5', rank: 13, suit: '♦', value: 5,
  },
  {
    property: '6', rank: 17, suit: '♦', value: 6,
  },
];

// fourOfAKind: 25,
const testFour = [
  {
    property: '2', rank: 1, suit: '♦', value: 2,
  },
  {
    property: '2', rank: 2, suit: '♣', value: 2,
  },
  {
    property: '2', rank: 3, suit: '♥', value: 2,
  },
  {
    property: '2', rank: 4, suit: '♠', value: 2,
  },
  {
    property: '6', rank: 17, suit: '♦', value: 6,
  },
];

// fullHouse: 9,
const testFullHouse = [
  {
    property: '2', rank: 1, suit: '♦', value: 2,
  },
  {
    property: '2', rank: 2, suit: '♣', value: 2,
  },
  {
    property: '2', rank: 3, suit: '♥', value: 2,
  },
  {
    property: 'Q', rank: 41, suit: '♦', value: 12,
  },
  {
    property: 'Q', rank: 44, suit: '♠', value: 12,
  },
];

// flush: 6,
const testFlush = [
  {
    property: '2', rank: 1, suit: '♦', value: 2,
  },
  {
    property: '8', rank: 25, suit: '♦', value: 8,
  },
  {
    property: '4', rank: 9, suit: '♦', value: 4,
  },
  {
    property: '10', rank: 33, suit: '♦', value: 10,
  },
  {
    property: '6', rank: 17, suit: '♦', value: 6,
  },
];

// straight: 4,
const testStraight = [
  {
    property: '2', rank: 1, suit: '♦', value: 2,
  },
  {
    property: '3', rank: 7, suit: '♥', value: 3,
  },
  {
    property: '4', rank: 9, suit: '♦', value: 4,
  },
  {
    property: '5', rank: 15, suit: '♥', value: 5,
  },
  {
    property: '6', rank: 20, suit: '♠', value: 6,
  },
];

// threeOfAKind: 3,
const testThree = [
  {
    property: '2', rank: 1, suit: '♦', value: 2,
  },
  {
    property: '2', rank: 2, suit: '♣', value: 2,
  },
  {
    property: '2', rank: 3, suit: '♥', value: 2,
  },
  {
    property: '3', rank: 5, suit: '♦', value: 3,
  },
  {
    property: '4', rank: 9, suit: '♦', value: 4,
  },
];

// twoPairs: 2,
const testPairs = [
  {
    property: '2', rank: 2, suit: '♣', value: 2,
  },
  {
    property: '2', rank: 3, suit: '♥', value: 2,
  },
  {
    property: 'Q', rank: 41, suit: '♦', value: 12,
  },
  {
    property: 'Q', rank: 44, suit: '♠', value: 12,
  },
  {
    property: '6', rank: 17, suit: '♦', value: 6,
  },
];

// jacksOrBetter: 1,
const testJacks = [
  {
    property: '3', rank: 5, suit: '♦', value: 3,
  },
  {
    property: '2', rank: 3, suit: '♥', value: 2,
  },
  {
    property: 'Q', rank: 41, suit: '♦', value: 12,
  },
  {
    property: 'Q', rank: 44, suit: '♠', value: 12,
  },
  {
    property: '6', rank: 17, suit: '♦', value: 6,
  },
];

const testDummy = [
  {
    property: 'Q', rank: 44, suit: '♠', value: 12,
  },
  {
    property: '3', rank: 5, suit: '♦', value: 3,
  },
  {
    property: '4', rank: 9, suit: '♦', value: 4,
  },
  {
    property: '5', rank: 13, suit: '♦', value: 5,
  },
  {
    property: '6', rank: 17, suit: '♦', value: 6,
  },
];

//  cardSuitTally = {};
//  cardValueTally = {};
bet = 1;
// console.log(checkConsecutiveValue(sortedHand));// should return true
// console.log(checkFlush(cardSuitTally)); // should return true

console.log(calcHandScore(testRoyal)); // 250
cardSuitTally = {};
cardValueTally = {};
console.log(calcHandScore(testStraightFlush)); // 50
cardSuitTally = {};
cardValueTally = {};
console.log(calcHandScore(testFour)); // 25
cardSuitTally = {};
cardValueTally = {};
console.log(calcHandScore(testFullHouse)); // 9
cardSuitTally = {};
cardValueTally = {};
console.log(calcHandScore(testFlush)); // 6
cardSuitTally = {};
cardValueTally = {};
console.log(calcHandScore(testStraight)); // 4
cardSuitTally = {};
cardValueTally = {};
console.log(calcHandScore(testThree)); // 3
cardSuitTally = {};
cardValueTally = {};
console.log(calcHandScore(testPairs)); // 2
cardSuitTally = {};
cardValueTally = {};
console.log(calcHandScore(testJacks)); // 1
cardSuitTally = {};
cardValueTally = {};
console.log(calcHandScore(testDummy)); // 0
cardSuitTally = {};
cardValueTally = {};

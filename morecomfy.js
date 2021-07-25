// const royalFlushHands = '🂪 🂫 🂭 🂮 🂡';
// const straightFlushHands = '🃂 🃋 🃄 🃆 🃊';
// const fourOfAKindHands = '🂡 🂡 🂡 🂡 🃟';
// const fullHouseHands = '🃞 🂾 🂮 🃁 🃑';
// const flushHands = '🂳 🂶 🂻 🂴 🂺';
// const straightHands = '🂳 🃔 🃕 🃖 🃗';
// const threeOfAKindHands = '🃇 🃗 🂷 🃟 🃟';
// const twoPairsHands = '🂶 🂦 🃟 🃇 🃗';
// const jacksOrBetterHands = '🃟 🃋 🃛 🃟 🃟';

// const generateHandToBeEval = (hand) => {
//   const handToBeEvaluated = hand;
//   if (cardsToBeSwapped.length === 0) {
//     return handToBeEvaluated;
//   }
//   for (let i = 0; i < cardsToBeSwapped.length; I += 1) {
//     // generate the hand to be calculated (remove the cards that are selected to return)
//     handToBeEvaluated.splice(cardsToBeSwapped[i], 1);
//   }
//   return handToBeEvaluated;
// };

// const checkWinningProbability = (evalHand) => {
//   const cardsLeftInDeck = 47;
//   const comparison = (a, b) => a.rank - b.rank;
//   // Sorts the playerHand by order of rank for calculation
//   const sortedHand = evalHand.sort(comparison);

//   const evalHandTallySuit = tallyHandSuit(sortedHand);
//   const evalHandTallyValue = tallyHandValue(sortedHand);

//   const calcprobOfFlush = (handTally) => {
//     const noOFsameSuits = Object.values(handTally);
//     // if already flush, return 100%
//     if (noOFsameSuits.includes('5')) {
//       return 1;
//     }

//     if (noOFsameSuits.includes(evalHand.length)) {
//       // next card drawn has 13-evalHand.length/(cardsleftindeck before drawing)
//       // total is 20% * evalHand.length + no of cards needed to be drawn
//       for (let j = 5 - evalHand.length; j > 0; j -= 1) {
//         return (evalHand.length) * 0.2;
//       }
//     } return 0;
//   };

//   calcprobOfFlush(evalHandTallySuit);
//   calcprobOfFlush(evalHandTallySuit);
// };

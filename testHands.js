// checks a sorted hand to see if the values are consecutive
const checkConsecutiveValue = (hand) => {
  for (let i=0 ; i <= hand.length-2; i+=1){
    if(hand[i+1].value-hand[i].value==1){
      checkConsecutiveValue(hand.slice(i+1,hand.length));
    } else {
    return false;}
  }
  return true;
}

// checks a sorted hand to see if the ranks are consecutive
const checkConsecutiveRank = (hand) => {
  for (let i=0 ; i <= hand.length-2; i+=1){
    if(hand[i+1].rank-hand[i].rank==1){
      checkConsecutiveRank(hand.slice(i+1,hand.length));
    } else {
    return false;
    }
  }
  return true;
}

const checkOfAKind = (handTally) => {
 const noOFsameValues = Object.values(handTally);
 if (noOFsameValues.includes(4)){
   return 'four of a kind';
} else if (noOFsameValues.includes(3) && noOFsameValues.includes(2)){
  return 'full house';
} else if (noOFsameValues.includes(3)) {
  return 'three of a kind';
} else if (noOFsameValues.includes(2)) {
  const arrayofpairs = noOFsameValues.filter((pairs) => pairs == 2);
  if (arrayofpairs.length==2){
    return 'two pairs';
  } else {
    return 'pair';
  }
}
}

// checks a sorted hand for same suits
const checkFlush = (handTally) => {
 const noOFsameSuits = Object.values(handTally);
 if (noOFsameSuits.includes('5')){
   return true;
} return false;
}

const calcHandScore = (hand) => {
  tallyHandSuit(hand);
  tallyHandValue(hand);

  // consecutive value implies royal flush, straight or straight flush

  if(checkConsecutiveValue(hand)){
    if(checkFlush(cardSuitTally)){
      if(hand[hand.length-1].value == 13){
        console.log('Royal Flush!');
      } else {
        console.log('Straight Flush!')
      }
    } else {
      console.log('Straight!');
    }
  } else if (checkOfAKind(cardValueTally) === 'four of a kind'){
    console.log('Four of a Kind!')
  } else if (checkOfAKind(cardValueTally) === 'full house'){
    console.log('Full House!')
  } else if (checkOfAKind(cardValueTally) === 'three of a kind'){
    console.log('Three of a Kind!')
  } else if (checkOfAKind(cardValueTally) === 'two pairs'){
    console.log('Two Pairs!');
  } else if (checkOfAKind(cardValueTally) === 'pair'){
    const pairsValue = Object.keys(cardValueTally).find(key => cardValueTally[key] === 2);
    if(pairsValue >= 11){
      console.log('Jacks or Better!')
    } else {
      console.log('Single Pair!');
    }
  } else {
    console.log('High Card!');
  }

  }
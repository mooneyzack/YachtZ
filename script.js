//Click roll button


class Dice {
  holdState;
  value;

  constructor() {
    this.holdState = false;
    this.value = null;
  }
  setValue(newValue) {
    this.value = newValue;
  }

  getValue() {
    return this.value;
  }
}



// Optional class for rolling
// class Roll {
//   rollState;
//
//   constructor() {
//     this.rollState = 0;
//   }
// }

let Dice1 = new Dice();
let Dice2 = new Dice();
let Dice3 = new Dice();
let Dice4 = new Dice();
let Dice5 = new Dice();

let allDice = [Dice1, Dice2, Dice3, Dice4, Dice5];

document.addEventListener("DOMContentLoaded", initEventListeners);

function initEventListeners() {
  // roll free dice
  document.querySelector('#roll').addEventListener("click", rollFreeDice);
  // functions to hold individual dice
  document.querySelector('#dice1').addEventListener("click", function() {holdDice(Dice1)});
  document.querySelector('#dice2').addEventListener("click", function() {holdDice(Dice2)});
  document.querySelector('#dice3').addEventListener("click", function() {holdDice(Dice3)});
  document.querySelector('#dice4').addEventListener("click", function() {holdDice(Dice4)});
  document.querySelector('#dice5').addEventListener("click", function() {holdDice(Dice5)});

  // functions for calculating scores
  //document.querySelector('#ones .score').addEventListener("click", saveScore);
  for (var i = 0; i < document.querySelectorAll('.score').length; i++) {
    document.querySelectorAll('.score')[i].addEventListener("click", saveScore);
  }

  /*
  document.querySelector('#twos').addEventListener("click", function() );
  document.querySelector('').addEventListener("click", function() );
  document.querySelector('').addEventListener("click", function() );
  document.querySelector('').addEventListener("click", function() );
  document.querySelector('').addEventListener("click", function() );*/

}

//Randomize dice value 1-6
function rollFreeDice() {
  if (!Dice1.holdState) {
    Dice1.setValue(Math.floor(Math.random() * 6) + 1);
    document.querySelector('#dice1').textContent = Dice1.getValue();
    //document.querySelector('#dice1').textContent = Math.floor(Math.random() * 6) + 1;
  }
  if (!Dice2.holdState) {
    Dice2.setValue(Math.floor(Math.random() * 6) + 1);
    document.querySelector('#dice2').textContent = Dice2.getValue();
    //document.querySelector('#dice2').textContent = Math.floor(Math.random() * 6) + 1;
  }
  if (!Dice3.holdState) {
    Dice3.setValue(Math.floor(Math.random() * 6) + 1);
    document.querySelector('#dice3').textContent = Dice3.getValue();
    //document.querySelector('#dice3').textContent = Math.floor(Math.random() * 6) + 1;
  }
  if (!Dice4.holdState) {
    Dice4.setValue(Math.floor(Math.random() * 6) + 1);
    document.querySelector('#dice4').textContent = Dice4.getValue();
    //document.querySelector('#dice4').textContent = Math.floor(Math.random() * 6) + 1;
  }
  if (!Dice5.holdState) {
    Dice5.setValue(Math.floor(Math.random() * 6) + 1);
    document.querySelector('#dice5').textContent = Dice5.getValue();
    //document.querySelector('#dice5').textContent = Math.floor(Math.random() * 6) + 1;
  }
}

//Add event listener to each individual dice that calls a hold function
function holdDice(dice) {
  dice.holdState = !dice.holdState;
  if (dice.holdState) {
    event.target.classList.add("held")
  }
  else {event.target.classList.remove("held")}
}

//Add event listener to all elements that have a class of .score



//Event listener will trigger a function that assigns a score
//---stay simple - make it work badly, and then improve
//---get a score from the dice to be saved into the box

// function calcScoreSingle(numVal) {
//   let counter = 0;
//   for (let dice of allDice) {
//     if (dice.getValue() === numVal) {
//       counter++;
//     }
//   }
//   return counter * numVal;
// }

function calcScore(scoreNum) {
  let counter1 = 0;
  let counter2 = 0;
  let counter3 = 0;
  let counter4 = 0;
  let counter5 = 0;
  let counter6 = 0;

  let totVal = 0;
  for (let dice of allDice) {
    if (dice.getValue() === 1) {counter1++;}
    if (dice.getValue() === 2) {counter2++;}
    if (dice.getValue() === 3) {counter3++;}
    if (dice.getValue() === 4) {counter4++;}
    if (dice.getValue() === 5) {counter5++;}
    if (dice.getValue() === 6) {counter6++;}
    totVal = totVal + dice.getValue();
  }

  //top section/individual numbers
  if (scoreNum === 1) {return counter1;}
  if (scoreNum === 2) {return counter2 * 2;}
  if (scoreNum === 3) {return counter3 * 3;}
  if (scoreNum === 4) {return counter4 * 4;}
  if (scoreNum === 5) {return counter5 * 5;}
  if (scoreNum === 6) {return counter6 * 6;}

  //three of a kind
  if (scoreNum === 7) {
    if (counter1 >= 3 ||
        counter2 >= 3 ||
        counter3 >= 3 ||
        counter4 >= 3 ||
        counter5 >= 3 ||
        counter6 >= 3) {
      return totVal;
    }
    else {
      return 0;
    }
  }

  //four of a kind
  if (scoreNum === 8) {
    if (counter1 >= 4 ||
        counter2 >= 4 ||
        counter3 >= 4 ||
        counter4 >= 4 ||
        counter5 >= 4 ||
        counter6 >= 4) {
      return totVal;
    }
    else {
      return 0;
    }
  }

  //full house
  if (scoreNum === 9) {
    return 25;
  }

  //small straight
  if (scoreNum === 10) {
    return 30;
  }

  //large straight
  if (scoreNum === 11) {
    if (
        (counter2 === 1 && counter3 === 1 && counter4 === 1 && counter5 === 1)
        &&
        (counter1 === 1 || counter6 === 1)
    )
    {
      return 40;
    }
    else {
      return 0;
    }
  }

  //yahtzee
  if (scoreNum === 12) {
    if (counter1 === 5 ||
        counter2 === 5 ||
        counter3 === 5 ||
        counter4 === 5 ||
        counter5 === 5 ||
        counter6 === 5) {
      return 50;
    }
    else {
      return 0;
    }
  }

  //second yahtzee
  if (scoreNum === 13) {
    return 50;
  }

  //chance
  if (scoreNum === 14) {
    return totVal;
  }
}






//Start adding logic for calculating score accurately

function saveScore() {
  console.log(event.target.parentNode.id);
  type = event.target.parentNode.id;

  if (type == "ones") {event.target.textContent = calcScore(1);}
  if (type == "twos") {event.target.textContent = calcScore(2);}
  if (type == "threes") {event.target.textContent = calcScore(3);}
  if (type == "fours") {event.target.textContent = calcScore(4);}
  if (type == "fives") {event.target.textContent = calcScore(5);}
  if (type == "sixes") {event.target.textContent = calcScore(6);}

  if (type == "three-kind") {event.target.textContent = calcScore(7);}
  if (type == "four-kind") {event.target.textContent = calcScore(8);}
  if (type == "full-house") {event.target.textContent = calcScore(9);}
  if (type == "small-straight") {event.target.textContent = calcScore(10);}
  if (type == "large-straight") {event.target.textContent = calcScore(11);}
  if (type == "first-yahtzee") {event.target.textContent = calcScore(12);}
  if (type == "second-yahtzee") {event.target.textContent = calcScore(13);}
  if (type == "chance") {event.target.textContent = calcScore(14);}
}



//Refine rules for user ability to select boxes
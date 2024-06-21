let Dice1 = new Dice();
let Dice2 = new Dice();
let Dice3 = new Dice();
let Dice4 = new Dice();
let Dice5 = new Dice();

let allDice = [Dice1, Dice2, Dice3, Dice4, Dice5];

document.addEventListener("DOMContentLoaded", initEventListeners);

const diceImages = [
  "images/dice1.png",
  "images/dice2.png",
  "images/dice3.png",
  "images/dice4.png",
  "images/dice5.png",
  "images/dice6.png"
];

// dice roll sounds
const audioFiles = [
  "sounds/dice/dice1.mp3",
  "sounds/dice/dice2.mp3",
  "sounds/dice/dice3.mp3",
  "sounds/dice/dice4.mp3",
  "sounds/dice/dice5.mp3",
  "sounds/dice/dice6.mp3",
  "sounds/dice/dice7.mp3",
  "sounds/dice/dice8.mp3",
  "sounds/dice/dice9.mp3",
  "sounds/dice/dice10.mp3"
];

function initEventListeners() {

  const rollButton = document.querySelector('#roll');

  // roll free dice
  rollButton.addEventListener("click", rollActions);

  function rollActions() {
    playRandomSound(audioFiles);
    rollFreeDice();
  }

  document.addEventListener("keydown", function(event) {
    if (event.code === 'Space') {
      rollActions();
    }
  });

  // function to play random sound from list of dice sounds
  function playRandomSound(audioFiles) {
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const audio = new Audio(audioFiles[randomIndex]);
    audio.play();
  }

  // functions to hold individual dice
  document.querySelector('#dice1').addEventListener("click", function() {holdDice(Dice1)});
  document.querySelector('#dice2').addEventListener("click", function() {holdDice(Dice2)});
  document.querySelector('#dice3').addEventListener("click", function() {holdDice(Dice3)});
  document.querySelector('#dice4').addEventListener("click", function() {holdDice(Dice4)});
  document.querySelector('#dice5').addEventListener("click", function() {holdDice(Dice5)});

  // functions for saving score
  for (var i = 0; i < document.querySelectorAll('.score').length; i++) {
    document.querySelectorAll('.score')[i].addEventListener("click", saveScore);
  }

  // function to begin next turn
  // for (var i = 0; i < document.querySelectorAll('.score').length; i++) {
  //   document.querySelectorAll('.score')[i].addEventListener("click", nextTurn);
  // }

  // listener for changing


  // listener for sum of
  // document.addEventListener('click', ).

  // visual cue to show that top bonus is achieved
  // document.addEventListener("click", function(event) {
  //   if (score1 + score2 + score3 + score4 + score5 + score6 >= 63) {
  //     document.querySelector(`#top-section-bonus .bonus`).classList.add("activated");
  //   }
  // });
}

//Randomize dice value 1-6
function rollFreeDice() {
  if (!Dice1.holdState) {
    Dice1.setValue(Math.floor(Math.random() * 6) + 1);
    document.querySelector('#dice1 img').src = diceImages[Dice1.getValue() - 1];
  }
  if (!Dice2.holdState) {
    Dice2.setValue(Math.floor(Math.random() * 6) + 1);
    document.querySelector('#dice2 img').src = diceImages[Dice2.getValue() - 1];
  }
  if (!Dice3.holdState) {
    Dice3.setValue(Math.floor(Math.random() * 6) + 1);
    document.querySelector('#dice3 img').src = diceImages[Dice3.getValue() - 1];
  }
  if (!Dice4.holdState) {
    Dice4.setValue(Math.floor(Math.random() * 6) + 1);
    document.querySelector('#dice4 img').src = diceImages[Dice4.getValue() - 1];
  }
  if (!Dice5.holdState) {
    Dice5.setValue(Math.floor(Math.random() * 6) + 1);
    document.querySelector('#dice5 img').src = diceImages[Dice5.getValue() - 1];
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

function calcScore(ruleName) {
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
  if (ruleName === "ones") {return counter1;}
  if (ruleName === "twos") {return counter2 * 2;}
  if (ruleName === "threes") {return counter3 * 3;}
  if (ruleName === "fours") {return counter4 * 4;}
  if (ruleName === "fives") {return counter5 * 5;}
  if (ruleName === "sixes") {return counter6 * 6;}

  //three of a kind
  if (ruleName === "three-kind") {
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
  if (ruleName === "four-kind") {
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
  if (ruleName === "full-house") {
    if ((counter1 === 3 || counter2 === 3 || counter3 === 3 || counter4 === 3 || counter5 === 3 || counter6 === 3) &&
        (counter1 === 2 || counter2 === 2 || counter3 === 2 || counter4 === 2 || counter5 === 2 || counter6 === 2)) {
      return 25;
    }
    else {
        return 0;
      }
    }

  //small straight
  if (ruleName === "small-straight") {
    if (
      (counter3 >= 1 && counter4 >= 1)
      &&
      ((counter2 >= 1 && (counter1 >=1 || counter5 >= 1))
      ||
      ((counter5 >= 1 && counter6 >= 1 ))
      )
    ){
      return 30;
    }
    else {
      return 0;
    }
  }

  //large straight
  if (ruleName === "large-straight") {
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
  if (ruleName === "first-yahtzee") {
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
  if (ruleName === "second-yahtzee") {
    if (counter1 === 5 ||
        counter2 === 5 ||
        counter3 === 5 ||
        counter4 === 5 ||
        counter5 === 5 ||
        counter6 === 5) {
      return 100;
    }
    else {
      return 0;
    }
  }

  //chance
  if (ruleName === "chance") {
    return totVal;
  }
}

//Start adding logic for calculating score accurately

function saveScore() {
  console.log(event.target.parentNode.id);
  type = event.target.parentNode.id;
  event.target.textContent = calcScore(type);
}


// function to calculate if top section bonus will be applied
// function calculateUpperBonus() {
//   var bonus = document.querySelector('#top-section-bonus .bonus');
//   var total =
//       document.querySelector('ones').textContent +
//       document.querySelector('twos').textContent +
//       document.querySelector('threes').textContent +
//       document.querySelector('fours').textContent +
//       document.querySelector('fives').textContent +
//       document.querySelector('sixes').textContent;
//   if (total >= 63) {
//     bonus.textContent = 35;
//   } else {
//     bonus.textContent = 0;
//   }
//   document.querySelector('#top-section-total .total').textContent = total + parseInt(bonus.textContent);
// }


//Refine rules for user ability to select boxes
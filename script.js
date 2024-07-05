const displayDiv = document.getElementById('roll-display');
numscores = 0;

const ticksound = "sounds/effects/tick.mp3";
const clicksound = "sounds/effects/click.mp3";
const popsound = "sounds/effects/pop.mp3";
const whoa = "sounds/effects/whoa.mp3";




let Dice1 = new Dice();
let Dice2 = new Dice();
let Dice3 = new Dice();
let Dice4 = new Dice();
let Dice5 = new Dice();

let allDice = [Dice1, Dice2, Dice3, Dice4, Dice5];

let newSheet = new Scoresheet();   //create new game's scoresheet
newSheet.ones = 0;
newSheet.twos = 0;
newSheet.threes = 0;
newSheet.fours = 0;
newSheet.fives = 0;
newSheet.sixes = 0;
newSheet.threeOfAKind = 0;
newSheet.fourOfAKind = 0;
newSheet.fullHouse = 0;
newSheet.smallStraight = 0;
newSheet.largeStraight = 0;
newSheet.yahtzee = 0;
newSheet.chance = 0;
newSheet.setTotalTurns(0);

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

const rollButton = document.querySelector('#roll');
const newGameButton = document.querySelector('#new-game');


// initialize event listeners
function initEventListeners() {

  // new game button
  newGameButton.addEventListener("click", startNewGame);

  // roll free dice
  rollButton.addEventListener("click", rollActions, { once: true });

  function rollActions() {
    playRandomSound(audioFiles);
    rollFreeDice();
    if (Number(document.getElementById('roll-count').textContent) > 0) {
      if (Number(document.getElementById('roll-count').textContent) > 1) {
        rollButton.addEventListener("click", rollActions, {once: true});
      }
      document.getElementById('roll-count').textContent = (Number(document.getElementById('roll-count').textContent) - 1);
    }
  }

  document.addEventListener("keydown", function(event) {
    if (event.code === 'Space') {
      rollActions();
    }
  });

  // functions to hold individual dice
  document.querySelector('#dice1').addEventListener("click", function() {holdDice(Dice1)});
  document.querySelector('#dice2').addEventListener("click", function() {holdDice(Dice2)});
  document.querySelector('#dice3').addEventListener("click", function() {holdDice(Dice3)});
  document.querySelector('#dice4').addEventListener("click", function() {holdDice(Dice4)});
  document.querySelector('#dice5').addEventListener("click", function() {holdDice(Dice5)});

  //dice mouseover tick sounds
  let diceElements = document.getElementsByClassName('dice');
  Array.from(diceElements).forEach(element => {
    element.addEventListener('mouseover', playTickSound);
    element.addEventListener('click', playClickSound);
  });



  // functions for saving score
  for (var i = 0; i < document.querySelectorAll('.score').length; i++) {
    document.querySelectorAll('.score')[i].addEventListener("click", saveScore, { once: true });
    document.querySelectorAll('.score')[i].addEventListener("click", releaseDice, { once: true });
    document.querySelectorAll('.score')[i].addEventListener("click", rollActions, { once: true });
    // document.querySelectorAll('.score')[i].addEventListener("click", updateSheet(newSheet), { once: true });
    document.querySelectorAll('.score')[i].addEventListener("click", displayTotals, { once: true });
  }

  // visual cue to show that top bonus is achieved
  document.addEventListener("click", function(event) {

  });
}

function startNewGame() {
  location.reload();
}

function rollActions() {
  playRandomSound(audioFiles);
  rollFreeDice();
}

// function to play random sound from list of dice sounds
function playRandomSound(audioFiles) {
  const randomIndex = Math.floor(Math.random() * audioFiles.length);
  const audio = new Audio(audioFiles[randomIndex]);
  audio.play();
}

function playTickSound() {
  const sound = new Audio(ticksound);
  sound.play();
}

function playClickSound() {
  const sound = new Audio(clicksound);
  sound.play();
}

function playPopSound() {
  const sound = new Audio(popsound);
  sound.play();
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
  playRandomSound(audioFiles);
}

function holdDice(dice) {
  dice.holdState = !dice.holdState;
  if (dice.holdState) {
    event.target.classList.add("held")
  }
  else {event.target.classList.remove("held")}
}

// Function to change holdstate of all Dice to false
function releaseDice() {
  let heldElements = document.getElementsByClassName("held");
  Array.from(heldElements).forEach(element => {
    element.classList.remove("held");
  });
  allDice.forEach((dice, index) => {
    dice.setHoldState(false)
  })
}

//logic for calculating score
function calcScore(ruleName) {

  // if ((Number(document.getElementById('ones').textContent) +
  //     Number(document.getElementById('twos').textContent) +
  //     Number(document.getElementById('threes').textContent) +
  //     Number(document.getElementById('fours').textContent) +
  //     Number(document.getElementById('fives').textContent) +
  //     Number(document.getElementById('sixes').textContent)) >= 63) {
  //   document.getElementById(`#top-section-bonus`).classList.add("activated");
  // }

  // if ((newSheet.ones + newSheet.twos + newSheet.threes + newSheet.fours + newSheet.fives + newSheet.sixes) >= 63) {
  //   document.getElementById(`#top-section-bonus`).classList.add("activated");
  // }


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
  if (ruleName === "ones") {
    newSheet.ones = counter1;
    return counter1;
  }
  if (ruleName === "twos") {
    newSheet.twos = counter2 * 2;
    return counter2 * 2;}
  if (ruleName === "threes") {
    newSheet.threes = counter3 * 3;
    return counter3 * 3;}
  if (ruleName === "fours") {
    newSheet.fours = counter4 * 4;
    return counter4 * 4;}
  if (ruleName === "fives") {
    newSheet.fives = counter5 * 5;
    return counter5 * 5;}
  if (ruleName === "sixes") {
    newSheet.sixes = counter6 * 6;
    return counter6 * 6;}

  //three of a kind
  if (ruleName === "three-kind") {
    if (counter1 >= 3 ||
        counter2 >= 3 ||
        counter3 >= 3 ||
        counter4 >= 3 ||
        counter5 >= 3 ||
        counter6 >= 3) {
      newSheet.threeOfAKind = totVal;
      return totVal;
    }
    else {
      newSheet.threeOfAKind = 0;
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
      newSheet.fourOfAKind = totVal;
      return totVal;
    }
    else {
      newSheet.fourOfAKind = 0;
      return 0;
    }
  }

  //full house
  if (ruleName === "full-house") {
    if ((counter1 === 3 || counter2 === 3 || counter3 === 3 || counter4 === 3 || counter5 === 3 || counter6 === 3) &&
        (counter1 === 2 || counter2 === 2 || counter3 === 2 || counter4 === 2 || counter5 === 2 || counter6 === 2)) {
      newSheet.fullHouse = 25;
      return 25;
    }
    else {
      newSheet.fullHouse = 0;
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
      newSheet.smallStraight = 30;
      return 30;
    }
    else {
      newSheet.smallStraight = 0;
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
      newSheet.largeStraight = 40;
      return 40;
    }
    else {
      newSheet.largeStraight = 0;
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
      document.querySelector('.extra').addEventListener("click", saveScore, { once: true });

      const sound = new Audio(whoa);
      sound.play();

      newSheet.yahtzee = 50;
      return 50;
    }
    else {
      newSheet.yahtzee = 0;
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
      return 'X';
    }
    else {
      console.log("Returned X anyway");
      return 0;
    }
  }

  //chance
  if (ruleName === "chance") {
    newSheet.chance = totVal;
    return totVal;
  }
}

function saveScore() {
  const sound = new Audio(popsound);
  sound.play();
  type = event.target.parentNode.id;
  if (type === "second-yahtzee") {
    event.target.textContent = event.target.textContent + "X";
    newSheet.extraYahtzee++;
  }
  else {
    event.target.textContent = calcScore(type);
    numscores = numscores + 1;
    console.log(numscores);
  }
  if ((newSheet.ones + newSheet.twos + newSheet.threes + newSheet.fours + newSheet.fives + newSheet.sixes) >= 63) {
    document.getElementById(`top-section-bonus`).classList.add("activated");
  }
  if (numscores > 12) {
    console.log("game over");
    return;
  }
  releaseDice();
  document.getElementById('roll-count').textContent = "3";
  rollButton.addEventListener("click", rollActions, { once: true });
}

function displayTotals() {
  if (newSheet.checkForEmptyCells()) {
    newSheet.setUpperTotal();
    newSheet.setUpperGrandTotal();
    newSheet.setLowerTotal();
    newSheet.setGrandTotal();
    if (newSheet.getBonus()) {
      document.getElementById('top-section-bonus').textContent = 35;
    }
    if (typeof(newSheet.upperGrandTotal) === "number") {
      document.getElementById('top-section-total').textContent = newSheet.upperGrandTotal;
    }
    if (typeof(newSheet.lowerTotal) === "number") {
      document.getElementById('bottom-section-total').textContent = newSheet.lowerTotal;
    }
    if (typeof(newSheet.grandTotal) === "number") {
      document.getElementById('all-sections-total').textContent = newSheet.grandTotal;
    }
  }
}

function updateSheet(newSheet) {
  newSheet.ones = Number(document.getElementById('ones').textContent);
  newSheet.twos = Number(document.getElementById('twos').textContent);
  newSheet.threes = Number(document.getElementById('threes').textContent);
  newSheet.fours = Number(document.getElementById('fours').textContent);
  newSheet.fives = Number(document.getElementById('fives').textContent);
  newSheet.sixes = Number(document.getElementById('sixes').textContent);
  newSheet.threeOfAKind = Number(document.getElementById('three-kind').textContent);
  newSheet.fourOfAKind = Number(document.getElementById('four-kind').textContent);
  newSheet.fullHouse = Number(document.getElementById('full-house').textContent);
  newSheet.smallStraight = Number(document.getElementById('small-straight').textContent);
  newSheet.largeStraight = Number(document.getElementById('large-straight').textContent);
  newSheet.yahtzee = Number(document.getElementById('first-yahtzee').textContent);
  newSheet.chance = Number(document.getElementById('chance').textContent)
}

function updateRollsDisplay(newRolls) {
  displayDiv.textContent = 'Rolls Left: ' + newRolls;
}

function resetScores() {
  let scores = document.getElementsByClassName('score');
  console.log("scores: " + scores);
  Array.from(scores).forEach((Element) => {
    Element.textContent = "";
  })
  console.log(scores);
}

function waitScore(actionId) {
  return new Promise((resolve) => {
    const button = document.getElementsByClassName(actionId);
    button.addEventListener('click', () => {
      resolve();
    }, { once: true });  // Use { once: true } to ensure the event listener is removed after it's called
  });
}

function waitRoll(actionId) {
  return new Promise((resolve) => {
    const button = document.getElementById(actionId);
    button.addEventListener('click', () => {
      resolve();
    }, { once: true });  // Use { once: true } to ensure the event listener is removed after it's called
  });
}

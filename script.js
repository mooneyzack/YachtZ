//Click roll button

class Dice {
  holdState;
  constructor() {
    this.holdState = false;
    this.value = null;
  }
}

let Dice1 = new Dice();
let Dice2 = new Dice();
let Dice3 = new Dice();
let Dice4 = new Dice();
let Dice5 = new Dice();

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
}

//Randomize dice value 1-6
function rollFreeDice() {
  if (!Dice1.holdState) {document.querySelector('#dice1').textContent = Math.floor(Math.random() * 6) + 1;}
  if (!Dice2.holdState) {document.querySelector('#dice2').textContent = Math.floor(Math.random() * 6) + 1;}
  if (!Dice3.holdState) {document.querySelector('#dice3').textContent = Math.floor(Math.random() * 6) + 1;}
  if (!Dice4.holdState) {document.querySelector('#dice4').textContent = Math.floor(Math.random() * 6) + 1;}
  if (!Dice5.holdState) {document.querySelector('#dice5').textContent = Math.floor(Math.random() * 6) + 1;}
}



//Add event listener to each individual dice that calls a hold function

function holdDice(dice) {
  dice.holdState = !dice.holdState;
  if (dice.holdState) {event.target.classList.add("held")}
  else {event.target.classList.remove("held")}
}



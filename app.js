let computer = [];
let player = [];

let roundTurn = false;
let timesTurn = true;
let computerTurn;

const boxes = document.querySelectorAll('.box');
const reset = document.querySelector('.reset');
const choices = document.querySelectorAll('.single-choice');

choices.forEach((choice) => {
  choice.addEventListener('click', startGame);
});

function startGame() {
  if (this.classList.contains('circle')) {
    computerTurn = true;
  } else {
    computerTurn = false;
  }
  computer = [];
  player = [];
  let game = setInterval(playGame(), 100);
}

function playGame() {
  if (computerTurn) {
    let randomNumber = Math.floor(Math.random() * 9 + 1);
  } else {
  }
  // check()
}

boxes.forEach((box) => {
  box.addEventListener('click', handleCheck);
});
reset.addEventListener('click', resetAll);

function handleCheck() {
  if (timesTurn) {
    this.innerHTML = '<i class="fas fa-times times"></i>';
    this.removeEventListener('click', handleCheck);
  }
  if (roundTurn) {
    this.innerHTML = '<i class="far fa-circle circle"></i>';
    this.removeEventListener('click', handleCheck);
  }
  roundTurn = !roundTurn;
  timesTurn = !timesTurn;
}

function resetAll() {
  boxes.forEach((box) => {
    box.innerHTML = '';
    box.addEventListener('click', handleCheck);
  });
}

// start le jeux avec le choix du joueur
// circle commence
// random l'action de l'oridnateur
// setInterval
// push le data-id de la case
// si la case a complte ne pas push
// créer une fonction check qui verifie sur le joueur ou oridjnateur a gagné

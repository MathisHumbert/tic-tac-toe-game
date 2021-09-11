// initialing var
let computer = [];
let player = [];

let roundTurn = false;
let timesTurn = true;
let playFlag = false;
let starter;
let computerTurn;

// get elements
const boxes = document.querySelectorAll('.box');
const reset = document.querySelector('.reset');
const choices = document.querySelectorAll('.single-choice');
const turn = document.querySelector('.turn');
const winner = document.querySelector('.winner');

// all of the funtions

// launch the game
function launchGame() {
  resetAll();
  this.classList.add('active');
  if (this.classList.contains('circle')) {
    starter = true;
  } else {
    starter = false;
  }
  startGame();
}

// start the game
function startGame() {
  computerTurn = starter;
  roundTurn = false;
  timesTurn = true;
  playFlag = false;
  computer = [];
  player = [];
  playGame();
}

// play the game
function playGame() {
  // computer turn
  if (computerTurn) {
    let randomNumber = Math.floor(Math.random() * 9 + 1);
    if (computer.includes(randomNumber) || player.includes(randomNumber)) {
      playGame();
    } else {
      displayTurn();
      computerPlay(randomNumber);
    }
  }

  // player turn
  else {
    displayTurn();
    playFlag = true;
  }
}

// check if someone won
function check() {
  if (win(player)) {
    playFlag = false;
    displayWinner();
    setTimeout(() => {
      resetGame();
    }, 2000);
    return;
  } else if (win(computer)) {
    playFlag = false;
    displayWinner();
    setTimeout(() => {
      resetGame();
    }, 2000);
    return;
  } else if (
    (player.length == 5 && computerTurn === true) ||
    (computer.length == 5 && computerTurn === false)
  ) {
    playFlag = false;
    winner.innerHTML = 'Draw';
    setTimeout(() => {
      resetGame();
    }, 2000);
    return;
  }
  playGame();
}

// winning check
function win(arr) {
  if (arr.includes(1) && arr.includes(2) & arr.includes(3)) {
    return true;
  }
  if (arr.includes(4) && arr.includes(5) & arr.includes(6)) {
    return true;
  }
  if (arr.includes(7) && arr.includes(8) & arr.includes(9)) {
    return true;
  }
  if (arr.includes(1) && arr.includes(4) & arr.includes(7)) {
    return true;
  }
  if (arr.includes(2) && arr.includes(5) & arr.includes(8)) {
    return true;
  }
  if (arr.includes(3) && arr.includes(6) & arr.includes(9)) {
    return true;
  }
  if (arr.includes(1) && arr.includes(5) & arr.includes(9)) {
    return true;
  }
  if (arr.includes(3) && arr.includes(5) & arr.includes(7)) {
    return true;
  }
}

// player action
function playerPlay() {
  if (!playFlag) return;
  player.push(parseInt(this.dataset.id));
  handleCheck(this);
  computerTurn = true;
  playFlag = false;
  check();
}

// computer action
function computerPlay(num) {
  computer.push(num);
  boxes.forEach((box) => {
    if (num == box.dataset.id) {
      setTimeout(() => {
        handleCheck(box);
        computerTurn = false;
        playFlag = true;
        check();
      }, 500);
    }
  });
}

// display the actions
function handleCheck(box) {
  if (timesTurn) {
    box.innerHTML = '<i class="fas fa-times times"></i>';
    box.removeEventListener('click', playerPlay);
  }
  if (roundTurn) {
    box.innerHTML = '<i class="far fa-circle circle"></i>';
    box.removeEventListener('click', playerPlay);
  }
  roundTurn = !roundTurn;
  timesTurn = !timesTurn;
}

// reset game
function resetGame() {
  boxes.forEach((box) => {
    box.innerHTML = '';
    box.addEventListener('click', playerPlay);
  });
  winner.innerHTML = '';
  startGame();
}

// reset all
function resetAll() {
  boxes.forEach((box) => {
    box.innerHTML = '';
    box.addEventListener('click', playerPlay);
  });
  choices.forEach((choice) => {
    choice.classList.remove('active');
  });
  starter = '';
  turn.innerHTML = 'Choose your player';
}

// display the player or computer turn
function displayTurn() {
  if (starter == false)
    turn.innerHTML = `Player ${
      computerTurn
        ? `<i class="far fa-circle header-circle"></i>`
        : `<i class="fas fa-times header-times"></i>`
    }'s turn`;
  else {
    turn.innerHTML = `Player ${
      computerTurn
        ? `<i class="fas fa-times header-times"></i>`
        : `<i class="far fa-circle header-circle"></i>`
    }'s turn`;
  }
}

// display the winner
function displayWinner() {
  if (starter == false)
    winner.innerHTML = `Player ${
      computerTurn
        ? `<i class="fas fa-times header-times"></i>`
        : `<i class="far fa-circle header-circle"></i>`
    } won`;
  else {
    winner.innerHTML = `Player ${
      computerTurn
        ? `<i class="far fa-circle header-circle"></i>`
        : `<i class="fas fa-times header-times"></i>`
    } won`;
  }
}

// Events
choices.forEach((choice) => {
  choice.addEventListener('click', launchGame);
});
boxes.forEach((box) => {
  box.addEventListener('click', playerPlay);
});
reset.addEventListener('click', resetAll);

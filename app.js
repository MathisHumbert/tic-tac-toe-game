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

// all of the funtions

// launch the game
function launchGame() {
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
      turn.innerHTML = `Player ${
        computerTurn
          ? `<i class="far fa-circle header-circle"></i>`
          : `<i class="fas fa-times header-times"></i>`
      }'s turn`;
      computerPlay(randomNumber);
    }
  }

  // player turn
  else {
    turn.innerHTML = `Player ${
      computerTurn
        ? `<i class="far fa-circle header-circle"></i>`
        : `<i class="fas fa-times header-times"></i>`
    }'s turn`;

    playFlag = true;
  }
}

// check if someone won
function check() {
  console.log(computer);
  console.log(player);
  if (player.length == 5 && computerTurn === true) return;

  if (win(player)) {
    console.log('player won');
    setTimeout(() => {
      resetGame();
    }, 2000);
    return;
  }
  if (win(computer)) {
    console.log('computer won');
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
}

// Events
choices.forEach((choice) => {
  choice.addEventListener('click', launchGame);
});
boxes.forEach((box) => {
  box.addEventListener('click', playerPlay);
});
reset.addEventListener('click', resetAll);

'use strict';

let GameOver = false;
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
const bodyHTML = document.querySelector('body');
const messageHTML = document.querySelector('.message');
const numberHTML = document.querySelector('.number');
const guessHTML = document.querySelector('.guess');
const scoreHTML = document.querySelector('.score');
const highscoreHTML = document.querySelector('.highscore');
const checkButtonHTML = document.querySelector('.check');
const resetButtonHTML = document.querySelector('.again');

const displayMessage = function (message) {
  messageHTML.textContent = message;
};

const changeInputState = function () {
  guessHTML.hasAttribute('readonly')
    ? guessHTML.removeAttribute('readonly')
    : guessHTML.setAttribute('readonly', '');
};

const resetGame = function () {
  score = 20;
  GameOver = false;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  bodyHTML.style.backgroundColor = '#222222';
  messageHTML.textContent = 'Start guessing...';
  numberHTML.textContent = '?';
  guessHTML.value = '';
  scoreHTML.textContent = score;
  numberHTML.style.width = '15rem';
  changeInputState();
};

const win = function () {
  GameOver = true;
  changeInputState();
  displayMessage('🎉 Correct Number!');
  bodyHTML.style.backgroundColor = '#60b347';
  numberHTML.textContent = secretNumber;
  numberHTML.style.width = '30rem';

  score > highscore ? (highscoreHTML.textContent = highscore) : false;
};

const wrongAnswer = function (guess) {
  if (score < 1) {
    GameOver = true;
    scoreHTML.textContent = 0;
    changeInputState();
    displayMessage('🧨 You lost the game');
    return;
  }

  displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
  scoreHTML.textContent = score;
  score--;
};

checkButtonHTML.addEventListener('click', event => {
  if (GameOver) return;
  const guess = Number(guessHTML.value);

  if (!guess) displayMessage('⛔ No number!');
  if (guess === secretNumber) win();
  if (guess !== secretNumber) wrongAnswer(guess);
});

resetButtonHTML.addEventListener('click', event => {
  resetGame();
});

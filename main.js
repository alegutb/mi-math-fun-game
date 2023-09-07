const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const resultElement = document.getElementById('result');
const checkButton = document.getElementById('checkButton');
const nextButton = document.getElementById('nextButton');
const hintButton = document.getElementById('hintButton');
const skipButton = document.getElementById('skipButton');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const newGame = document.getElementById('newGame');
const difficultySelect =  document.getElementById('difficultySelect');

let difficulty = 'Easy'
let currentEquation;
let score = 0;
let time = 60;
let timerInterval;
let hasGameStarted = false;

function generateEquation() {
  // Generate different equation types with varying coefficients, constants, and results
  const difficulties = [
    {
      name: "Easy",
      equations: [
        { equation: "2x + 5 = 15", coefficient: 2, constant: 5, result: 15, answer: 5 },
        { equation: "3y - 7 = 10", coefficient: 3, constant: -7, result: 10, answer: 17/3 },
        { equation: "4z + 8 = 28", coefficient: 4, constant: 8, result: 28, answer: 5 },
      ]
    },
    {
      name: "Medium",
      equations: [
        { equation: "5a - 12 = 33", coefficient: 5, constant: -12, result: 33, answer: 9 },
        { equation: "6b + 4 = 22", coefficient: 6, constant: 4, result: 22, answer: 3 },
        { equation: "9c - 15 = 51", coefficient: 9, constant: -15, result: 51, answer: 8 },
        { equation: "2d + 3 = 5d - 1", coefficient: 2, constant: 3, result: -1, answer: 2 },
        { equation: "4e + 7 = 2e + 18", coefficient: 4, constant: 7, result: 18, answer: 5 },
      ]
    },
    {
      name: "Hard",
      equations: [
        { equation: "2x + 3 = 5x - 1", coefficient: 2, constant: 3, result: -1, answer: 2 },
        { equation: "4y + 7 = 2y + 18", coefficient: 4, constant: 7, result: 18, answer: 5 },
        { equation: "3z + 9 = 2z + 21", coefficient: 3, constant: 9, result: 21, answer: 12 },
        { equation: "7a - 4 = 3a + 12", coefficient: 7, constant: -4, result: 12, answer: 8 },
        { equation: "6b + 5 = 8b - 3", coefficient: 6, constant: 5, result: -3, answer: -4 },
      ]
    },
  ];

  const currentEquations = difficulties.find(difficultySet => difficultySet.name === difficulty)
  const randomIndex = Math.floor(Math.random() * currentEquations.equations.length);
  const selectedEquation = currentEquations.equations[randomIndex];

  return {
    equation: selectedEquation.equation,
    coefficient: selectedEquation.coefficient,
    xValue: (selectedEquation.result - selectedEquation.constant) / selectedEquation.coefficient
  };
}

function startNewGame() {
  currentEquation = generateEquation();
  questionElement.textContent = `Solve for x: ${currentEquation.equation}`;
  answerElement.disabled = false;
  answerElement.value = '';
  resultElement.value = '';
  startTimer();
}

function startTimer() {
  if (!hasGameStarted) {
    time = 60;

    timerInterval = setInterval(() => {
      if (time > 0) {
        time--;
        timerElement.textContent = `Time: ${time} s`;
      } else {
        clearInterval(timerInterval);
        gameOver();
      }
    }, 1000);

    hasGameStarted = true
  }
}

function gameOver() {
  questionElement.textContent = 'Time\'s up! Game over.';
  answerElement.disabled = true;
  checkButton.disabled = true;
  nextButton.style.display = 'none';
  hintButton.style.display = 'none';
  skipButton.style.display = 'none';
  hasGameStarted = false;
}

function updateScore() {
  scoreElement.textContent = score;
}

checkButton.addEventListener('click', () => {
  const userAnswer = parseFloat(answerElement.value);

  if (!isNaN(userAnswer)) {
    if (userAnswer === currentEquation.xValue) {
      resultElement.textContent = 'Correct! Well done.';
      score += 10;
    } else {
      resultElement.textContent = `Incorrect. The correct answer is ${currentEquation.xValue}.`;
    }

    answerElement.disabled = true;
    checkButton.disabled = true;
    nextButton.style.display = 'block';
    hintButton.style.display = 'none';
    skipButton.style.display = 'none';

    updateScore();
  } else {
    resultElement.textContent = 'Please enter a valid number.';
  }

  clearInterval(timerInterval)
  hasGameStarted = false
});

nextButton.addEventListener('click', () => {
  currentEquation = generateEquation();
  questionElement.textContent = `Solve for x: ${currentEquation.equation}`;
  answerElement.value = '';
  resultElement.textContent = '';
  answerElement.disabled = false;
  checkButton.disabled = false;
  nextButton.style.display = 'none';
  hintButton.style.display = 'block';
  skipButton.style.display = 'block';
});

hintButton.addEventListener('click', () => {
  const hint = `Divide both sides by ${currentEquation.coefficient} to solve for x.`;
  alert(hint);
});

skipButton.addEventListener('click', () => {
  currentEquation = generateEquation();
  questionElement.textContent = `Solve for x: ${currentEquation.equation}`;
  answerElement.value = '';
  resultElement.textContent = '';
  answerElement.disabled = false;
  checkButton.disabled = false;
  nextButton.style.display = 'none';
  hintButton.style.display = 'block';
  skipButton.style.display = 'block';
});

newGame.addEventListener('click', () => {
  startNewGame();
});

difficultySelect.addEventListener('input', () => {
  difficulty = difficultySelect.value
});

startNewGame();


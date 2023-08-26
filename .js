// Generate a random algebraic equation for the game
function generateEquation() {
  const coefficient = Math.floor(Math.random() * 10) + 1; // Random coefficient between 1 and 10
  const constant = Math.floor(Math.random() * 20) + 1;    // Random constant between 1 and 20
  const result = Math.floor(Math.random() * 50) + 1;      // Random result between 1 and 50

  const equation = `${coefficient}x + ${constant} = ${result}`;
  return { equation, xValue: (result - constant) / coefficient };
}

const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const resultElement = document.getElementById('result');
const checkButton = document.getElementById('checkButton');

let currentEquation = generateEquation();
questionElement.textContent = `Solve for x: ${currentEquation.equation}`;

checkButton.addEventListener('click', () => {
  const userAnswer = parseFloat(answerElement.value);
  if (!isNaN(userAnswer)) {
    if (userAnswer === currentEquation.xValue) {
      resultElement.textContent = 'Correct! Well done.';
    } else {
      resultElement.textContent = 'Incorrect. Try again.';
    }

    // Generate a new equation for the next round
    currentEquation = generateEquation();
    questionElement.textContent = `Solve for x: ${currentEquation.equation}`;
    answerElement.value = '';
  } else {
    resultElement.textContent = 'Please enter a valid number.';
  }
});
// ... (previous code)

const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('nextButton');

let score = 0;
updateScore();

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

    updateScore();
  } else {
    resultElement.textContent = 'Please enter a valid number.';
  }
});

nextButton.addEventListener('click', () => {
  currentEquation = generateEquation();
  questionElement.textContent = `Solve for x: ${currentEquation.equation}`;
  answerElement.value = '';
  resultElement.textContent = '';
  answerElement.disabled = false;
  checkButton.disabled = false;
  nextButton.style.display = 'none';
});

function updateScore() {
  scoreElement.textContent = score;
}
// ... (previous code)

const hintButton = document.getElementById('hintButton');
const skipButton = document.getElementById('skipButton');
const timerElement = document.getElementById('timer');
let time = 60; // 60 seconds countdown
let timerInterval;

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
  hintButton.style.display = 'none';
  skipButton.style.display = 'none';
});

function startTimer() {
  timerInterval = setInterval(() => {
    if (time > 0) {
      time--;
      timerElement.textContent = `Time: ${time} s`;
    } else {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  questionElement.textContent = 'Time\'s up! Game over.';
  answerElement.disabled = true;
  checkButton.disabled = true;
  nextButton.style.display = 'none';
  hintButton.style.display = 'none';
  skipButton.style.display = 'none';
}

startTimer();

function generateEquation() {
    // Generate different equation types with varying coefficients, constants, and results
    
const difficulties = [
    { name: "Easy", equations: [
        { equation: "2x + 5 = 15", answer: 5 },
        { equation: "3y - 7 = 10", answer: 17/3 },
        { equation: "4z + 8 = 28", answer: 5 },
    ]},
    { name: "Medium", equations: [
        { equation: "5a - 12 = 33", answer: 9 },
        { equation: "6b + 4 = 22", answer: 3 },
        { equation: "9c - 15 = 51", answer: 8 },
        { equation: "2d + 3 = 5d - 1", answer: 2 },
        { equation: "4e + 7 = 2e + 18", answer: 5 },
    ]},
    { name: "Hard", equations: [
        { equation: "2x + 3 = 5x - 1", answer: 2 },
        { equation: "4y + 7 = 2y + 18", answer: 5 },
        { equation: "3z + 9 = 2z + 21", answer: 12 },
        { equation: "7a - 4 = 3a + 12", answer: 8 },
        { equation: "6b + 5 = 8b - 3", answer: -4 },
    ]},
];

      
        // Add more equation types here
    ];
  
    const randomIndex = Math.floor(Math.random() * equationTypes.length);
    const selectedEquation = equationTypes[randomIndex];
  
    return {
      equation: selectedEquation.equation,
      coefficient: selectedEquation.coefficient,
      xValue: (selectedEquation.result - selectedEquation.constant) / selectedEquation.coefficient
    };
  }
  
  const questionElement = document.getElementById('question');
  const answerElement = document.getElementById('answer');
  const resultElement = document.getElementById('result');
  const checkButton = document.getElementById('checkButton');
  const nextButton = document.getElementById('nextButton');
  const hintButton = document.getElementById('hintButton');
  const skipButton = document.getElementById('skipButton');
  const timerElement = document.getElementById('timer');
  const scoreElement = document.getElementById('score');
  
  let currentEquation;
  let score = 0;
  let time = 60;
  let timerInterval;
  
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
  
  startTimer();
  currentEquation = generateEquation();
  questionElement.textContent = `Solve for x: ${currentEquation.equation}`;

const startGameButton = document.getElementById("startGameButton");
const startTimerButton = document.getElementById("startTimerButton");

let isGameStarted = false;
let isTimerStarted = false;

startGameButton.addEventListener("click", () => {
    if (!isGameStarted) {
        isGameStarted = true;
        startGameButton.textContent = "Game Started";
        startGame();
    }
});

startTimerButton.addEventListener("click", () => {
    if (!isTimerStarted) {
        isTimerStarted = true;
        startTimerButton.textContent = "Timer Started";
        startTimer();
    }
});

function startGame() {
    difficultySelect.disabled = true;
    displayEquation();
}

function startTimer() {
    startTimerButton.disabled = true;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timerElement.textContent = `Time left: ${timeLeft} s`;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            showGameOver(false);
        }
    }, 1000);
}


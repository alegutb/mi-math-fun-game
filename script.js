const equationElement = document.getElementById("equation");
const answerElement = document.getElementById("answer");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const attemptsElement = document.getElementById("attempts");
const timerElement = document.getElementById("timer");
const gameContainer = document.getElementById("game-container");
const gameOverContainer = document.getElementById("game-over-container");
const restartButton = document.getElementById("restartButton");
const hintButton = document.getElementById("hintButton");
const difficultySelect = document.getElementById("difficultySelect");
const startGameButton = document.getElementById("startGameButton");
const startTimerButton = document.getElementById("startTimerButton");

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

const maxAttempts = 3;
const gameTimeInSeconds = 60;
let currentEquationIndex = 0;
let score = 0;
let attempts = maxAttempts;
let timerInterval;
let currentDifficultyIndex = 0;
let isGameStarted = false;
let isTimerStarted = false;

function displayEquation() {
    equationElement.textContent = difficulties[currentDifficultyIndex].equations[currentEquationIndex].equation;
    resultElement.textContent = "";
    answerElement.value = "";
    scoreElement.textContent = `Score: ${score}`;
    attemptsElement.textContent = `Attempts left: ${attempts}`;
}

function checkAnswer() {
    const userAnswer = parseFloat(answerElement.value);
    const correctAnswer = difficulties[currentDifficultyIndex].equations[currentEquationIndex].answer;

    if (userAnswer === correctAnswer) {
        resultElement.textContent = "Correct!";
        score++;
        currentEquationIndex = (currentEquationIndex + 1) % difficulties[currentDifficultyIndex].equations.length;
        if (score === difficulties[currentDifficultyIndex].equations.length) {
            showGameOver(true);
            return;
        }
        displayEquation();
    } else {
        resultElement.textContent = "Incorrect. Try again.";
        attempts--;
        attemptsElement.textContent = `Attempts left: ${attempts}`;
        if (attempts === 0) {
            showGameOver(false);
        }
    }
}

function startGame() {
    difficultySelect.disabled = true;
    displayEquation();
}

function startTimer() {
    startTimerButton.disabled = true;
    clearInterval(timerInterval);
    let timeLeft = gameTimeInSeconds;
    timerInterval = setInterval(() => {
        timerElement.textContent = `Time left: ${timeLeft} s`;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            showGameOver(false);
        }
    }, 1000);
}

function changeDifficulty() {
    currentDifficultyIndex = (currentDifficultyIndex + 1) % difficulties.length;
    currentEquationIndex = 0;
    score = 0;
    attempts = maxAttempts;
    clearInterval(timerInterval);
    startTimerButton.disabled = false;
    startTimerButton.textContent = "Start Timer";
    startGame();
}

function showGameOver(isWinner) {
    clearInterval(timerInterval);
    gameContainer.style.display = "none";
    gameOverContainer.style.display = "block";
    if (isWinner) {
        gameOverContainer.innerHTML = `<h2>Congratulations!</h2><p>You completed all equations with a score of ${score}.</p>`;
    } else {
        gameOverContainer.innerHTML = `<h2>Game Over</h2><p>Your final score is ${score}. Try again!</p>`;
    }
}

hintButton.addEventListener("click", () => {
    const correctAnswer = difficulties[currentDifficultyIndex].equations[currentEquationIndex].answer;
    resultElement.textContent = `The answer is ${correctAnswer}.`;
});

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

difficultySelect.addEventListener("change", changeDifficulty);
restartButton.addEventListener("click", () => {
    location.reload();
});

// Initialize the game
displayEquation();




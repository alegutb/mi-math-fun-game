const problemElement = document.getElementById("problem");
const userAnswerInput = document.getElementById("userAnswer");
const submitBtn = document.getElementById("submitBtn");
const resultElement = document.getElementById("result");
const timeElement = document.getElementById("time");

let timer;
let timeLeft = 60;

function generateProblem() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "*", "/"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    problemElement.textContent = `${num1} ${operator} ${num2}`;
    
    return eval(`${num1} ${operator} ${num2}`);
}

function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        timeElement.textContent = `${timeLeft} seconds`;

        if (timeLeft === 0) {
            clearInterval(timer);
            submitBtn.disabled = true;
            resultElement.textContent = "Time's up!";
        }
    }, 1000);
}

function checkAnswer() {
    const correctAnswer = generateProblem();
    const userAnswer = parseFloat(userAnswerInput.value);
    
    if (userAnswer === correctAnswer) {
        resultElement.textContent = "Correct!";
    } else {
        resultElement.textContent = "Incorrect!";
    }
    
    userAnswerInput.value = "";
}

submitBtn.addEventListener("click", function() {
    checkAnswer();
});

userAnswerInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

startTimer();

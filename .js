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

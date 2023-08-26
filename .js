const equationElement = document.getElementById('equation');
const inputElement = document.getElementById('input');
const checkBtn = document.getElementById('checkBtn');

function generateEquation() {
  const operators = ['+', '-', '*', '/'];
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;
  const operator = operators[Math.floor(Math.random() * operators.length)];
  const equation = `${num1} ${operator} ${num2}`;
  equationElement.textContent = equation;
}

checkBtn.addEventListener('click', () => {
  const userAnswer = inputElement.value;
  const equation = equationElement.textContent;
  const correctAnswer = eval(equation).toString();
  
  if (userAnswer === correctAnswer) {
    alert('Correct! Well done.');
  } else {
    alert('Incorrect. Try again.');
  }
  
  generateEquation();
  inputElement.value = '';
});

// Initial setup
generateEquation();

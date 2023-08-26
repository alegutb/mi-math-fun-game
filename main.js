function generateEquation() {
    // Generate different equation types with varying coefficients, constants, and results
    const equationTypes = [
      { equation: `2x + 5 = 15`, coefficient: 2, constant: 5, result: 15 },
      { equation: `4x - 10 = 18`, coefficient: 4, constant: -10, result: 18 },
      { equation: `5x + 3 = 23`, coefficient: 5, constant: 3, result: 23 }
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

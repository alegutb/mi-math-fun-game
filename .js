document.addEventListener("DOMContentLoaded", function() {
    const equationElement = document.getElementById("equation");
    const answerElement = document.getElementById("answer");
    const checkButton = document.getElementById("checkButton");
    const resultElement = document.getElementById("result");
  
    // Generate a random equation
    function generateEquation() {
      const operators = ["+", "-", "*", "/"];
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const operator = operators[Math.floor(Math.random() * operators.length)];
      equationElement.textContent = `${num1} ${operator} ${num2} = ?`;
      return eval(`${num1} ${operator} ${num2}`);
    }
  
    // Display a new equation when the page loads
    let correctAnswer = generateEquation();
  
    // Check the user's answer
    checkButton.addEventListener("click", function() {
      const userAnswer = parseFloat(answerElement.value);
      if (userAnswer === correctAnswer) {
        resultElement.textContent = "Correct!";
        answerElement.value = "";
        correctAnswer = generateEquation();
      } else {
        resultElement.textContent = "Try again!";
      }
    });
  });
  
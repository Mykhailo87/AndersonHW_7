const display = document.querySelector(".display");
let previousInput = '';
let currentInput = '';
let operator = '';

function appendToDisplay(value) {
    if (value === '.' && currentInput.includes('.')) {
        return;
    }

    currentInput += value.toString();
    updateDisplay();
}

function deleteLastNumber() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
    }
    
    updateDisplay();
}

function updateDisplay() {
    if (currentInput) {
        display.innerText = currentInput;
    } 
}

function changeToOpposite() {
  currentInput = (-(+currentInput)).toString();
  updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.innerText = '';
}

function setOperator(newOperator) {
    if (currentInput === '') {
      return;
    }
    if (previousInput !== '') {
      calculate();
    }

    operator = newOperator;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculate() {
    let calculation;
    const firstOperand = parseFloat(previousInput);
    const secondOperand = parseFloat(currentInput);
    
    if (isNaN(firstOperand) || isNaN(secondOperand)) {
      clearDisplay();
      return;
    }

    switch (operator) {
      case '+':
        calculation = (firstOperand + secondOperand).toFixed(8).replace(/\.?0+$/, '');
        break;
      case '-':
        calculation = (firstOperand - secondOperand).toFixed(8).replace(/\.?0+$/, '');
        break;
      case '*':
        calculation = (firstOperand * secondOperand).toFixed(8).replace(/\.?0+$/, '');
        break;
      case '/':
        if (secondOperand === 0) {
          clearDisplay();
          display.innerText = 'Error';
          return;
        }
        calculation = (firstOperand / secondOperand).toFixed(8).replace(/\.?0+$/, '');
        break;
    }
    
    currentInput = calculation;
    operator = '';
    previousInput = '';
    updateDisplay();
}
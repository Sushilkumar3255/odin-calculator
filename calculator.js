let operator = "";
let previousValue = "";
let currentValue = "";

const CHOICES = {
  Addition: "+",
  Subtraction: "-",
  Multiplication: "x",
  Division: "/",
  Decimal: ".",
};

document.addEventListener("DOMContentLoaded", function () {
  const clear = document.querySelector("#clear-btn");
  const equal = document.querySelector(".equal");
  const decimal = document.querySelector(".decimal");

  const numbers = document.querySelectorAll(".number");
  const operators = document.querySelectorAll(".operator");

  const previousScreen = document.querySelector(".previous");
  const currentScreen = document.querySelector(".current");

  numbers.forEach((number) =>
    number.addEventListener("click", function (e) {
      handleNumber(e.target.textContent);
      currentScreen.textContent = currentValue;
    })
  );

  operators.forEach((op) =>
    op.addEventListener("click", function (e) {
      handleOperator(e.target.textContent);
      previousScreen.textContent = previousValue + " " + operator;
      currentScreen.textContent = currentValue;
    })
  );

  clear.addEventListener("click", function () {
    previousValue = "";
    currentValue = "";
    operator = "";
    previousScreen.textContent = currentValue;
    currentScreen.textContent = currentValue;
  });

  equal.addEventListener("click", function () {
    if (currentValue !== "" && previousValue !== "") {
      calculate();
      previousScreen.textContent = "";
      if (previousValue.length <= 5) {
        currentScreen.textContent = previousValue;
      } else {
        currentScreen.textContent = previousValue.slice(0, 5) + "...";
      }
    }
  });

  decimal.addEventListener("click", function () {
    addDecimal();
  });
});

function handleNumber(num) {
  if (currentValue.length <= 5) {
    currentValue += num;
  }
}

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

// main logic of calculator
function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === CHOICES.Addition) {
    previousValue += currentValue;
  } else if (operator === CHOICES.Subtraction) {
    previousValue -= currentValue;
  } else if (operator === CHOICES.Multiplication) {
    previousValue *= currentValue;
  } else {
    previousValue /= currentValue;
  }

  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}

function addDecimal() {
  if (!currentValue.includes(CHOICES.Decimal)) {
    currentValue += CHOICES.Decimal;
  }
}

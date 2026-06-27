function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) return "Not Valid";
    return a / b;
}

let num1 = '';
let num2 = '';
let operator = null; // ✅ always null when empty
let isSecondNumber = false;
let shouldResetDisplay = false;

function operate(operator, a, b) {
    if (operator === "+") return add(a, b);
    if (operator === "-") return subtract(a, b);
    if (operator === "*") return multiply(a, b);
    if (operator === "/") return divide(a, b);
}

const buttons = document.querySelectorAll('.buttons');
const display = document.querySelector('.calulator-display');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.textContent;
        handleNumber(value);
    });
});

function handleNumber(value) {
    if (isNaN(value)) return;

    // ✅ FIX 1: reset ONLY display (not blindly num1/num2)
    if (shouldResetDisplay) {
        display.textContent = '';
        num1 = '';
        num2 = '';
        shouldResetDisplay = false;
    }

    if (!isSecondNumber) {
        num1 += value;
        display.textContent = num1;
    } else {
        num2 += value;
        display.textContent = num2;
    }
}

function roundResult(num) {
    return Math.round(num * 1000) / 1000;
}

function handleOperator(op) {
    if (num1 === '') return;

    // ✅ FIX 2: operator replacement case
    if (isSecondNumber && num2 === '') {
        operator = op; // just replace operator
        return;
    }

    // ✅ FIX 3: chaining calculation
    if (num2 !== '') {
        let result = operate(operator, Number(num1), Number(num2));

        if (result === "Not Valid") {
            display.textContent = result;
            resetState(); // ✅ do NOT clear display
            shouldResetDisplay = true;
            return;
        }

        result = roundResult(result);
        num1 = result.toString();
        num2 = '';
        display.textContent = num1;
    }

    // ✅ FIX 4: handle operator after equals
    shouldResetDisplay = false;

    operator = op;
    isSecondNumber = true;
}

const operatorButtons = document.querySelectorAll('.buttons-operators');

operatorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        handleOperator(btn.textContent);
    });
});

function handleEquals() {
    if (num1 === '' || num2 === '' || operator === null) return;

    let result = operate(operator, Number(num1), Number(num2));

    // ✅ FIX 5: proper error handling
    if (result === "Not Valid") {
        display.textContent = result;
        resetState(); // don't clear display
        shouldResetDisplay = true;
        return;
    }

    result = roundResult(result);
    display.textContent = result;

    // ✅ FIX 6: consistent state reset
    num1 = result.toString();
    num2 = '';
    operator = null; // ✅ always null
    isSecondNumber = false;
    shouldResetDisplay = true;
}

const equalsBtn = document.querySelector('.equals');
equalsBtn.addEventListener('click', handleEquals);

// ✅ NEW: separate state reset (no display clearing)
function resetState() {
    num1 = '';
    num2 = '';
    operator = null;
    isSecondNumber = false;
}

function clearAll() {
    resetState();
    display.textContent = '';
}

const clearBtn = document.querySelector('.clearbtn');
clearBtn.addEventListener('click', clearAll);
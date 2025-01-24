// Initialize variables
let num1 = '';
let operator = null;
let num2 = '';
let refreshScreen = false;

const onlyNum = '0123456789';
const onlyOpe = '+-*/';

// Select elements
const largeScreen = document.querySelector('.largeScreen');
const smallScreen = document.querySelector('.smallScreen');
const buttons = document.querySelectorAll('button');

// Utility functions
function roundToTwo(num) {
    return Math.round(num * 100) / 100;
}

function resetCalculator() {
    largeScreen.textContent = '';
    smallScreen.textContent = '';
    num1 = num2 = '';
    operator = null;
}

function isScreenLimitReached(screen) {
    return screen.length >= 25;
}

function operate(num1, operator, num2) {
    switch (operator) {
        case '+': return roundToTwo(num1 + num2);
        case '-': return roundToTwo(num1 - num2);
        case '*': return roundToTwo(num1 * num2);
        case '/': 
            if (num2 === 0) {
                alert('Error: Division by 0');
                resetCalculator();
                return;
            }
            return roundToTwo(num1 / num2);
        case '%': return roundToTwo(num1 % num2);
        case '^': return roundToTwo(num1 ** num2);
    }
}

function evaluate(){
    if (operator === null || refreshScreen) return;
    num2 = largeScreen.textContent;
    smallScreen.textContent = `${num1} ${operator} ${num2} =`;
    largeScreen.textContent = operate(Number(num1),operator,Number(num2));
    operator = null;
    refreshScreen = true;
}

// Event handler for button clicks
function handleButtonClick(buttonValue) {
    if (onlyNum.includes(buttonValue)){
        if(refreshScreen){
            largeScreen.textContent = '';
            refreshScreen = false;
        }
        if (!isScreenLimitReached(largeScreen.textContent)) {
            largeScreen.textContent += buttonValue;
        }
    } else if (onlyOpe.includes(buttonValue)|| buttonValue === 'EXP'){
        if (operator !== null) evaluate();
        num1 = largeScreen.textContent;
        (buttonValue !== 'EXP') ? operator = buttonValue : operator = '^'
        smallScreen.textContent = `${num1} ${operator}`;
        refreshScreen = true;
    } else if (buttonValue === '='){
        evaluate();
    } else if (buttonValue === 'C'){
        largeScreen.textContent = "";
        smallScreen.textContent = "";
        num1 = "";
        num2 = "";
        operator = null;
    } else if (buttonValue === 'DEL'){
        largeScreen.textContent = largeScreen.textContent.slice(0, -1);
    } else if (buttonValue === '+/-'){
        if (largeScreen.textContent === "") return;
        if (largeScreen.textContent.startsWith("-")) {
            largeScreen.textContent = largeScreen.textContent.slice(1);
        } else {
            largeScreen.textContent = "-" + largeScreen.textContent;
        }
    } else if (buttonValue ==='%'){
        if (largeScreen.textContent === "") return;
        const number = parseFloat(largeScreen.textContent);
        const percentage = number / 100;
        largeScreen.textContent = percentage.toFixed(2);
    } else if (buttonValue ==='.'){
        if (refreshScreen) {
            largeScreen.textContent = "0";
            refreshScreen = false;
        }
        if (!largeScreen.textContent.includes(".")) {
        largeScreen.textContent += ".";
        }
    }
}

// Attach event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});

// Initialize calculator
resetCalculator();

//Keyboard setup
document.addEventListener("keydown", handleKeyInput);

function handleKeyInput(e) {
    let eKey;
    if (e.key === 'C' || e.key === 'Escape'){
        eKey = 'C'
    } else if (e.key === 'Backspace'){
        eKey = 'DEL'
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault(); // Prevent form submission if inside a form
    }else {
        eKey = e.key;
    }
    handleButtonClick(eKey);
}
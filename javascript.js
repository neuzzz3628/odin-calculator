let num, operator, anotherNum;
num = 3;
operator = "+"
anotherNum = 5
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(operator, num1, num2) {
    const arr = { "+": add(num1, num2), 
                  "-": subtract(num1, num2), 
                  "*": multiply(num1, num2), 
                  "/": divide(num1, num2) }
    return arr[operator];
};

console.log(operate(operator, num, anotherNum));
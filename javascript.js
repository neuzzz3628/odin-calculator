let num = 0, operator = "+", anotherNum= 0, operatorCount = 0;
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

//Codes that work with HTML
function checkScreenLimit(onScreen){
    if(onScreen < 25){
        return true;
    }
    return false;
}

function checkInput(input){
    switch (true){
        // case (input === "="):
        //     console.log("You clicked =");
        //     operate(operator, num, anotherNum);
        //     break;
        case (onlyNum.includes(input)):
            if (screen.textContent === "0"){
                screen.textContent = button.textContent;
                console.log("Starting");
            }else{
                screen.textContent += button.textContent;
                console.log("Adding number")
            }
            break;
        case (onlyOpe.includes(input)):
            if (screen.textContent.slice(-1) === input){
                console.log("OpeLast.1 case works");
            }else if(screen.textContent.includes(input)){
                console.log("HasOpe.2 case works");
            }
            break;
        case (input === "DEL"):
            console.log("DEL case works");
            break;
        case (input === "C"):
            console.log("C case works");
            break;
        case (input === "+/-"):
            console.log("Positive/Negative case works");
            break;
        case (input === "EXP"):
            console.log("exp case works");
            break;
        case (input === "%"):
            console.log("% case works");
            break;
    }
}

function addToScreen(button){
    button.addEventListener("click", () => {
        if (button.textContent === "="){
            console.log("You clicked =")
            // operate();
        } else{
            if (checkScreenLimit(screen.textContent.length)){
                checkInput(button.textContent);
            }
        }
    })
}
const onlyNum = '0123456789';
const onlyOpe = '+-*/';

let input;
const screen = document.querySelector(".screen");
const prev = document.querySelector(".prev");
const btn = document.querySelectorAll("button");

btn.forEach((button) => addToScreen(button))
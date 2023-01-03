const numbers = document.querySelectorAll("[data-number]")
const operators = document.querySelectorAll("[data-operator]")
const equalsBtn = document.querySelector("#equals-btn")
const clearBtn = document.querySelector("#clear-btn")
const deleteBtn = document.querySelector("#delete-btn")
const negativeBtn = document.querySelector("#negative")
const display = document.getElementById("display")
const extraOperators = document.querySelectorAll(".extra-operator")
const indexBtn = document.querySelector(".indexed")

let oldValues = []
let newValues = []
let squareRootFlag = false
let hasOperators = false
let operation = ""
let equated = false
let negativeFlag = false
let squareFlag = false
let indexFlag = false
let extraOperatorsFlag = false

// ********** START OF EVENT LISTENERS

numbers.forEach(function(n){
    n.addEventListener("click", function(){
        if(equated){
            setupCalc()
        }
        if(hasOperators){
            if(!negativeFlag){
                display.textContent = ""
            }
            hasOperators = false
        }
        display.textContent += n.textContent;
    })
})

operators.forEach(function(operator){
    operator.addEventListener("click", function(){
        oldValues.push(handleNegative(display.textContent))
        display.textContent = ""
        switch (printOperator(operator)) {
            case "+":
                operation = "a"
                break;
            case "-":
                operation = "s";
                break;
            case "*":
                operation = "m";
                break;
            case "/":
                operation = "d";
                break;
        }
        display.textContent = printOperator(operator)
        hasOperators = true
    })
})

extraOperators.forEach(function(eOp){
    eOp.addEventListener("click", function(){
        extraOperatorsFlag = true
        display.textContent += printOperator(eOp)
        if(printOperator(eOp) === "√"){
            squareRootFlag = true
        } else if(printOperator(eOp) === "^2"){
            squareFlag = true
        } else if(printOperator(eOp) === "^"){
            indexFlag = true
        }
    })
})

indexBtn.addEventListener("click", function(){
    oldValues.push(display.textContent)
    console.log(oldValues[0]);
    hasOperators = true
})

negativeBtn.addEventListener("click", function () {
    display.textContent = "";
    display.textContent += "(-)";
    negativeFlag = true;
});

// todo switch off other flags after usage

deleteBtn.addEventListener("click", function(){
    display.textContent = display.textContent.slice(0, -1)
})

equalsBtn.addEventListener("click", function(){
    if(extraOperatorsFlag){
        if (squareRootFlag) {
            oldValues.push(display.textContent);
            display.textContent = squareRoot(oldValues[0].slice(1));
        } else if(squareFlag){
            oldValues.push(display.textContent)
            display.textContent = handlePowers(oldValues[0].slice(0, -2), 2)
        } else if(indexFlag){
            oldValues.push(display.textContent);
            console.log(oldValues[1]);
            display.textContent = handlePowers(oldValues[0].slice(0, -1), oldValues[1]);
        }
    } else {
        oldValues.push(handleNegative(display.textContent));
        switch (operation) {
            case "a":
                display.textContent = addStuff(parseInt(oldValues[0]), parseInt(oldValues[1])
                );
                break;
            case "s":
                display.textContent = subtractStuff(parseInt(oldValues[0]), parseInt(oldValues[1])
                );
                break;
            case "m":
                display.textContent = multiplyStuff(parseInt(oldValues[0]), parseInt(oldValues[1])
                );
                break;
            case "d":
                display.textContent = divideStuff(parseInt(oldValues[0]), parseInt(oldValues[1])
                );
                break;
        }
    }
    oldValues = []
    display.textContent = formatAnswer(parseFloat(display.textContent));
    equated = true
})

clearBtn.addEventListener("click", setupCalc);

// *********** END OF EVENT LISTENERS

// *********** START OF FUNCTIONS

function printOperator(o){
    if(o.classList.contains("multiply")){
        return "*"
    } else if(o.classList.contains("divide")){
        return "/"
    } else if(o.classList.contains("equals")){
        return display.textContent
    } else if(o.classList.contains("sq-root")){
        return "√";
    } else if(o.classList.contains("squared")){
        return "^2";
    }  else if(o.classList.contains("indexed")){
        return "^";
    } else {
        return o.innerText
    }
}

function transferStuff(arr1, arr2){
    for(let j = 0; j < arr1.length; j++){
        arr2[j] = arr1[j]
    }
}

function addStuff(arg1, arg2){
    return arg1 + arg2
}

function subtractStuff(arg1, arg2){
    return arg1 - arg2
}

function multiplyStuff(arg1, arg2){
    return arg1 * arg2;
}

function divideStuff(arg1, arg2) {
    return arg1 / arg2;
}

function squareRoot(arg){
    return Math.sqrt(arg)
}

function evaluateContent(arr){
    let var1 = arr[0]
    let op = arr[1]
    let var2 = arr[2]
    let result = eval(`${var1} ${op} ${var2}`)
    formatAnswer(result)
}

function formatAnswer(ans){
    if (Number.isInteger(ans)) {
        return ans;
    } else {
        return ans.toFixed(3);
    }
}

function setupCalc(){
    display.textContent = "";
    oldValues = [];
    newValues = [];
    hasOperators = false;
    squareRootFlag = false;
    operation = "";
    equated = false
    negativeFlag = false
    squareFlag = false;
    indexFlag = false;
    extraOperatorsFlag = false;
}

function handleNegative(arg){
    if(arg.slice(0,3) === "(-)"){
        return arg.slice(3) * -1
    } else {
        return arg
    }
}

function handlePowers(x, y){
    return x**y
}

// *********** END OF FUNCTIONS

// *********** TEST AREA ************************

// const symbolas = ["0", "/", "9"]
// console.log(evaluateContent(symbolas));
// const arragans = ["90", "41"]

// transferStuff(arragans, symbolas)
// console.log(symbolas);

// console.log(hasOperators(symbolas));
// console.log(evaluateContent(symbolas));

// console.log(eval("-4 * -3"));

// console.log(squareRoot(4));

// console.log(extraOperators);

// console.log(eval("√(4)"));

// const textTry = "joemama"

// console.log(textTry.slice(0, -3));

// console.log(handleNegative("(-)57"));

// console.log(eval("-14 - -12"));

// const textTry = "14 + 150"

// console.log(evalBracket(textTry));

// console.log(handlePowers(1000001, 0.5));

// ********** END OF TEST AREA *******************
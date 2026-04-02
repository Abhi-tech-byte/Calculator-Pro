function add(a,b){
    return a+b;
};

function substract(a,b){
    return a-b;
};

function multiply(a,b){
    return a*b;
};

function divide(a,b){
    return  a/b; 
}

// const num1= Number(prompt("Enter the first number "));
// const num2=Number(prompt("Enter the second number"));
// const operator=prompt("Enter the operator");

function operate (num1,num2,operator){
    if(operator=="+"){
        return add(num1,num2);
    }
    if(operator=="-"){
        return substract(num1,num2);
    }
    if(operator=="*"){
        return multiply(num1,num2);
    }
    if(operator=="/"){
        return divide(num1,num2);
    }
   
}
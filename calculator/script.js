class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear(); //we want to have a clear calculator every time we start the calculator
    }

    clear(){
        this.currentOperand = ''; 
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        //if the number clicked is a . AND the current operand already includes a ., return aka stops the function from executing and 
        //won't append the number (the number being the . )
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return; //if the current operand, aka you have not entered any number, do not execute the operation funciton
        if(this.previousOperand != ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand); //these two lines are turning the strings back to numbers
        const current = parseFloat(this.currentOperand);
        //if the user doesn't enter anything and just clicks the equal, we don't want the code to actually run anything
        //if the previous number OR the current number is not a number, don't execute the function
        if(isNaN(prev) || isNaN(current)) return; 

        //switch is like a bunch of if statements but on a single object
        //if this.operation is +, do that. if this.operation is -, do that, etc
        switch(this.operation){
            case '+': 
                computation = prev + current;
                break //means don't follow any of the other case statements and just leave the switch statment completely

            case '-':
                computation = prev-current;
                break
            case '*':
                computation = prev*current;
                break
            case '/':
                computation = prev / current;
                break
            default: //anytime NONE of the case is executed, the default gets executed, like an else
                //just return, because if the operation is not one of the four above, it is an invalid operation
                return;
                
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else{
            this.previousOperandTextElement.innerText = this.previousOperand;
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', (button) => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', (button) => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', (button) => {
    calculator.delete();
    calculator.updateDisplay();
})
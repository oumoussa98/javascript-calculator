// Global variables
let answer = null;
let error = null;
let operators = [];
let pass = true;

// this variable holds the first number in the array numbers before pushing it
let numbersString = null;
// this variable holds the rest of the statment before pushing it to the statement
let statementString = null;

let numbers = [];
let previousValue = null;

function handleCalculations() {
	// reset variables
	reset();
	// get the input value
	let statement = document.getElementById("statement").value;
	// get all numbers and operators separately
	for (let i = 0; i < statement.length; i++) {
		// reset
		numbersString = "";
		statementString = "";

		if (
			statement[i] === "+" ||
			statement[i] === "-" ||
			statement[i] === "*" ||
			statement[i] === "/"
		) {
			if (
				statement[i + 1] === "+" ||
				statement[i + 1] === "-" ||
				statement[i + 1] === "*" ||
				statement[i + 1] === "/"
			)
				break;
			// check for the first string if it's an operator of type - or +
			if (pass && (statement[0] === "+" || statement[0] === "-")) {
				pass = false;
				continue;
			}
			operators.push(statement[i]);
			for (let k = 0; k < i; k++) {
				numbersString = numbersString.concat(statement[k]);
			}
			numbers.push(parseFloat(numbersString));
			for (let j = i + 1; j < statement.length; j++) {
				statementString = statementString.concat(statement[j]);
			}
			statement = statementString;
			i = 0;
		}
		if (i === statement.length - 1) {
			numbers.push(parseFloat(statement));
		}
	}

	// get the answer
	calculate(numbers, operators);
	// display the answer
	displayAnswer(answer);
}

function calculate(numbers, operators) {
	// priority for * and /
	for (i = 0; i < numbers.length; i++) {
		switch (operators[i]) {
			case "*":
				answer = numbers[i] * numbers[i + 1];
				numbers[i] = answer;
				numbers.splice(i + 1, 1);
				operators.splice(i, 1);
				i--;

				break;
			case "/":
				answer = numbers[i] / numbers[i + 1];
				numbers[i] = answer;
				numbers.splice(i + 1, 1);
				operators.splice(i, 1);
				i--;
				break;
		}
	}
	// then + and -
	for (i = 0; i < numbers.length; i++) {
		switch (operators[i]) {
			case "+":
				if (i === 0) {
					answer = previousValue = numbers[i] + numbers[i + 1];
				} else {
					previousValue = answer = previousValue + numbers[i + 1];
				}
				break;
			case "-":
				if (i === 0) {
					answer = previousValue = numbers[i] - numbers[i + 1];
				} else {
					previousValue = answer = previousValue - numbers[i + 1];
				}
				break;
		}
	}
}

function reset() {
	answer = null;
	error = null;
	operators = [];
	numbersString = null;
	statementString = null;
	numbers = [];
	previousValue = null;
	pass = true;
}

function displayAnswer(answer) {
	if (isNaN(answer) || answer === null) {
		answer = "syntax error";
	}
	let el = document.querySelector(".answer");
	el.setAttribute("data-after", answer);
}

function append(string) {
	let input = document.getElementById("statement");
	if (string === "ac") {
		input.value = "";
		let el = document.querySelector(".answer");
		el.setAttribute("data-after", "");
	} else if (string === "del") {
		let input = document.getElementById("statement");
		let newValue = input.value.slice(0, -1);
		input.value = newValue;
	} else input.value = input.value + string;
}

// show the answer when pressing enter key
document.getElementById("statement").addEventListener("keypress", function (e) {
	if (e.key === "Enter") {
		handleCalculations();
	}
});

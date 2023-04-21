// Pick all elements from html into Javascript project
// Create logic for picking out each element
// Check is user has won
// Restart game upon next click


const computerChoiceDisp = document.getElementById("computer-choice");
const userChoiceDisp = document.getElementById("user-choice");
const result = document.getElementById("result");
const possibleChoices = document.querySelectorAll("button");
const count = possibleChoices.length;
let userChoice;
let computerChoice;


// Display user choice
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener("click", (e) => {
    userChoice = e.target.id;
    userChoiceDisp.innerHTML = userChoice;

    result.innerHTML = "";
    generateComputerChoice();
}))

// Display computer's choice
const generateComputerChoice = () => {
    const choices = ["rock", "paper", "scissors"];
    const randomNum = Math.floor(Math.random() * choices.length); // Generates a random index from 0 to 2
    computerChoice = choices[randomNum];

    computerChoiceDisp.innerHTML = computerChoice;

    getResult();
}

// Did user win
const getResult = () =>{
    if (computerChoice === userChoice)
        result.innerHTML = "It's a draw!";
    if (computerChoice === "rock" && userChoice === "scissors")
        result.innerHTML = "You Lose!";
    if (computerChoice === "paper" && userChoice === "rock")
        result.innerHTML = "You Lose!";
    if (computerChoice === "scissors" && userChoice === "paper")
        result.innerHTML = "You Lose!";
    if (computerChoice === "scissors" && userChoice === "rock")
        result.innerHTML = "You Win!";
    if (computerChoice === "rock" && userChoice === "paper")
        result.innerHTML = "You Win!";
    if (computerChoice === "paper" && userChoice === "scissors")
        result.innerHTML = "You Win!";
}
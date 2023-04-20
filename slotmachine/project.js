// 1. Deposit Money
// 2. Determine number of lines to bet
// 3. Collect bet amount
// 4. Spin the slot machine
// 5. Check if user won
// 6. Give use their winnings or take losses
// 7. Play again

// User input via installed package
const prompt = require("prompt-sync")();

// Declare and define global variables
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
};
 
// Modern way of writting functions in Javascript
// 1. Deposit Money
const deposit = () => {
    while(true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numDepositAmount = parseFloat(depositAmount);

        if (isNaN(numDepositAmount) || numDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again!");
        }
        else {
            return numDepositAmount;
        }
    }
};

// 2. Determine number of lines to bet
const getNumberOfLines = () => {
    while(true) {
        const lines = prompt("Enter number of line(s) to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid line(s) amount, try again!");
        }
        else {
            return numberOfLines;
        }
    }
};

// 3. Collect bet amount
const getBet = (balance, lines) => {
    while(true) {
        const bet = prompt("Enter the bet per line: ");
        const numberOfBet = parseFloat(bet);

        if (isNaN(numberOfBet) || numberOfBet <= 0 || numberOfBet > (balance / lines) ) {
            console.log(" Invalid bet amount, try again!");
        }
        else {
            return numberOfBet;
        }
    } 
};

// 4. Spin the slot machine
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

//  Transpose array to represent actual row and column per play
const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

// Print rows after transposing
const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

// 5. Check if user won
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings
};

// 6. Give use their winnings or take losses
const game = () => {
    let balance = deposit();

    while (true) {
        console.log("You have a balance of $" + balance);

        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;

        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);

        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won, $" + winnings.toString() + "\n");

        if (balance <= 0) {
            console.log("You ran out of money!\n")
            break;
        }
        // 7. Play again
        const playAgain = prompt("Do you want to play again (y/n)?")
        if (playAgain != "y") break;
    }
};

game();
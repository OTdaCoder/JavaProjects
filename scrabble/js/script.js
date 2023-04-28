const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert('Times Up! ${correctWord.toUpperCase()} was the correct word');
        initGame(); // Restart timer after time runs out
    }, 1000);
}

const initGame = () => {
    initTimer(30); // calling initTimer sunction with passing 30 sec as maxTime value
    let randomObj = words[Math.floor(Math.random() * words.length)]; // Getting random object from words
    let wordArray = randomObj.word.split(""); // Splitting each letter of random word
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Getting random number
        // Shuffling and swiping wordArray letters randomly
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join(""); // Passing shuffled word as word text
    hintText.innerText = randomObj.hint; // Passing hint as word text
    correctWord = randomObj.word.toLocaleLowerCase(); // Passing random word to correction
    inputField.value = ""; // Making input field empty
    inputField.setAttribute("maxlength", correctWord.length); // Setting input max attr value to word length 
    console.log(wordArray, randomObj.word); 
}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();

    if (!userWord)
        return alert('Please enter a word');

    if (userWord !== correctWord)
        return alert('Oops! ${userWord} is not a correct word');

    alert('Congrats! ${userWord.toUpperCase()} is the correct word');
    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
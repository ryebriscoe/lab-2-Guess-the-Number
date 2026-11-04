// Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;
const MAX_ATTEMPTS = 7;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random number:" + randomNumber);
    attempts = 0;

    //hiding the Reset button
    document.querySelector("#resetBtn").style.display = "none";

    //showing the Guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); 
    playerGuess.value = ""; //clearing the textbox

    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; //clearing the feedback

    //clearing previous guesses
    document.querySelector("#guesses").textContent = "";
    updateAttemptsLeft();
}

// Function checkGuess
function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = Number(document.querySelector("#playerGuess").value);
    console.log("Player guess: " + guess);

    // Only whole numbers from 1 to 99 are allowed
    if (!Number.isInteger(guess) || guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    console.log("Attempts:" + attempts);
    feedback.style.color = "orange";
    updateAttemptsLeft();
    document.querySelector("#guesses").textContent += guess + " ";

    if (guess === randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "darkgreen";

        wins++;
        document.querySelector("#wins").textContent = wins;

        gameOver();
    } else {
        if (attempts === MAX_ATTEMPTS) {
            feedback.textContent = "Sorry, you lost! The number was " + randomNumber;
            feedback.style.color = "red";

            losses++;
            document.querySelector("#losses").textContent = losses;

            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}


function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; 
    resetBtn.style.display = "inline"; 
}

function updateAttemptsLeft() {
    let attemptsLeft = MAX_ATTEMPTS - attempts;
    document.querySelector("#attemptsLeft").textContent = attemptsLeft;
}

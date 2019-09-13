/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber () {
    //Create a number between 1 - 100. This must persist through the game.
    return Math.floor(Math.random() * (100) + 1);
}

function shuffle(arr){
    var remaining = arr.length, randomNum, temp;
    while (remaining) {
        //get random number
        randomNum = Math.floor(Math.random() * remaining--);

        //now we need to move the random number to the back
        temp = arr[remaining];
        //move random to back
        arr[remaining] = arr[randomNum];
        //move back to remaining unshuffled part of array
        arr[randomNum] = temp;
    }
    return arr;
}

class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }
    difference() {
        return Math.abs(this.winningNumber - this.playersGuess);
    }
    isLower() {
        return (this.playersGuess < this.winningNumber);
    }
    playersGuessSubmission(num) {
        if (isNaN(num) || num < 1 || num > 100) {
            // eslint-disable-next-line no-throw-literal
            throw 'That is an invalid guess.';
        }

        this.playersGuess = num;
        return this.checkGuess(num);
    }
    checkGuess(num) {
        if (num === this.winningNumber) {
            return 'You Win!';
        } else {
            let returnString = '';
            let theDifference = this.difference();
            if (this.pastGuesses.includes(num)) {
                returnString = 'You have already guessed that number.';
            } else if (theDifference < 10){
                returnString = "You're burning up!";
            } else if (theDifference < 25) {
                returnString = "You're lukewarm.";
            } else if (theDifference < 50) {
                returnString = "You're a bit chilly.";
            } else {
                returnString = "You're ice cold!";
            }
            this.pastGuesses.push(num);
            if (this.pastGuesses.length === 5) {
                returnString = 'You Lose.';
            }
            return returnString;
        }
    }
    provideHint() {
        let shuffleArr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
       console.log(shuffleArr);
        return shuffle(shuffleArr);
    }
}

function newGame() {
    return new Game();
}

const submission = document.getElementById('submission');
const submit = document.getElementById('btn-submit');
const response = document.getElementById('response');
const guesses = document.getElementById('guesses');
const restart = document.getElementById('btn-restart');
const hint = document.getElementById('btn-hint');
const maurice = document.getElementById('maurice');
let game = newGame();

function reset() {
    submission.value = '';
    response.innerText = '';
    document.getElementById('hints').innerHTML = null;
    maurice.src = './images/maurice-unimpressed.png';
    guesses.innerHTML = null;
    game = newGame();
}

submit.addEventListener('click', function () {
    let result = game.playersGuessSubmission(parseInt(submission.value, 10));
    guesses.innerHTML += `<li>${submission.value}</li>`;

    if (result === 'You Win!') {
        maurice.src = './images/maurice-happy.png';
    } else if (result === 'You have already guessed that number.' || result === "You're a bit chilly." || result === "You're ice cold!") {
        maurice.src = './images/maurice-angry.png';
    } else if (result === "You're lukewarm." || result === "You're burning up!" ) {
        maurice.src = './images/maurice-annoyed.png';
    } else  {
        maurice.src = './images/maurice-unimpressed.png';
    }

    if (result === 'You Win!' || result === 'You Lose.') {
        reset();
    }
    response.innerText = result;
});

restart.addEventListener('click', function() {
    reset();
});

hint.addEventListener('click', function() {
    let hintArr = game.provideHint();
    const hintList = document.getElementById('hints');
    hintList.innerHTML = `<li><strong>Hints:</strong></li>`;
    hintArr.forEach(function(item) {
        hintList.innerHTML += `<li>${item}</li>`;
    });
});

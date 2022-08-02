"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const scoreEl0 = document.querySelector("#score--0");
const scoreEl1 = document.querySelector("#score--1");
const currentEl0 = document.querySelector("#current--0");
const currentEl1 = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, gameIsActive;

function init() {
    // Starting conditions
    gameIsActive = true;
    activePlayer = 0;

    scores = [0, 0];
    currentScore = 0;

    scoreEl0.textContent = 0;
    scoreEl1.textContent = 0;
    currentEl0.textContent = 0;
    currentEl1.textContent = 0;

    diceEl.classList.add("hidden");
    document.querySelector("#name--0").textContent = "Jogador 1";
    document.querySelector("#name--1").textContent = "Jogador 2";

    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
}
init();

function changePlayerCurrentScore(newScore) {
    document.querySelector(`#current--${activePlayer}`).textContent = newScore;
}

function switchPlayer() {
    currentScore = 0;
    changePlayerCurrentScore(0);

    document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle("player--active");

    activePlayer = activePlayer === 0 ? 1 : 0;

    document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle("player--active");
}

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
    if (gameIsActive) {
        // 1. Generating a random dice
        const dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for rolled 1
        if (dice !== 1) {
            // Add dice to the score
            currentScore += dice;
            changePlayerCurrentScore(currentScore);
        } else {
            // Swith active player
            switchPlayer();
        }
    }
});

// Add the current score in active player total score and switch player.
btnHold.addEventListener("click", function () {
    if (gameIsActive) {
        // Get the current score and add to total score
        scores[activePlayer] += currentScore;

        //Display the total score of the active player
        document.querySelector(`#score--${activePlayer}`).textContent =
            scores[activePlayer];
    }

    // Win conditions
    if (scores[activePlayer] >= 100) {
        gameIsActive = false;
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add("player--winner");

        document.querySelector(`#name--${activePlayer}`).textContent =
            "Vencedor";

        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove("player--active");

        diceEl.classList.add("hidden");
    } else switchPlayer();
});

// Restart the game
btnNew.addEventListener("click", init);

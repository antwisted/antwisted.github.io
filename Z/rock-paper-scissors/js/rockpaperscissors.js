'use strict';

function getInput() {
    console.log("Please choose either 'rock', 'paper', or 'scissors'.");
    var x = prompt().toLowerCase();
    if (x !== "rock" && x !== "scissors" && x !== "paper") {
        console.log("Your input was invalid. Please try again.");
        return getInput();
    }
    return x;
}

function randomPlay() {
    var randomNumber = Math.random();
    if (randomNumber < 0.33) {
        return "rock";
    } else if (randomNumber < 0.66) {
        return "paper";
    } else {
        return "scissors";
    }
}

function getPlayerMove(move) {
    return move || getInput();
}

function getComputerMove(move) {
    return move || randomPlay();
}

function getWinner(playerMove, computerMove) {
    var winner;
    
    if (playerMove === computerMove) {
        winner = "tie";
    } else if (((playerMove === "rock") && (computerMove === "scissors")) ||
        ((playerMove === "scissors") && (computerMove === "paper")) ||
        ((playerMove === "paper") && (computerMove === "rock"))) {
        winner = "player";
        } else {
        winner = "computer";
        }
    return winner;
}

function playToX(z) {
    console.log("Let's play Rock, Paper, Scissors!");
    var playerWins = 0,
        computerWins = 0;

    while (playerWins < z && computerWins < z) {
        var cpuMove = getComputerMove(),
            y = getWinner(getPlayerMove(), cpuMove);
        switch (y) {
            case "player":
                console.log("Computer played " + cpuMove + ". Player wins!");
                playerWins += 1;
                break;
            case "computer":
                console.log("Computer played " + cpuMove + ". Computer wins!");
                computerWins += 1;
                break;
            case "tie":
                console.log("It's a tie...");
                break;
            default:
                console.log("There is an error in the code. Please try again.");
        }
    console.log("Current score: Player - " + playerWins + "  VS  Computer - " + computerWins); 
    }
    console.log("Reaching " + z + " wins first, the winner is... " + (playerWins === z ? "Player!" : "Computer!"));
    return [playerWins, computerWins];
}
playToX(5);
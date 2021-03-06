const imgButtons = document.querySelectorAll('.rps-buttons');
const buttonNode = document.querySelector('#computer-img');
const rockBtn = document.querySelector('#rock');
const paperBtn = document.querySelector('#paper');
const scissorsBtn = document.querySelector('#scissors');

const compRock = document.querySelector('#comp-rock');
const compPaper = document.querySelector('#comp-paper');
const compScissors = document.querySelector('#comp-scissors');

const playerScoreDis = document.querySelectorAll('.player-circle');
const compScoreDis = document.querySelectorAll('.comp-circle');

const message = document.querySelector('#message');

const nextRoundButton = document.createElement('button');
nextRoundButton.textContent = 'Next Round';

const reset = document.querySelector('#reset-button');
const resetButton = document.createElement('button');
resetButton.textContent = 'Play Again?';

let playerScore = 0;
let computerScore = 0;


imgButtons.forEach((button) => {

    button.addEventListener('click', async () => {
        const computerThrow = computerPlay();
        const outcome = playRound(button.id, computerThrow);
        if (button.id === 'rock') {
            paperBtn.style.opacity = "0";
            scissorsBtn.style.opacity = "0";
            rockBtn.style.pointerEvents = "none";
            paperBtn.style.pointerEvents = "none";
            scissorsBtn.style.pointerEvents = "none";
            await sleep(600);
            button.style.transform = "translate(50px, 0px)";
            await sleep(800);
            displayCompThrow(computerThrow);
        } else if (button.id === 'paper') {
            rockBtn.style.opacity = "0";
            scissorsBtn.style.opacity = "0";
            rockBtn.style.pointerEvents = "none";
            paperBtn.style.pointerEvents = "none";
            scissorsBtn.style.pointerEvents = "none";
            await sleep(600);
            button.style.transform = "translate(-370px, 0px)";
            await sleep(800);
            displayCompThrow(computerThrow);
        } else if (button.id === 'scissors') {
            rockBtn.style.opacity = "0";
            paperBtn.style.opacity = "0";
            rockBtn.style.pointerEvents = "none";
            paperBtn.style.pointerEvents = "none";
            scissorsBtn.style.pointerEvents = "none";
            await sleep(600);
            button.style.transform = "translate(-790px, 0px)";
            await sleep(800);
            displayCompThrow(computerThrow);
        }

        await sleep (800);


        message.textContent = outcome;
        message.appendChild(nextRoundButton);
        // place console.log parameter above into a variable. 
        // round result adds a point to either player or comp
        // if and when score hits 5, display winner and ask for rematch?
        calcScore(outcome);

        
        if (playerScore === 5 || computerScore === 5) {
            if (playerScore > computerScore) {
                message.textContent = 'VICTORY! You beat the computer ' + playerScore + ' to ' + computerScore; 
                
                
            } else if (playerScore < computerScore) {
                message.textContent = 'DEFEAT! The computer beat you ' + computerScore + ' to ' + playerScore;
            }
            message.appendChild(resetButton);
            
        }

    })

})

function displayCompThrow(selection) {
    if (selection === 'rock') {
        compRock.classList.add('transition-class');
    } else if (selection === 'paper') {
        compPaper.classList.add('transition-class-paper');
    } else if (selection === 'scissors') {
        compScissors.classList.add('transition-class');
    }
}

nextRoundButton.addEventListener('click', () => {
    compRock.classList.remove('transition-class');
    compPaper.classList.remove('transition-class-paper');
    compScissors.classList.remove('transition-class');
    rockBtn.style.opacity = "1";
    paperBtn.style.opacity = "1";
    scissorsBtn.style.opacity = "1";
    rockBtn.style.pointerEvents = "auto";
    paperBtn.style.pointerEvents = "auto";
    scissorsBtn.style.pointerEvents = "auto";
    rockBtn.style.transform = "none";
    paperBtn.style.transform = "none";
    scissorsBtn.style.transform = "none";
    message.removeChild(nextRoundButton);
    message.textContent = "Make your pick:";
})

resetButton.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    for (i = 0; i < 5; i++) {
        compScoreDis[i].style.backgroundColor = "#b9d6d2";
        playerScoreDis[i].style.backgroundColor = "#b9d6d2";
    }
    compRock.classList.remove('transition-class');
    compPaper.classList.remove('transition-class-paper');
    compScissors.classList.remove('transition-class');
    rockBtn.style.opacity = "1";
    paperBtn.style.opacity = "1";
    scissorsBtn.style.opacity = "1";
    rockBtn.style.pointerEvents = "auto";
    paperBtn.style.pointerEvents = "auto";
    scissorsBtn.style.pointerEvents = "auto";
    rockBtn.style.transform = "none";
    paperBtn.style.transform = "none";
    scissorsBtn.style.transform = "none";
    message.removeChild(resetButton);
    message.textContent = "Make your pick:";
})




function computerPlay() {
    const myArray = [
        'rock',
        'paper',
        'scissors'
    ];

    const randomPick = myArray[Math.floor(Math.random() * myArray.length)];

    return randomPick;

};

function playRound(playerSelection, computerSelection) {
    const playerPick = playerSelection.toLowerCase();
    const computerPick = computerSelection.toLowerCase();



    if (playerPick === 'rock') {
        if (computerPick === 'rock') {
            return 'It\'s a tie!';
        } else if (computerPick === 'paper') {
            return 'Aww. You suck. Paper beats Rock.';
        } else {
            return 'Nice! Rock beats Scissors.';
        }
    } else if (playerPick === 'paper') {
        if (computerPick === 'rock') {
            return 'Nice! Paper beats Rock.';
        } else if (computerPick === 'paper') {
            return 'It\'s a tie!';
        } else {
            return 'Aww. You suck. Scissors beats Paper.';
        }
    } else if (playerPick === 'scissors') {
        if (computerPick === 'rock') {
            return 'Aww. You suck. Rock beats Scissors.';
        } else if (computerPick === 'paper') {
            return 'Nice! Scissors beats Paper.';
        } else {
            return 'It\'s a tie!';
        }
    }

}


function calcScore(outcome) {
    if (outcome.charAt(0) === 'A') {

        compScoreDis[computerScore++].style.backgroundColor = "white";
    } else if (outcome.charAt(0) === 'N') {
        playerScoreDis[playerScore++].style.backgroundColor = "white";
    } else {
        console.log('tie');
    }

}


const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

// calcResults function calcs the score and should return a victory or defeat message
function calcResults(result1, result2, result3, result4, result5) {
    let playerScore = 0;
    let computerScore = 0;

    if (result1.charAt(0) === 'A') {
        computerScore++;
    } else if (result1.charAt(0) === 'N') {
        playerScore++;
    }

    if (result2.charAt(0) === 'A') {
        computerScore++;
    } else if (result2.charAt(0) === 'N') {
        playerScore++;
    }

    if (result3.charAt(0) === 'A') {
        computerScore++;
    } else if (result3.charAt(0) === 'N') {
        playerScore++;
    }

    if (result4.charAt(0) === 'A') {
        computerScore++;
    } else if (result4.charAt(0) === 'N') {
        playerScore++;
    }

    if (result5.charAt(0) === 'A') {
        computerScore++;
    } else if (result5.charAt(0) === 'N') {
        playerScore++;
    }


    if (playerScore > computerScore) {
        return 'VICTORY! You beat the computer ' + playerScore + ' to ' + computerScore;
    } else if (playerScore < computerScore) {
        return 'DEFEAT! The computer beat you ' + computerScore + ' to ' + playerScore;
    } else {
        return 'You tied the computer ' + playerScore + ' to ' + computerScore;
    }


}

/* function game() {
    // run the playRound function 5 times with player input via prompt()

    // player inputs pick
    let playerSelection = prompt('Rock, Paper, or Scissors?', ' ');
    let computerSelection = computerPlay();
    let result1 = playRound(playerSelection, computerSelection);
    console.log(result1);


    playerSelection = prompt('Rock, Paper, or Scissors?', ' ');
    computerSelection = computerPlay();
    let result2 = playRound(playerSelection, computerSelection);
    console.log(result2);


    playerSelection = prompt('Rock, Paper, or Scissors?', ' ');
    computerSelection = computerPlay();
    let result3 = playRound(playerSelection, computerSelection);
    console.log(result3);


    playerSelection = prompt('Rock, Paper, or Scissors?', ' ');
    computerSelection = computerPlay();
    let result4 = playRound(playerSelection, computerSelection);
    console.log(result4);


    playerSelection = prompt('Rock, Paper, or Scissors?', ' ');
    computerSelection = computerPlay();
    let result5 = playRound(playerSelection, computerSelection);
    console.log(result5);

    console.log(calcResults(result1, result2, result3, result4, result5));



    // console returns result of the round along with the score after each round
    // after 5 rounds console reports GAME OVER along with the final score and declared winner



}

*/
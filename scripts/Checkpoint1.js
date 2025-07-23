let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, ties: 0};
let autoPlayState = false;
let intervalId = null;

updateScoreElement();

function handleCostKeydown (event) {
if (event.key === 'Enter') {
    calculateTotal();
}
}

function calculateTotal () {
const inputElement = document.querySelector('.js-cost-input');
let cost = Number(inputElement.value);

if (cost < 40) {
    cost += 10
}

document.querySelector('.js-total-cost').innerHTML = `$${cost}`;
};

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock')
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper')
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors')
});

function restScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
};

document.querySelector('.js-rest-score-button').addEventListener('click', () => {
    restScore()
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
});

function autoPlay() {
    if (autoPlayState) {
        intervalId  = setInterval(() => {
            playGame(pickComputerMove());
        }, 100);
    } else {
        clearInterval(intervalId);
        intervalId = null;
    }
}

const autoPlayButton = document.querySelector('.js-autoplay-button');
autoPlayButton.addEventListener('click', () => {
    autoPlayState = !autoPlayState;

    autoPlayButton.textContent = autoPlayState
    ? 'Autoplay (Running)'
    : 'Autoplay (Stopped)';

    autoPlay();
})

function playGame(playerMove) {
const computerMove = pickComputerMove();

let result = '';

if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
    result = 'You lose.';
    } else if (computerMove === 'paper') {
    result = 'You win.';
    } else {
        result = 'Tie.';
    }

} else if (playerMove === 'paper') {
    if (computerMove === 'scissors') {
    result = 'You lose.';
    } else if (computerMove === 'rock') {
    result = 'You win.';
    } else {
    result = 'Tie.';
    }

} else if (playerMove === 'rock') {
    if (computerMove === 'paper') {
    result = 'You lose.';
    } else if (computerMove === 'scissors') {
    result = 'You win.';
    } else {
    result = 'Tie.';
    }
}

if (result === 'You win.') {
    score.wins += 1;
} else if (result === 'You lose.') {
    score.losses += 1;
} else if (result === 'Tie.') {
    score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));

document.querySelector('.js-result').innerHTML = result;
document.querySelector('.js-moves').innerHTML = `You <img src="assets/${playerMove}-emoji.png" alt="${playerMove}" class="move-icon"> <img src="assets/${computerMove}-emoji.png" alt="${computerMove}" class="move-icon"> Computer`;

updateScoreElement();
}

function updateScoreElement() {
document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
const randomNumber = Math.random();

let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
} else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
} else {
    computerMove = 'scissors';
}
return computerMove;
}

function subscribe () {
const buttonElement = document.querySelector('.js-subscribe-button');

if (buttonElement.innerText === 'Subscribe') {
    buttonElement.innerHTML = 'Subscribed';
    buttonElement.classList.add('is-subscribed');
} else {
    buttonElement.innerHTML = 'Subscribe';
    buttonElement.classList.remove('is-subscribed');
}
}
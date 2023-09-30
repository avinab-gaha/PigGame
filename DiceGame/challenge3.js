/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, btn, gamePlaying = true;


init();
//highscore input
var lastDice, lastDice2;

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScores = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = "none";
    document.querySelector('.dice-2').style.display = "none";
    document.querySelector('#score-0').textContent = "0";
    document.querySelector('#score-1').textContent = "0";
    document.querySelector('#current-0').textContent = "0";
    document.querySelector('#current-1').textContent = "0";
    document.querySelector('#name-0').textContent = "Player 1";
    document.querySelector('#name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

btn = document.querySelector('.btn-roll');
diceImg = document.querySelector('.dice');
diceImg2 = document.querySelector('.dice-2');
holdBtn = document.querySelector('.btn-hold');

//roll btn
btn.addEventListener('click', function () {
    if (gamePlaying) {
        var dice, dice2;
        dice = Math.floor(Math.random() * 6 + 1);
        dice2 = Math.floor(Math.random() * 6 + 1);

        diceImg.style.display = 'block';
        diceImg.src = "dice-" + dice + ".png";
        diceImg2.style.display = 'block';
        diceImg2.src = "dice-" + dice2 + ".png";

        if (dice === 6 && lastDice === 6 || dice2 === 6 && lastDice2 === 6) {
            document.querySelector('#score-' + activePlayer).textContent = "0";
            nextPlayer();
            lastDice = 0;
            lastDice2 = 0;
        }
        else if (dice === 1 || dice2 === 1) {
            //next player
            nextPlayer();
        }
        else {
            //add scores
            roundScores += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        }
        lastDice = dice;
        lastDice2 = dice2;
    }
});

//hold button event listener

holdBtn.addEventListener('click', function () {
    //final score
    if (gamePlaying) {
        scores[activePlayer] += roundScores;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var winningScore;
        var input = document.querySelector('.highscore').value;

        if (input) {
            winningScore = input;
        }
        else {
            winningScore = 100; //default
        }

        //check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".dice-2").style.display = "none";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {

            nextPlayer();
        }
    }
});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;
    current0 = document.querySelector('#current-0').textContent;
    current1 = document.querySelector('#current-1').textContent;
    current0 = 0;
    current1 = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);
// two 6 in a row


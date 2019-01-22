/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//GLOBAL VARIABLES 
let randomNum, dice, activePlayer, scores, isGamePlaying;
let newGameBtn, rollBtn, holdBtn;
let currentScore0, currentScore1, currentScoreSum, globalScore0, globalScore1;
let player0Panel, player1Panel; 

newGameBtn = document.querySelector('.btn-new');
rollBtn = document.querySelector('.btn-roll');
holdBtn = document.querySelector('.btn-hold');
dice = document.querySelector('.dice');
currentScore0 = document.getElementById('current-0');
currentScore1 = document.getElementById('current-1');
globalScore0 = document.getElementById('score-0');
globalScore1 = document.getElementById('score-1');
player0Panel = document.querySelector('.player-0-panel');
player1Panel = document.querySelector('.player-1-panel');

/*-------------------------------------FUNCTIONS----------------------------------------------------*/

const initialise = ()=>{
    dice.style.display = 'none';
    isGamePlaying = true;
    scores = [0,0];
    activePlayer = 0;
    currentScoreSum = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    globalScore0.textContent = 0;
    globalScore1.textContent = 0;
    player0Panel.classList.remove('active');
    player1Panel.classList.remove('active');
    player0Panel.classList.add('active');
}

const rollDice = ()=>{
    randomNum = Math.floor(Math.random()*6)+1;
    dice.style.display = "block";
    dice.src = "die"+randomNum+".png";
}

const changeRoles = ()=>{
    if(activePlayer === 1){
        activePlayer = 0;
        player1Panel.classList.toggle('active');
        player0Panel.classList.toggle('active');
        currentScore1.textContent = 0;
    }
    else{
        activePlayer = 1;
        player0Panel.classList.toggle('active');
        player1Panel.classList.toggle('active');
        currentScore0.textContent = 0;
    }
    dice.style.display = 'none';
    
}

/*---------------------------------------------Program Flow Starts here----------------------------*/
initialise();

rollBtn.addEventListener('click', ()=>{
    if(isGamePlaying){
        rollDice();
        if(randomNum !== 1){
            currentScoreSum += randomNum;
            activePlayer ? currentScore1.textContent = currentScoreSum : currentScore0.textContent = currentScoreSum;
        }
        else {
            changeRoles();
            currentScoreSum = 0;
        }
    }
});

holdBtn.addEventListener('click', ()=>{
    if(isGamePlaying){
        scores[activePlayer] += currentScoreSum;
        if(activePlayer === 1) globalScore1.textContent = scores[activePlayer];
        else globalScore0.textContent = scores[activePlayer];
        currentScoreSum = 0;

        if(scores[activePlayer] >= 20){
            document.querySelector('.player-'+activePlayer+'-panel').classList.add("winner");
            document.getElementById('name-'+activePlayer).textContent = 'WINNER !';
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove("active")
            dice.style.display = 'none';
            isGamePlaying = false;
        }
        else
            changeRoles();
    }
});

newGameBtn.addEventListener('click', initialise);





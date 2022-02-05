(function initApp() {
    render();
})();

function render() {
    const game = document.querySelector('.game');
    game.insertAdjacentHTML('afterbegin',`
    <div class="header-box">
        <img src="./images/logo.svg" alt="rock, paper, scissors logo" />
        <div class="scores">
            <div id="player" class="scoreboard">
                <h4>Player</h4>
                <h5>Score</h5>
                <h3 id="player-score" class="score">0</h3>
            </div>
            <div id="computer" class="scoreboard">
                <h4>Computer</h4>
                <h5>Score</h5>
                <h3 id="computer-score" class="score">0</h3>
            </div>
        </div>
    </div>`);
    const playButton = createElement('button', 'start-btn', 'btn play-btn', 'Play');
    const rulesButton = createElement('button','', 'btn rules-btn', 'Rules');
    playButton.addEventListener('click', (e)=> {
            startGame();
            e.target.remove()
    });
    rulesButton.addEventListener('click', ()=> {
        document.querySelector('.modal').classList.toggle('hidden');
    });
    game.appendChild(playButton);
    game.appendChild(rulesButton);
    const modal = createRulesModal();
    modal.addEventListener('click', (event) => {
        if (event.target == document.querySelector('.modal')) {
            document.querySelector('.modal').classList.toggle('hidden');
        }
    });
    document.body.appendChild(modal);
    document.getElementById('rules-exit').addEventListener('click', ()=> {
        document.querySelector('.modal').classList.toggle('hidden');
    });
}

function createRulesModal() {
    const modalDiv = createElement('div', '', 'modal hidden', '');
    const modalBox = createElement('div', '', 'modal-box', '');
    const rulesBox = createElement('div', '', 'rules', '');
    const modalHeader = createElement('h2', '', '', 'Rules');
    const modalSpan = createElement('span', 'rules-exit', '', 'X');
    rulesBox.appendChild(modalHeader);
    rulesBox.appendChild(modalSpan);
    const modalImg = createElement('img', '', '', '');
    modalImg.setAttribute('src','./images/image-rules.svg');
    modalImg.setAttribute('alt','rules');
    modalBox.appendChild(rulesBox);
    modalBox.appendChild(modalImg);
    modalDiv.appendChild(modalBox);
    
    return modalDiv;
}
function createElement(type = 'div', id, classes, text) {
    const element = document.createElement(type);
    if(id){element.id = id;}
    if(classes){element.className = classes;}
    if(text){element.innerText = text;}    
    return element;
}

function initModal() {
    // document.getElementById('rules-exit').addEventListener('click', ()=> {
    //     document.querySelector('.modal').style.display = "none";
    // });
    
    // window.onclick = function(event) {
    //     if (event.target == document.querySelector('.modal')) {
    //         document.querySelector('.modal').style.display = "none";
    //     }
    // }
}

function startGame() {
    document.querySelector('.game').classList.add('start');
    defaultStart();
}



function deleteOptions(options) {    
    document.querySelector('.helpers').remove();
    document.querySelector('.playground').classList.toggle('choosen');
    for (let i = options.length-1; i > -1; i--) {
        options[i].remove();
    }
    let end = renderComputerChoice(generateComputerChoice(),document.querySelector('.choice').id);
    document.querySelector('.playground').insertAdjacentHTML('afterBegin',end);
    setTimeout(()=>{
        document.querySelector('.playground').classList.toggle('check');
        document.querySelector('.again-btn').addEventListener('click',() => {
            defaultStart();
        })
        document.querySelector('.reset-btn').addEventListener('click',() => {
            document.querySelector('.game').classList.remove('start');
            if(document.querySelector('.playground')){
                document.querySelector('.playground').remove();
            }
            document.getElementById('player-score').innerHTML = 0;
            document.getElementById('computer-score').innerHTML = 0;
            document.getElementById('computer').classList.remove('winning');
            document.getElementById('player').classList.remove('winning');
            document.querySelector('.game').insertAdjacentHTML('beforeend',
            `<button id="start-btn" class="btn play-btn">Play</button>`);
            document.getElementById('start-btn').addEventListener('click', (e)=> {
                startGame();
                e.target.remove()
            });
        })
        },1000);
}

function generateComputerChoice() {
    return Math.floor(Math.random() * 3) + 1;
}
function renderComputerChoice(computerChoice, playerChoice) {
    let dataColor = 'data-color-red';
    let id = 'rock';
    switch(computerChoice){
        case 1:
            dataColor = 'data-color-cyan';
            id = 'paper';
        break;
        case 2:
            dataColor = 'data-color-purple';
            id = 'scissors';
        break;
        case 3:
            dataColor = 'data-color-red';
            id = 'rock';
        break;
    }
    let result = getResult(id, playerChoice);
    const playerScore = document.getElementById('player-score');
    const computerScore = document.getElementById('computer-score');
    switch(result){
        case 'YOU WON!':
            setTimeout(()=> {
                playerScore.innerHTML = (Number(playerScore.innerText) + 1);
                checkForWinner(playerScore,computerScore);
                document.querySelector('.choice').classList.add('winner');
            }, 1000);
            break;
            case 'YOU LOSE!':
            setTimeout(()=>{computerScore.innerHTML = (Number(computerScore.innerText) + 1);
                checkForWinner(playerScore,computerScore);
                document.querySelector('.co-choice').classList.add('winner');},1000)
            break;
            case 'DRAW':
            setTimeout(()=>{
                playerScore.innerHTML = (Number(playerScore.innerText) + 1);
                computerScore.innerHTML = (Number(computerScore.innerText) + 1);
                checkForWinner(playerScore,computerScore);
            },1000)
        break;
        default: break;
    }
    let item = `
    <div class="message">${result}</div>
    <button class="btn again-btn">Play again</button>
    <button class="btn again-btn reset-btn">Reset</button>
    <div id="${id}" class="option co-choice" ${dataColor}>
                    <div class="circle">
                        <img src="./images/icon-${id}.svg" alt="option ${id}" />
                    </div>
                </div>`;
    return item;
}

function getResult(choiceComputer, choicePlayer) {
    if(choiceComputer === choicePlayer){return 'DRAW'}
    if(choiceComputer === 'rock' && choicePlayer === 'paper'){return 'YOU WON!'}
    if(choiceComputer === 'scissors' && choicePlayer === 'paper'){return 'YOU LOSE!'}
    if(choiceComputer === 'paper' && choicePlayer === 'rock'){return 'YOU LOSE!'}
    if(choiceComputer === 'scissors' && choicePlayer === 'rock'){return 'YOU WON!'}
    if(choiceComputer === 'paper' && choicePlayer === 'scissors'){return 'YOU WON!'}
    if(choiceComputer === 'rock' && choicePlayer === 'scissors'){return 'YOU LOSE!'}
}

function checkForWinner(playerScore, computerScore) {
    let numScorePlayer = (Number(playerScore.innerHTML));
    let numScoreComputer = (Number(computerScore.innerHTML));
    console.log(numScorePlayer)
    console.log(numScoreComputer)
    if(numScorePlayer > numScoreComputer){
        document.getElementById('player').classList.add('winning');
        document.getElementById('computer').classList.remove('winning');
    } else if (numScoreComputer > numScorePlayer){
        document.getElementById('computer').classList.add('winning');
        document.getElementById('player').classList.remove('winning');
    } else if (numScorePlayer === numScoreComputer){
        document.getElementById('computer').classList.remove('winning');
        document.getElementById('player').classList.remove('winning');
    }
}



function defaultStart() {
    if(document.querySelector('.playground')){
        document.querySelector('.playground').remove();
    }
    let i = `<div class="playground">
                <div id="paper" class="option" data-color-cyan="">
                    <div class="circle">
                        <img src="./images/icon-paper.svg" alt="option paper">
                    </div>
                </div>
                <div id="scissors" class="option" data-color-purple="">
                    <div class="circle">
                        <img src="./images/icon-scissors.svg" alt="option scissors">
                    </div>
                </div>
                <div id="rock" class="option" data-color-red="">
                    <div class="circle">
                        <img src="./images/icon-rock.svg" alt="option rock">
                    </div>
                </div>
                    <div class="helpers">
                    <img src="./images/bg-triangle.svg" class="triangle">
                    </div>
            </div>`;
    document.querySelector('.game').insertAdjacentHTML('beforeend',i);
    const playground = document.querySelector('.playground');
    const options = document.querySelectorAll('.option');
    setTimeout(()=>{
        playground.classList.add('ready');
    },300)
    options.forEach(option => {
        option.addEventListener('click',() => {
            if(!option.classList.contains('choice')){
                playground.classList.toggle('choosen');
                option.classList.add('choice');
                let arr = Array.from(options);
                arr.splice(Array.from(options).indexOf(option),1);
                deleteOptions(arr);
            }
        });
        
    })
}
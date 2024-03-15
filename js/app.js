
const gridEl = document.querySelector('.container');
const playButtonEl = document.getElementById('playButton');
const difficultySelectionEl = document.getElementById('difficulty');
const resultEl = document.getElementById('result')



let points = 0;

playButtonEl.addEventListener('click', function(){
    
    // scelta difficoltà e generazione numero celle

    let difficulty = difficultySelectionEl.value;
    let numOfCells = getNumOfCells(difficulty);
    
    startGame(numOfCells, difficulty);
})

// funzione per ottenere  numero celle

function getNumOfCells (selection){
    if (selection == 'hard') {
        return 100;
    } else if (selection == 'medium'){
        return 81;
    } else {
        return 49;
    }
}

// funzione griglia e logica di gioco

function startGame(numOfCells, difficulty){
    
    // reset
    resultEl.innerHTML = '___';
    gridEl.innerHTML = '';
    gridEl.classList.remove('gameOver');
    const clickedCells = [];

    // generazione array con numero celle bomba

    const numOfBombs = 8;
    let bombsCells = getBombsArray(numOfBombs, numOfCells);

    // generazione array di controllo vincita

    let freeCells = getFreeCellsArray(numOfCells, bombsCells)
    console.log(freeCells)


    // pulizia e generazione griglia

    for (let numCell = 1; numCell < numOfCells + 1; numCell++) {

        // creazione e aggiunta celle
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell', difficulty);
        gridEl.appendChild(cellElement);

        // creazione e aggiunta numeri
        const numElement = document.createElement('div');
        numElement.innerHTML = numCell;
        cellElement.appendChild(numElement);

        // aggiunta classe celle con bomba
        if (bombsCells.includes(numCell)){
            cellElement.classList.add('bomb');
        }

        // click su una cella

        cellElement.addEventListener('click', function(){

            
            // cambio stile cella colpita
            cellElement.classList.add('hit');
            
            // check bomba e incremento punteggio

            if (bombsCells.includes(numCell)) {

                gridEl.classList.add('gameOver');
                resultEl.innerHTML =
                `
                You stepped on a bomb and BLEW UP!
                Your score is ${clickedCells.length}.
                `
                return
            }

            // contatore punteggio

            if (clickedCells.includes(numCell)){
                return
            }
            clickedCells.push(numCell);

            // check fine partita

            if (clickedCells.length === (numOfCells - numOfBombs)) {
                gridEl.classList.add('gameOver');
                resultEl.innerHTML =
                `
                You beat the game, GREAT JOB!
                You scored the maximum amount of points: 
                ${clickedCells.length}.
                `
            }
        })
    }
}

// funzioni per ottenere array celle libere e celle bombe

function getBombsArray(bombs, cells) {
    let array = [];
    while (array.length < bombs) {
        let newBombCell = Math.floor(Math.random()*cells) + 1;
        if (!array.includes(newBombCell)){
            array.push(newBombCell);
        }
    }
    return array;
}

function getFreeCellsArray(numOfCells, bombsArray) {
    let array = [];
    for (let n =1; n < numOfCells; n++) {
        array.push(n);
    }
    array = array.filter((n) => !bombsArray.includes(n));
    return array
}
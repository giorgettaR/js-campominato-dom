
const gridEl = document.querySelector('.container');
const playButtonEl = document.getElementById('playButton');
const difficultySelectionEl = document.getElementById('difficulty');


let points = 0;

playButtonEl.addEventListener('click', function(){
    
    // scelta difficoltà e generazione numero celle

    let difficulty = difficultySelectionEl.value;
    let numOfCells;

    if (difficulty == 'hard') {
        numOfCells = 100;
    } else if (difficulty == 'medium'){
        numOfCells = 81;
    } else {
        numOfCells = 49;
    }

    startGame(numOfCells, difficulty);
})

// funzione per generare griglia

function startGame(numOfCells, difficulty){
    
    let points = 0;
    gridEl.classList.remove('gameOver');

    const result = document.createElement('div');
    result.classList.add('result');

    // generazione array con numero celle con bomba

    const numOfBombs = 16;
    let bombsCells = getBombsArray(numOfBombs, numOfCells);

    // generazione array di controllo vincita

    let freeCells = getFreeCellsArray(numOfCells, bombsCells)


    // pulizia e generazione griglia

    gridEl.innerHTML = '';

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

            // check fine partita
            if (freeCells.length === 1) {

                gridEl.classList.add('gameOver');
                result.innerHTML =
                `
                You beat the game, GREAT JOB!
                Your score is ${points + 1}.
                `
                document.querySelector('.comsBox').append(result);

            } 

            // cambio stile cella colpita
            cellElement.classList.add('hit');
            
            // check bomba e incremento punteggio

            if (bombsCells.includes(numCell)) {

                gridEl.classList.add('gameOver');
                result.innerHTML =
                `
                You stepped on a bomb and BLEW UP!
                Your score is ${points}.
                `
                document.querySelector('.comsBox').append(result);

            } else {
                points++;
                console.log(numCell)
                const indexCell = freeCells.indexOf(numCell);
                freeCells = freeCells.toSpliced(indexCell, 1);
                console.log(freeCells)
            }
        })
    }
}






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
    array = [];
    for (let n =1; n < numOfCells; n++) {
        array.push(n);
    }
    array = array.filter((n) => !bombsArray.includes(n));
    return array
}
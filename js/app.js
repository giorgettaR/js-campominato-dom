// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
// Descrizione:

// In seguito l’utente clicca su una cella:
// se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso.
// Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// Attenzione che l’utente potrebbe cliccare due volte sulla stessa casella…
// BONUS 2:
// Quando al partita termina mostrare nella griglia tutte le bombe presenti, anche quelle che non erano state trovate.
// Tutte le caselle delle bombe devono diventare rosse
// BONUS 3:
// Una volta che la partita termina l’utente non deve più poter cliccare sulle cella, nel senso che se anche ci clicca non deve succedere niente.


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

    grid(numOfCells, difficulty);
})

// funzione per generare griglia

function grid(numOfCells, difficulty){
    
    let points = 0;
    gridEl.classList.remove('gameOver');

    // generazione array con numero celle con bomba

    let bombsCells = [];
    while (bombsCells.length < 40) {
        newBombCell = Math.floor(Math.random()*numOfCells) + 1;
        if (!bombsCells.includes(newBombCell)){
            bombsCells.push(newBombCell);
        }
    }

    // generazione array di controllo vincita

    let freeCells = [];
    for (let n = 1 ; n <= numOfCells; n++) {
            freeCells.push(n);
        }
    freeCells= freeCells.filter((n) => !bombsCells.includes(n));
    console.log(freeCells)

    // pulizia e generazione griglia

    gridEl.innerHTML = '';
    const result = document.createElement('div');
    result.classList.add('result');

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


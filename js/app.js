// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
// Descrizione:
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l’utente clicca su una cella:
// se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso.
// Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// Attenzione che l’utente potrebbe cliccare due volte sulla stessa casella…
// BONUS 1:
// Se non lo avete fatto ieri aggiungete la gestione della difficoltà
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
// BONUS 2:
// Quando al partita termina mostrare nella griglia tutte le bombe presenti, anche quelle che non erano state trovate.
// Tutte le caselle delle bombe devono diventare rosse
// BONUS 3:
// Una volta che la partita termina l’utente non deve più poter cliccare sulle cella, nel senso che se anche ci clicca non deve succedere niente.

// click sul bottone

const playButton = document.getElementById('playButton');

const gridElement = document.querySelector('.container');

const difficultySelectionElement = document.getElementById('difficulty');




playButton.addEventListener('click', function(){
    
    let difficulty = difficultySelectionElement.value;

console.log(difficulty)

    if (difficulty == 'hard') {
        numOfCells = 100;
        console.log(numOfCells)
    } else if (difficulty == 'medium'){
        numOfCells = 81;
        console.log(numOfCells)
    } else {
        numOfCells = 49;
        console.log(numOfCells)
    }



    gridElement.innerHTML = '';

    for (let i = 0; i < numOfCells; i++) {

        // creazione e aggiunta celle
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell', difficulty);
        gridElement.appendChild(cellElement);

        // creazione e aggiunta numeri
        const numElement = document.createElement('div');
        numElement.innerHTML = i + 1;
        cellElement.appendChild(numElement);

        // toggle stile celle colpite
        cellElement.addEventListener('click', function(){
            cellElement.classList.toggle('hit');
        })

    }
})



// click sulla cella
// cambio colore cella
// aggiungere select che fa cambiare la griglia
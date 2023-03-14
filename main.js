 // FROM HTML: 
const points = document.querySelector(".points");
const wordsFound = document.querySelector(".wordsFound");
const lifes = document.querySelector(".lifes");
const startBtn = document.querySelector(".draw-word");
const message = document.querySelector(".message");
let absentLetter = document.querySelector(".letterNotInWord");
// div.board
let board = document.querySelector(".board");
// letter btns:
const letterBtns = document.querySelectorAll("button.letter");
// start new game btn:
const newGameBtn = document.querySelector(".new-game");
newGameBtn.style.display = "none";
letterBtns.forEach(btn => btn.style.display = "none"); 
// -----------------------
// global variables:
let number = 0;
points.textContent = `Zdobyte punkty: ${number}`; 
const allWordsFound = [];
wordsFound.textContent = `Znalezione słowa: ${allWordsFound}`;

let wordToPlay;
let remainingLifes = 3;
lifes.textContent = `Dostępne próby: ${remainingLifes}`;
let lettersNumber;
// -------------------------
// >> wordsBank.js (all words to play the game)

   
// draw word to play:

const startNewHangmanGame = () => {
    drawWordToPlay()
    console.log(wordToPlay);
    createBoard();
    setNewGameElements();
}

// Draw word to play
const drawWordToPlay = () => {
    letterBtns.forEach(btn => btn.disabled = false); 
    let currentWord = words[Math.floor(Math.random() * words.length)];
    // create array from drawn word:
    wordToPlay = Array.from(currentWord.name);
    lettersNumber = wordToPlay.length;
}
// set game:
const setNewGameElements = () => {
    startBtn.disabled = true;
    newGameBtn.style.display = "block";
    letterBtns.forEach(btn => btn.style.display = "inline-block"); 
}
// create board 
const createBoard = () => {
    for(let i = 0; i<wordToPlay.length; i++) {
        let div = document.createElement("div");
        board.appendChild(div);
        div.classList.add("card")
        div.id = wordToPlay[i];
    }
}
// ----------------------------------------------------------------

// delate divs from board to start new game::
const startNewGame = () => {
    clearGameElements()
    startBtn.disabled = false;
}
// ----------------------------------------------------------------
let letterFound;
let letterToCheck
// compare if chosen button with letter id is correct::
const checkLetter = (e) => {
    letterToCheck = e.srcElement.attributes.id.nodeValue;
    // let letterFound;
    let buttonInUse = e.srcElement;
    buttonInUse.disabled = true;

  for (let i = 0; i< wordToPlay.length; i++){
     if (letterToCheck === wordToPlay[i]){ 
        // put letter in div field if letter is correct
        board.children[i].textContent = wordToPlay[i];
        lettersNumber--;
        // boolean to remove life if incorrect
        letterFound = true;
    } 
   
  }
//   delate life point if letter incorrect
    delateLifePoint()
}

// ------------------------------------------------
// delate life point if letter incorrect
const delateLifePoint = () => {

    if(remainingLifes===0) {
        message.textContent = "Przegrałeś"
        startNewGame();
    } else if(!letterFound){
        let letterNotInWord = letterToCheck;
        absentLetter.textContent = `Brak litery: ${letterNotInWord}`;
        remainingLifes--;
        lifes.textContent = `Dostępne próby: ${remainingLifes}`;
      } else if(lettersNumber===0) {
        message.textContent = "Wygrałeś";
        number++;
        points.textContent = `Zdobyte punkty: ${number}`;
        setTimeout(() => {
            startNewGame()
        }, 2000) ;
        wordCollection();
      }
    

}


// ------------------------------------------------
// display collection of found words::
    const wordCollection = () => {
    // let addToCollection = wordToPlay.join("");
    // allWordsFound.push(addToCollection);


    let nextWordToCollection = " ";    
   for(let i=0; i<wordToPlay.length; i++){
    nextWordToCollection += wordToPlay[i]
   }
   allWordsFound.push(nextWordToCollection)
   
}

// --------------------------------------------
clearGameElements = () => {
    absentLetter.textContent = "";
    remainingLifes = 3;
    lifes.textContent = `Dostępne próby: ${remainingLifes}`;
    while (board.lastElementChild) {
        board.removeChild(board.lastElementChild);
    }
    letterBtns.forEach(btn => btn.style.display = "none"); 
    message.textContent = ""
    wordsFound.textContent = `Znalezione słowa: ${allWordsFound}`;
}


startBtn.addEventListener("click", startNewHangmanGame);
newGameBtn.addEventListener("click", startNewGame); 
letterBtns.forEach(button => button.addEventListener("click", checkLetter));
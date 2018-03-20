/*    To Do list
  - Fix clicking on same card twice causes it to match
  - CSS change when selecting wrong card - red background like example
  - Add animations

  */



/*
 * Create a list that holds all of your cards
 */
const list = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
const array = [];
const moves = document.querySelector('.moves');
const resetBtn = document.querySelector('.restart');
const winner = document.querySelector('#winner');
let moveCounter = 0;
let openArray = [];
const matchedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function playGame() {

   for (var i = 0; i < list.length; i++) { //take each card selected and push to array

     array.push(list[i]);
   }

   shuffle(array); //shuffle the order



   for (var i = 0; i < array.length; i++) {
     deck.appendChild(array[i]);
     if(!matchedCards.includes(array[i])) {
       array[i].addEventListener("click", function(event){
         displayIcon(this);

         createWinnerTitle();
       });
     } else {
       alert('Choose another');
     }


  }
 }


for (var i = 0; i < matchedCards.length; i++) {
  matchedCards[i].removeEventListener("click",function(){
    console.log('Cant Click This!');
  });
}



function incrementMoves() {
  moveCounter++;
  moves.innerText = moveCounter;
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 != currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}



function displayIcon(card) {
  if(card == openArray[0]) {
    alert('NOPE');
    return;
  }
    incrementMoves();
    card.classList.add('show');
    card.classList.add('open');
    addToOpenList(card);

}



function addToOpenList(card) {
openArray.push(card);

if(openArray.length === 2) {
 if(openArray[0].innerHTML === openArray[1].innerHTML) {
    matchCards();
  } else {
    //add extra styling here for wrong pairs.. create CSS classes.
    removeCard();
  }
}
}


function removeCard() {
  setTimeout(function(){
    reset();
  },500);
}





function matchCards() {
  for (var i = 0; i < openArray.length; i++) {
    openArray[i].classList.add('match');
    openArray[i].classList.remove('open');
    openArray[i].classList.remove('show');
    if(!matchedCards.includes(openArray[i])){

      matchedCards.push(openArray[i]);
    } else {
      return;
    }
  }
  openArray.length = 0;
  console.log(matchedCards);
}



function reset() {
  for (var i = 0; i < openArray.length; i++) {
    openArray[i].classList.remove('open');
    openArray[i].classList.remove('show');
  }
  openArray.length = 0;
}



function createWinnerTitle() {
  if(matchedCards.length == 16) {
    winner.textContent = 'Winner!';
    matchedCards.length = 0;
  }
}

playGame();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

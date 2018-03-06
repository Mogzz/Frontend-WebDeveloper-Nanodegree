
/*
 * Create a list that holds all of your cards
 */
const list = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
const array = [];
const moves = document.querySelector('.moves');
let moveCounter = 0;
let openArray = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 for (var i = 0; i < list.length; i++) {
   array.push(list[i]);
   console.log(array);
 }
shuffle(array);

for (var i = 0; i < array.length; i++) {
  deck.appendChild(array[i]);
  array[i].addEventListener("click", function(){
    displayIcon(this);
    incrementMoves();
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
  card.classList.toggle('open');
  card.classList.toggle('show');
  addToOpenList(card);
}
function addToOpenList(card) {
openArray.push(card);

if(openArray.length > 1) {
  if(openArray[openArray.length-1].innerHTML === openArray[openArray.length-2].innerHTML) {
    matchCards(openArray);
  } else {
    removeCard(openArray);
  }
}
}
function removeCard(array) {
  setTimeout(function(){
    console.log(openArray);
    openArray[openArray.length-1].classList.remove('open');
    openArray[openArray.length-1].classList.remove('show');
    openArray[openArray.length-2].classList.remove('open');
    openArray[openArray.length-2].classList.remove('show');
    openArray = [];
  },750);
}

function matchCards(array) {
  openArray[openArray.length-1].classList.add('match');
  openArray[openArray.length-2].classList.add('match');
  openArray = [];
  console.log(openArray);
}
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

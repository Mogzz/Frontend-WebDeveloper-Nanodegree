/*    Memory game

    by - Morgan Parry

  */



/* CONST / Vars */
const list = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
let array = [];
const moves = document.querySelector('.moves');
const resetBtn = document.querySelector('.restart');
const winner = document.querySelector('.winner');
let stars = document.querySelector('.stars');
const modal = document.querySelector('.modal');
const score = document.querySelector('#score');
const playAgain = document.querySelector('#playAgain');
const winnerMins = document.querySelector('.winnerMins');
const body = document.body;
const starsModal = document.querySelector('.stars-modal');
const winnerSecs = document.querySelector('.winnerSecs');
let moveCounter = 0;
let openArray = [];
let matchedCards = [];
const timer = new Date();
const minutesLabel = document.querySelector(".minutes");
const secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
setInterval(setTime, 1000);


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function createDeck(){
   for (var i = 0; i < list.length; i++) { //take each card selected and push to array
     array.push(list[i]);
   }
 }

 function play(){
     if(matchedCards.includes(this)) {
       alert('Choose another Card');
       return;
     } else {
       incrementMoves();
       displayIcon(this);
       starRating();
       createWinnerTitle();
     }
   }
   resetBtn.addEventListener("click",function(){
     resetGame();
   });
 //This function initializes the game
 function init() {
   createDeck();
   shuffle(array); //shuffle the order
   for (var i = 0; i < array.length; i++) {
     deck.appendChild(array[i]); //add a click event to each card
       array[i].addEventListener("click", play,true);

  }
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


// function used to display each icon on click
function displayIcon(card) {
  if(openArray.includes(card)) {//check if card if already shown
    alert('Choose another Card!');
    return;
  }
    card.classList.add('show');
    card.classList.add('open');
    addToOpenList(card);

}


function addToOpenList(card) { //function used to add cards to the open array, if both the same..match
openArray.push(card);
  if(openArray.length === 2) {
    if(openArray[0].innerHTML === openArray[1].innerHTML) {
    matchCards();
    } else {
    //add extra styling here for wrong pairs.. create CSS classes.
    removeCard(card);
    }
  }
}



function removeCard(card) { //removes the cards after a brief timeout
  setTimeout(function(){
    resetCard();
  },500);
}

function resetGame(){ //function used to reset the game
  array.forEach(function(card){
    card.removeEventListener("click",play,true)
    card.classList.remove('match');
    card.classList.remove('open');
    card.classList.remove('show');
  });
  addStar();
  addStarModal();
  matchedCards = [], array =[],openArray = [], moveCounter = 0, moves.innerText = moveCounter,totalSeconds = 0;
  //reset stars
  // addStar();
  //console.log(starList.length);
  init();
  //console.log(openArray, matchedCards);
}

function addStar() { //add a star after reset
  let starList = document.querySelectorAll('.score-panel .fa-star');
  let li = document.createElement("li");
  li.style.display = "inline-block";
  // liModal.style.display = "inline-block";
  // liModal.style.fontSize = 'inherit';
  let icon = document.createElement("i");
  icon.classList.add('fa');
  icon.classList.add('fa-star');
  li.appendChild(icon);
  // liModal.appendChild(icon);
  if(starList.length == 2) {
      stars.innerHTML += li.innerHTML;
      // starsModal.innerHTML += liModal.innerHTML;
  } else if(starList.length < 2) {
      for (var i = 0; i < 2; i++) {
          console.log('One Star');
          stars.innerHTML += li.innerHTML;
          // starsModal.innerHTML += liModal.innerHTML;
    }
  }
}

function addStarModal(){ // Add 3 stars to modal when game is reset
  let starList = document.querySelectorAll('.score-panel .fa-star');
  let liModal = document.createElement("li");
  let icon = document.createElement("i");
  liModal.style.display = "inline-block";
  liModal.style.fontSize = 'inherit';
  liModal.appendChild(icon);
  icon.classList.add('fa');
  icon.classList.add('fa-star');
  if(starList.length == 2) {
      starsModal.innerHTML += liModal.innerHTML;
  } else if(starList.length < 2) {
      for (var i = 0; i < 2; i++) {
          console.log('One Star');
          starsModal.innerHTML += liModal.innerHTML;
    }
  }
}


function matchCards() { //match the cards and push to the array
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


function resetCard() { //reset the card to original state
  for (var i = 0; i < openArray.length; i++) {
    openArray[i].classList.remove('open');
    openArray[i].classList.remove('show');
  }
  openArray.length = 0; //clear array
}

function setTime() { //function used for timer
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) { //timer function
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}



function createWinnerTitle() { //create the modal on win
  if(matchedCards.length == 16) { //when 16 cards matched display the winner modal
      winner.style.display = "block";
      score.innerText = moveCounter;
      winnerMins.innerText = pad(parseInt(totalSeconds / 60));
      winnerSecs.innerText = pad(totalSeconds % 60);
      let close = document.querySelector('#close-modal');
      close.addEventListener('click',function(){ //add event to close modal
        modal.style.height = "0%";
      });
      playAgain.addEventListener('click',function(){
        resetGame();
        closeModal();

      });
      close.style.display = "block";
      starRating();
      matchedCards.length = 16;
      modal.style.height = "100%";

  }
}
function starRating() { //scoring logic

  if(moveCounter == 16) { //after 15 moves remove a star
    stars.removeChild(stars.childNodes[1]);
    starsModal.removeChild(starsModal.childNodes[1]);
  } else if(moveCounter == 30) { //after 30 remove a star
    stars.removeChild(stars.childNodes[2]);
    starsModal.removeChild(starsModal.childNodes[2]);
  }
}
function closeModal() { //function passed to close click event
    modal.style.height = "0%";
}

init(); //initialize the game

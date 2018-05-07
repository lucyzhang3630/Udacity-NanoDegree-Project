/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
var iconArray = ['fa-diamond','fa-diamond','fa-paper-plane-o','fa-paper-plane-o',
                'fa-anchor','fa-anchor','fa-bolt','fa-bolt',
                'fa-cube','fa-cube','fa-leaf','fa-leaf',
                'fa-bicycle','fa-bicycle','fa-bomb','fa-bomb'];
var counter = 0;
var clickedCards = [];
var seconds = 0;
var showResultModal;
var timerIntervalHandler;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}

//Initialize game
function initializeGame() {
  clickedCards = [];
  var shuffledIcons = shuffle(iconArray);
  var iconElements = document.querySelectorAll('li.card>i.fa');
  var movesCounter = document.querySelector('span.moves');
  var cardBoard = document.querySelector('ul.deck');
  var iconBoards = document.querySelectorAll('li.card');
  //set the initial ratings
  document.querySelector('ul.stars').innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`
  //set the boards
  for (let i = 0; i < iconElements.length; i++) {
    //if the icon alreay has 2 class names, remove the last one.
    if (iconElements[i].classList.length > 1) {
      iconElements[i].classList.remove(iconElements[i].classList[1]);
    }
    iconElements[i].classList.add(shuffledIcons[i]);
  }
  //set the status of cards
  for(let i = 0; i <iconBoards.length; i++) {
    if(iconBoards[i].classList.contains("match")) {
      iconBoards[i].classList.remove("match");
    }else if(iconBoards[i].classList.contains("open","showCard")) {
      iconBoards[i].classList.remove("open","showCard");
    }
  }
  //set the counter of moves
  counter = 0;
  movesCounter.textContent = counter;

  // set the timer to 0
  seconds = 0;
  document.querySelector('span.time').innerHTML = "0 min(s) 0 sec(s)";
  timer();
  //set the functionality to check if the game is over
  showResultModal = setInterval(showResult,1000);
  //listen to the click event of cards
  cardBoard.addEventListener('click', function(event) {
    if(event.target.tagName === "LI") {
      //if the card is not already in open or match status, push it to the clickedCards list and increase the counter
      if(!event.target.classList.contains("open")&&!event.target.classList.contains("match")) {
        clickedCards.push(event.target.childNodes[1]);
        counter++;
        movesCounter.textContent = counter;
      }
      //if the card is not in match status, add open flag to the cards classList
      if(!event.target.classList.contains("match")) {
        event.target.classList.add("open","showCard");
      }

      if(clickedCards.length > 1) {
        for(let i = 0; i < clickedCards.length-1; i++) {
          //if match
          if(clickedCards[i].className === event.target.childNodes[1].className) {
            event.target.classList.remove("open","showCard");
            event.target.classList.add("match");
            if(document.querySelector('li.card.open.showCard')) {
              document.querySelector('li.card.open.showCard').classList.add("match");
              document.querySelector('li.card.open.showCard').classList.remove("open","showCard");
            }
            clickedCards = [];
          }else {
            setTimeout(function(){
              event.target.classList.remove("open","showCard");
              if(document.querySelector('li.card.open.showCard')) {
                document.querySelector('li.card.open.showCard').classList.remove("open","showCard");
              }
            }, 500);
            clickedCards = [];
          }
        }
      }
      //set the ratings based on the moves
      var selector = "ul.stars"
      setRating(selector);
    }
  })
}

// functionality for setting ratings
function setRating(selector) {
  if(counter < 32) {
    document.querySelector(selector).innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`
  }else if(counter >= 32 && counter < 50) {
    document.querySelector(selector).innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`
  }else if(counter >= 50) {
    document.querySelector(selector).innerHTML = `<li><i class="fa fa-star"></i></li>`
  }
}

// functionality for timer
function timer() {
  timerIntervalHandler = setInterval(function() {
    document.querySelector('span.time').innerHTML = `${Math.floor(seconds/60)} min(s) ${seconds%60} sec(s)`;
    seconds++;
  },1000)
}

function showResult() {

  var matchedCards = document.querySelectorAll('li.match');
  var selector = "ul.finalScore";
  var finalTime = document.querySelector("span.time").textContent;

  if(matchedCards.length === 16) {
    clearInterval(showResultModal);
    clearInterval(timerIntervalHandler);
    $("#successModal").modal();
  }
  //when modal is open, clear the interval handler.
  setRating(selector);
  document.querySelector("span.finalTime").textContent = finalTime;
}

//set the cards on page loads
document.addEventListener("DOMContentLoaded", initializeGame);





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

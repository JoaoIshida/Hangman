// Word bank
const words = [

  { word: 'Apple', hint: 'A common fruit that is often red or green.' },
  { word: 'Chair', hint: 'A piece of furniture with a seat and backrest for one person.' },
  { word: 'Dog', hint: 'A domesticated carnivorous mammal that is commonly kept as a pet.' },
  { word: 'Carrot', hint: 'An orange vegetable that is often used as a healthy snack.' },
  { word: 'Book', hint: 'A written or printed work consisting of pages bound together.' },
  { word: 'Spoon', hint: 'An eating or cooking utensil with a shallow bowl and a long handle.' },
  { word: 'Guitar', hint: 'A stringed musical instrument played with the fingers or a pick.' },
  { word: 'Rainbow', hint: 'A meteorological phenomenon that forms a multicolored arc in the sky.' },
  { word: 'Mountain', hint: 'A large landform that rises above the surrounding land.' },
  { word: 'Elephant', hint: 'A massive herbivorous mammal with a long trunk and large tusks.' },
  { word: 'Cat', hint: 'A small domesticated carnivorous mammal with soft fur.' },
  { word: 'Table', hint: 'A piece of furniture with a flat top and one or more legs.' },
  { word: 'Sun', hint: 'The star that is the central body of the solar system.' },
  { word: 'Window', hint: 'An opening in a wall or door that allows light and air to enter.' },
  { word: 'Pencil', hint: 'A tool used for writing or drawing, usually made of wood and graphite.' },
  { word: 'Moon', hint: 'The natural satellite of the Earth that reflects light from the sun.' },
  { word: 'Shirt', hint: 'A garment for the upper body, typically with a collar and buttons.' },
  { word: 'Tree', hint: 'A tall perennial plant with a trunk and branches, usually bearing leaves.' },
  { word: 'Ocean', hint: 'A vast body of saltwater that covers most of the Earth\'s surface.' },
  { word: 'Phone', hint: 'A device used for communication and accessing the internet.' },
  { word: 'Chair', hint: 'A piece of furniture with a seat and backrest for one person.' },
  { word: 'Bird', hint: 'A warm-blooded vertebrate with feathers, beak, and wings.' },
  { word: 'Clock', hint: 'A device used to measure and display time.' },
  { word: 'House', hint: 'A building used as a dwelling for one or more people.' },
  { word: 'Ball', hint: 'A round object used in various sports and games.' },
  { word: 'Garden', hint: 'An area of land used for cultivating plants and flowers.' },
  { word: 'Train', hint: 'A connected series of vehicles that run on railroad tracks.' },
  { word: 'River', hint: 'A large natural flow of water that moves towards an ocean or lake.' },
  { word: 'Key', hint: 'A small metal object used to unlock or operate a lock.' },
  { word: 'Cloud', hint: 'A visible mass of condensed water vapor in the atmosphere.' },
  { word: 'Cup', hint: 'A small open container used for drinking or holding liquids.' },
  { word: 'Bicycle', hint: 'A human-powered vehicle with two wheels and pedals.' },
  { word: 'Book', hint: 'A written or printed work consisting of pages bound together.' },
  { word: 'Mountain', hint: 'A large landform that rises above the surrounding land.' },
  { word: 'Door', hint: 'A movable barrier used to close off an entrance or exit.' },
  { word: 'Pizza', hint: 'A savory dish consisting of a round, flat base of dough topped with cheese and other ingredients.' },
  { word: 'Rain', hint: 'Precipitation in the form of water droplets falling from the atmosphere.' },
  { word: 'Bridge', hint: 'A structure built to span physical obstacles such as rivers or valleys.' },
  { word: 'Camera', hint: 'A device used to capture and record images and videos.' },
  { word: 'Fire', hint: 'The rapid oxidation of a material, producing heat, light, and flames.' }
  
];

let selectedWord;
let hint;
let word;

// Get random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Initialize game
function initializeGame() {
  selectedWord = getRandomWord();
  hint = selectedWord.hint;
  word = selectedWord.word.toUpperCase();
  let guessesLeft = 6;
  let correctGuesses = new Array(word.length).fill(false);
  let incorrectLetters = [];

  // Update word display
  let wordContainer = document.getElementById('word');
  wordContainer.textContent = '';
  wordContainer.style.color = 'black';
  wordContainer.style.fontSize = '40px';
    wordContainer.style.fontWeight = 'normal';

  for (let i = 0; i < word.length; i++) {
    let letterSpan = document.createElement('span');
    letterSpan.textContent = '_';
    letterSpan.classList.add('letter-span');
    wordContainer.appendChild(letterSpan);
  }

  // Update guesses left
  let guessesLeftContainer = document.getElementById('guesses-left');
  guessesLeftContainer.textContent = `Guesses Left: ${guessesLeft}`;

  // Update letters
  let lettersContainer = document.getElementById('letters');
  lettersContainer.textContent = '';

  for (let i = 65; i <= 90; i++) {
    let letter = String.fromCharCode(i);
    let letterButton = document.createElement('button');
    letterButton.textContent = letter;
    letterButton.addEventListener('click', function() {
      handleGuess(letter);
    });
    lettersContainer.appendChild(letterButton);
  }

  // Reset hint
  let hintElement = document.getElementById('hint');
  hintElement.textContent = '';
  hintElement.classList.add('hidden');
  document.getElementById('hint-button').disabled = false;

  // Handle guess
  function handleGuess(letter) {
    if (word.includes(letter)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          correctGuesses[i] = true;
          wordContainer.children[i].textContent = letter;
        }
      }

      if (!correctGuesses.includes(false)) {
        endGame(true);
      }
    } else {
      incorrectLetters.push(letter);
      guessesLeft--;

      if (guessesLeft === 0) {
        endGame(false);
      }
    }

    guessesLeftContainer.textContent = `Guesses Left: ${guessesLeft}`;
    event.target.disabled = true;
  }

  // End game
  function endGame(isWin) {
    for (let i = 0; i < lettersContainer.children.length; i++) {
      lettersContainer.children[i].disabled = true;
    }

    if (isWin) {
      wordContainer.textContent = 'You won! \uD83E\uDD73';
      wordContainer.style.color = 'green';
      wordContainer.style.fontSize = '50px';
    wordContainer.style.fontWeight = 'bold';
      showConfetti();
    } else {
      wordContainer.textContent = 'You lost \uD83D\uDE22';
      wordContainer.style.color = 'red';
      wordContainer.style.fontSize = '40px';
      wordContainer.style.fontWeight = 'normal';
    }

    document.getElementById('restart-button').style.display = 'inline';
    document.getElementById('hint-button').disabled = true;
  }
}

// Show confetti animation
function showConfetti() {
  const colors = ['#f39c12', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71']; // Add your desired colors here
  const confettiContainer = document.getElementById('confetti-container');

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDelay = `${Math.random()}s`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Assign confetti class for left or right cannon
    if (Math.random() < 0.5) {
      confetti.classList.add('confetti-left');
    } else {
      confetti.classList.add('confetti-right');
    }

    confettiContainer.appendChild(confetti);
  }

   // Remove confetti after a certain duration
   setTimeout(() => {
    confettiContainer.removeChild(confetti);
  }, 2); // Adjust the duration as needed
}

// Show hint
function showHint() {  
  let hintElement = document.getElementById('hint');
  hintElement.textContent = `Hint: ${hint}`;
  hintElement.classList.remove('hidden');
  document.getElementById('hint-button').disabled = true;
}

// Restart game
function restartGame() {
  document.getElementById('restart-button').style.display = 'none';
  document.getElementById('hint-button').disabled = false;

  const confettiContainer = document.getElementById('confetti-container');
  confettiContainer.innerHTML = '';

  initializeGame();
}

// Start the game
initializeGame();


import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11.22.3/+esm";
const words = {
  programming: [
    "javascript",
    "python",
    "java",
    "php",
    "ruby",
    "swift",
    "typescript",
    "kotlin",
    "dart",
    "go",
    "rust",
    "csharp",
    "cplusplus",
    "react",
    "angular",
    "vue",
    "nodejs",
    "django",
    "flask",
    "spring",
  ],
  movies: [
    "inception",
    "avatar",
    "titanic",
    "gladiator",
    "interstellar",
    "avengers",
    "frozen",
    "jaws",
    "coco",
    "up",
    "matrix",
    "parasite",
    "joker",
    "dune",
    "spiderman",
    "batman",
    "superman",
    "blackpanther",
    "ironman",
    "thor",
  ],
  people: [
    "Albert Einstein",
    "Isaac Newton",
    "Leonardo da Vinci",
    "Nelson Mandela",
    "Mahatma Gandhi",
    "Steve Jobs",
    "Elon Musk",
    "Oprah Winfrey",
    "Michael Jordan",
    "Cristiano Ronaldo",
    "Lionel Messi",
    "Taylor Swift",
    "Bill Gates",
    "Mark Zuckerberg",
    "Nikola Tesla",
    "Marie Curie",
    "Galileo Galilei",
    "Charles Darwin",
    "Walt Disney",
    "Stephen Hawking",
  ],
  countries: [
    "egypt",
    "brazil",
    "argentina",
    "france",
    "germany",
    "italy",
    "spain",
    "portugal",
    "japan",
    "china",
    "india",
    "canada",
    "australia",
    "mexico",
    "southafrica",
    "russia",
    "turkey",
    "sweden",
    "norway",
    "denmark",
  ],
};

// ====== CONFIG ====== //
const letters = "abcdefghijklmnopqrstuvwxyz";

// ====== INIT ELEMENTS ====== //
const lettersContainer = document.querySelector(".letters");
const lettersGuessContainer = document.querySelector(".letters-guess");
const theDraw = document.querySelector(".hangman-draw");
const successSound = document.getElementById("success");
const failSound = document.getElementById("fail");
const gameOverSound = document.getElementById("gameOver");
const restertGame = document.getElementById("restertGame");

// ====== STATE ====== //
let wrongAttempts = 0;

// ====== FUNCTIONS ====== //

// Generate letter buttons
function generateLetters() {
  Array.from(letters).forEach((letter) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.classList.add("letter-box");
    lettersContainer.appendChild(span);
  });
}

// Pick random word and category
function pickRandomWord() {
  const categories = Object.keys(words);
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];
  const wordList = words[randomCategory];
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

  document.querySelector(".game-info .category span").textContent =
    randomCategory;
  return randomWord;
}

// Generate empty spans for word letters
function generateWordSpans(word) {
  lettersGuessContainer.innerHTML = "";
  Array.from(word).forEach((letter) => {
    const span = document.createElement("span");
    if (letter === " ") span.classList.add("with-space");
    lettersGuessContainer.appendChild(span);
  });
}

// Check win condition
function checkWin(word) {
  const guessSpans = document.querySelectorAll(".letters-guess span");
  const won = Array.from(word.toLowerCase()).every((letter, idx) => {
    return (
      letter === " " || guessSpans[idx].textContent.toLowerCase() === letter
    );
  });
  if (won) succssGame(word);
}

// Handle game over
function failGame(word) {
  Swal.fire({
    icon: "error",
    title: "Game Over",
    text: `The Word Is: ${word}`,
  });
  gameOverSound.play();
  lettersContainer.classList.add("finished");
}

// Handle success
function succssGame(word) {
  Swal.fire({
    icon: "success",
    title: "You Win",
    text: `The Word Is: ${word}`,
  });
  gameOverSound.play();
  lettersContainer.classList.add("finished");
}

// Handle letter clicks
function handleLetterClick(word) {
  document.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("letter-box") &&
      !e.target.classList.contains("clicked")
    ) {
      e.target.classList.add("clicked");
      const clickedLetter = e.target.textContent.toLowerCase();
      const wordLetters = Array.from(word.toLowerCase());
      let correct = false;
      const guessSpans = document.querySelectorAll(".letters-guess span");

      wordLetters.forEach((letter, idx) => {
        if (letter === clickedLetter) {
          correct = true;
          guessSpans[idx].textContent = letter;
        }
      });

      if (!correct) {
        wrongAttempts++;
        theDraw.classList.add(`wrong-${wrongAttempts}`);
        failSound.volume = 0.1;
        failSound.play();
        if (wrongAttempts === 9) failGame(word);
      } else {
        successSound.volume = 0.1;
        successSound.play();
        checkWin(word);
      }
    }
  });
}

// ============ Restert Game ====== //
restertGame.addEventListener("click", () => {
  location.reload();
});

// ====== INIT GAME ====== //
function initGame() {
  generateLetters();
  const word = pickRandomWord();
  generateWordSpans(word);
  handleLetterClick(word);
}

// Start the game
initGame();

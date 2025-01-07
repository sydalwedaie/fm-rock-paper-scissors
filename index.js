// Get Static UI Elements
const playerScoreEl = document.querySelector(".player-score");
const computerScoreEl = document.querySelector(".computer-score");
const playAreaEl = document.querySelector(".play-area");
const choicesContainerEl = document.querySelector(".choices-container");
const pickedItemsContainerEl = document.querySelector(
  ".picked-items-container"
);
const resultContainerEl = document.querySelector(".result-container");

function playGame() {
  // Define the choices
  const choices = ["rock", "paper", "scissors"];
  const winningCombos = [
    choices[0] + choices[2],
    choices[1] + choices[0],
    choices[2] + choices[1],
  ];

  const scores = {
    player: 0,
    computer: 0,
  };

  // Load the initial state of the game
  displayChoices(choices);

  playAreaEl.addEventListener("click", (e) => {
    // Player picks an item which triggers a round
    if (e.target.classList.contains("btn-choice")) {
      let playerChoice = e.target.dataset.choice;
      playRound(
        getComputerChoice(choices),
        playerChoice,
        winningCombos,
        scores
      );
    }

    // Restart the round
    if (e.target.classList.contains("btn-next-round")) {
      displayChoices(choices);
    }

    // Determin game winner, display results
    if (scores.computer === 5 || scores.player === 5) {
      displayGameOver(scores);
    }

    // Restart the game
    if (e.target.classList.contains("btn-play-again")) {
      scores.player = 0;
      scores.computer = 0;
      updateScoreboard(scores);
      displayChoices(choices);
    }
  });
}

// ---------------------
// Game Logic
// ---------------------
function getComputerChoice(choices) {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playRound(computerChoice, playerChoice, winningCombos, scores) {
  displayPickedItems(computerChoice, playerChoice);

  const isComputerWinner = winningCombos.includes(
    computerChoice + playerChoice
  );
  const isTie = computerChoice === playerChoice;
  let roundWinner = "";

  if (isComputerWinner) {
    scores.computer += 1;
    roundWinner = "computer";
  } else if (isTie) {
    roundWinner = "tie";
  } else {
    scores.player += 1;
    roundWinner = "player";
  }

  displayRoundResult(roundWinner);
  displayAgainBtn("Next Round");
  updateScoreboard(scores);
}

// ---------------------
// Desplay UI Functions
// ---------------------
function displayChoices(choices) {
  // Reset the playing area at the begining of each round or game
  pickedItemsContainerEl.innerHTML = "";
  resultContainerEl.innerHTML = "";

  const choicesHtml = choices
    .map(
      (choice) =>
        `<button class="btn-choice btn-${choice}" data-choice="${choice}">${choice}</button>`
    )
    .join("");

  choicesContainerEl.innerHTML = choicesHtml;
}

function displayPickedItems(computerChoice, playerChoice) {
  const pickedItemsHtml = [computerChoice, playerChoice]
    .map((choice, index) => {
      return `
        <div class='picked-item-container'>
          <p>${index === 0 ? "The House " : "You "} Picked</p>
          <button class="btn-choice btn-${choice}" disabled>${choice}</button>
        </div>
      `;
    })
    .join("");

  choicesContainerEl.innerHTML = "";
  pickedItemsContainerEl.innerHTML = pickedItemsHtml;
}

function displayRoundResult(roundWinner) {
  const roundMessage = document.createElement("p");
  roundMessage.setAttribute("class", "round-message");

  if (roundWinner === "computer") {
    roundMessage.textContent = "You Lose!";
  } else if (roundWinner === "tie") {
    roundMessage.textContent = "That's a tie!";
  } else {
    roundMessage.textContent = "You Win!";
  }

  resultContainerEl.appendChild(roundMessage);
}

function displayGameOver(scores) {
  choicesContainerEl.innerHTML = "";
  pickedItemsContainerEl.innerHTML = "";
  resultContainerEl.innerHTML = "";

  const roundMessage = document.createElement("p");
  roundMessage.setAttribute("class", "round-message");

  roundMessage.textContent =
    scores.computer === 5 ? "Gameover :(" : "You beat the house!";

  resultContainerEl.appendChild(roundMessage);

  displayAgainBtn("Play Again");
}

function displayAgainBtn(buttonText) {
  const nextRoundEl = document.createElement("button");
  nextRoundEl.setAttribute(
    "class",
    `btn-${buttonText.split(" ").join("-").toLowerCase()}`
  );
  nextRoundEl.textContent = buttonText;
  resultContainerEl.appendChild(nextRoundEl);
}

function updateScoreboard(scores) {
  playerScoreEl.querySelector("span").textContent = scores.player;
  computerScoreEl.querySelector("span").textContent = scores.computer;
}

// ---------------------
// Run Game
// ---------------------
playGame();

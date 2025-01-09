// Get Static UI Elements
const playerScoreEl = document.querySelector(".player-score-counter");
const computerScoreEl = document.querySelector(".computer-score-counter");
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
    const buttonEl = e.target.closest(".btn-choice");
    if (buttonEl) {
      let playerChoice = buttonEl.dataset.choice;
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
  displayAgainBtn("NEXT ROUND");
  updateScoreboard(scores);
}

// ---------------------
// Desplay UI Functions
// ---------------------
function displayChoices(choices) {
  // Reset the playing area at the begining of each round or game
  pickedItemsContainerEl.innerHTML = "";
  resultContainerEl.innerHTML = "";
  pickedItemsContainerEl.style.display = "none";
  resultContainerEl.style.display = "none";

  const choicesHtml = choices
    .map((choice) => displayChoiceBtn(choice, false))
    .join("");

  choicesContainerEl.innerHTML = choicesHtml;
}

function displayPickedItems(computerChoice, playerChoice) {
  pickedItemsContainerEl.style.display = "flex";
  const pickedItemsHtml = [computerChoice, playerChoice]
    .map((choice, index) => {
      return `
        <div class='picked-item-container'>
          ${displayChoiceBtn(choice, true)}
          <p>${index === 0 ? "HOUSE " : "YOU "} PICKED</p>
        </div>
      `;
    })
    .join("");

  choicesContainerEl.innerHTML = "";
  pickedItemsContainerEl.innerHTML = pickedItemsHtml;
}

function displayRoundResult(roundWinner) {
  resultContainerEl.style.display = "flex";
  const roundMessage = document.createElement("p");
  roundMessage.setAttribute("class", "round-message");

  if (roundWinner === "computer") {
    roundMessage.textContent = "YOU LOSE!";
  } else if (roundWinner === "tie") {
    roundMessage.textContent = "THAT'S A TIE!";
  } else {
    roundMessage.textContent = "YOU WIN!";
  }

  resultContainerEl.appendChild(roundMessage);
}

function displayGameOver(scores) {
  resultContainerEl.innerHTML = "";

  const roundMessage = document.createElement("p");
  roundMessage.setAttribute("class", "round-message");

  roundMessage.textContent =
    scores.computer === 5 ? "GAMEOVER 😢" : "YOU BEAT THE HOUSE 🥳";

  resultContainerEl.appendChild(roundMessage);

  displayAgainBtn("PLAY AGAIN");
}

function displayChoiceBtn(choice, isDisabled) {
  return `
    <button 
      class="btn-choice btn-${choice}" 
      data-choice="${choice}" 
      ${isDisabled ? "disabled" : ""}
    >
      <img src="/images/icon-${choice}.svg" alt="icon-${choice}" />
    </button>
  `;
}

function displayAgainBtn(buttonText) {
  const nextRoundEl = document.createElement("button");
  nextRoundEl.setAttribute(
    "class",
    `btn btn-${buttonText.split(" ").join("-").toLowerCase()}`
  );
  nextRoundEl.textContent = buttonText;
  resultContainerEl.appendChild(nextRoundEl);
}

function updateScoreboard(scores) {
  playerScoreEl.textContent = scores.player;
  computerScoreEl.textContent = scores.computer;
}

// ---------------------
// Rules Dialog
// ---------------------
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

// ---------------------
// Run Game
// ---------------------
playGame();

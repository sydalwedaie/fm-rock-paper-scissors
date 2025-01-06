// Get Static UI Elements
const playerScoreEl = document.querySelector(".player-score");
const computerScoreEl = document.querySelector(".computer-score");
const playAreaEl = document.querySelector(".play-area");

// Desplay UI Functions
function displayChoices(choices) {
  playAreaEl.innerHTML = "";
  const choiceHtml = choices
    .map(
      (choice) =>
        `<button class="btn-choice btn-${choice}" data-choice="${choice}">${choice}</button>`
    )
    .join("");
  playAreaEl.innerHTML =
    "<div class='choice-container'>" + choiceHtml + "</div>";
}

function updateScoreboard(scores) {
  playerScoreEl.querySelector("span").textContent = scores.player;
  computerScoreEl.querySelector("span").textContent = scores.computer;
}

// Game Logic
function getComputerChoice(choices) {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playRound(computerChoice, playerChoice, winningCombos, scores) {
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

  const roundResultEl = document.createElement("p");
  roundResultEl.setAttribute("class", "round-message");

  if (winningCombos.includes(computerChoice + ", " + playerChoice)) {
    roundResultEl.textContent = "You Lose!";
    scores.computer += 1;
  } else if (computerChoice === playerChoice) {
    roundResultEl.textContent = "That's a tie!";
  } else {
    roundResultEl.textContent = "You Win!";
    scores.player += 1;
  }

  playAreaEl.innerHTML = `<div class='result-container'>${pickedItemsHtml}</div>`;
  playAreaEl.appendChild(roundResultEl);

  const nextRoundEl = document.createElement("button");
  nextRoundEl.setAttribute("class", "btn-next-round");
  nextRoundEl.textContent = "Next Round";

  playAreaEl.appendChild(nextRoundEl);

  updateScoreboard(scores);
}

function playGame() {
  // Define the choices
  const choices = ["rock", "paper", "scissors"];
  const winningCombos = ["rock, scissors", "paper, rock", "scissors, paper"];

  const scores = {
    player: 0,
    computer: 0,
  };

  displayChoices(choices);

  playAreaEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-choice")) {
      let playerChoice = e.target.dataset.choice;
      playRound(
        getComputerChoice(choices),
        playerChoice,
        winningCombos,
        scores
      );
    }

    if (e.target.classList.contains("btn-next-round")) {
      displayChoices(choices);
    }

    if (scores.computer === 5 || scores.player === 5) {
      playAreaEl.innerHTML = `<div class='result-container'></div>`;
      playAreaEl.querySelector(".result-container").textContent =
        scores.computer === 5 ? "Gameover :(" : "You beat the house!";

      const playAgainEl = document.createElement("button");
      playAgainEl.setAttribute("class", "btn-play-again");
      playAgainEl.textContent = "Play Again";

      playAreaEl.appendChild(playAgainEl);
    }

    if (e.target.classList.contains("btn-play-again")) {
      scores.player = 0;
      scores.computer = 0;
      updateScoreboard(scores);
      displayChoices(choices);
    }
  });
}

playGame();

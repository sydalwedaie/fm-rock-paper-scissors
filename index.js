// define the choices
const choices = ["rock", "paper", "scissors"];
const winningCombos = ["rock, scissors", "paper, rock", "scissors, paper"];

function getComputerChoice(choices) {
  // randomly pick an index
  const randomIndex = Math.floor(Math.random() * choices.length);

  return choices[randomIndex];
}

function getHumanChoice(choices) {
  const numberedOptions = choices
    .map((choice, index) => `${index + 1}: ${choice}`)
    .join(", ");

  // Get index of user's pick
  const userIndex = parseInt(prompt(`Please Choose: ${numberedOptions}`)) - 1;

  // Verify input
  if (userIndex < 0 || userIndex >= choices.length || isNaN(userIndex)) {
    console.warn("Please enter a valid integer from 1 to 3");
    return getHumanChoice(choices);
  }

  return choices[userIndex];
}

function playRound(computerChoice, humanChoice, scores) {
  console.log(`Computer chose: ${computerChoice}\nYou chose: ${humanChoice}`);

  if (winningCombos.includes(computerChoice + ", " + humanChoice)) {
    console.log("Computer wins!");
    scores.computer += 1;
  } else if (computerChoice === humanChoice) {
    console.log("That's a tie!");
  } else {
    console.log("You win!");
    scores.human += 1;
  }

  console.log(`Computer: ${scores.computer}\nYou: ${scores.human}`);
}

function playGame() {
  const scores = {
    human: 0,
    computer: 0,
  };

  for (let i = 0; i < 5; i++) {
    console.log("==== Round " + (i + 1) + " ====");
    playRound(getComputerChoice(choices), getHumanChoice(choices), scores);
  }

  if (scores.computer > scores.human) {
    console.log("Computer won the game");
  } else if (scores.computer < scores.human) {
    console.log("Hayyy! You won the game!");
  } else {
    console.log("Oh oh! It's a tie :|");
  }
}

playGame();

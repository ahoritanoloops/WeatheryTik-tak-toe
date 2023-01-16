const sun = "☀️";
const palm = "🌴";
const snowflake = "❄️";
const snowman = "⛄";
let playerOne = "";
let playerTwo = "";
let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

function extractRequestJson(response) {
  return response.json();
}
function selectEmoji(json) {
  let caption = "";
  if (json.current_weather.temperature > 20) {
    playerOne = sun;
    playerTwo = palm;
    caption = "warm";
  } else {
    playerOne = snowflake;
    playerTwo = snowman;
    caption = "chilly";
  }
  let captions = document.getElementsByClassName("weather-caption");
  captions[0].innerText = "The current weather is " + caption;
}
function useDefaultEmojis() {
  playerOne = "X";
  playerTwo = "0";
}

const request = new Request(
  "https://api.open-meteo.com/v1/forecast?latitude=20.67&longitude=-103.35&current_weather=true"
);
fetch(request)
  .then(extractRequestJson)
  .then(selectEmoji)
  .catch(useDefaultEmojis);

let buttons = document.getElementsByClassName("player");
console.log(buttons);
buttons[0].addEventListener("click", onClick);
buttons[1].addEventListener("click", onClick);
buttons[2].addEventListener("click", onClick);
buttons[3].addEventListener("click", onClick);
buttons[4].addEventListener("click", onClick);
buttons[5].addEventListener("click", onClick);
buttons[6].addEventListener("click", onClick);
buttons[7].addEventListener("click", onClick);
buttons[8].addEventListener("click", onClick);

let currentTurn = 1;

function onClick(event) {
  const buttonIndex = event.target.getAttribute("button-number");
  console.log(buttons[buttonIndex].innerText);

  if (buttons[buttonIndex].innerText === playerOne) {
    return;
  }
  if (buttons[buttonIndex].innerText === playerTwo) {
    return;
  }

  if (currentTurn === 1) {
    buttons[buttonIndex].innerText = playerOne;
    currentTurn = 2;
  } else {
    buttons[buttonIndex].innerText = playerTwo;
    currentTurn = 1;
  }
  console.log(buttons);
  Winning();
}

function Winning() {
  winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  for (let combination of winningCombinations) {
    console.log(buttons[0].innerText);
    console.log(buttons[1].innerText);
    console.log(buttons[2].innerText);
    if (
      buttons[combination[0]].innerText === playerOne &&
      buttons[combination[1]].innerText === playerOne &&
      buttons[combination[2]].innerText === playerOne
    ) {
      setTimeout(() => alert("Player 1, you win!"));
      window.location.reload();
      return;
    }
    if (
      buttons[combination[0]].innerText === playerTwo &&
      buttons[combination[1]].innerText === playerTwo &&
      buttons[combination[2]].innerText === playerTwo
    ) {
      setTimeout(() => alert("Player 2, you win!"));
      window.location.reload();
      return;
    }
  }

  for (let button of buttons) {
    if (button.innerText === "") {
      return;
    }
  }
  alert("It seems there's a tie! Want to try again?");
  window.location.reload();
}

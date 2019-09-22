const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let gameStarted = false;

// If the game hasn't started, start it on a keypress.

document.onkeypress = () => {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
};

// The click handler. Click a button, play a sound, add the click to the userClickedPattern
// array, animate the press, and then check the answer.

$(".btn").click(function() {
  let userChosenColor = this.id;

  playSound(userChosenColor);

  userClickedPattern.push(userChosenColor);

  console.log(`userClickedPattern is ${userClickedPattern}`);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// This is the main function that resets the user's click pattern,
// generates a random number to select the next color in the sequence,
// and highlights it for the user.

function nextSequence() {
  userClickedPattern = [];

  level++;

  $("h1").text(`Level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  console.log(`gamePattern is ${gamePattern}`);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

// Play a sound

function playSound(color) {
  const sound = new Audio();
  sound.src = `sounds/${color}.mp3`;
  sound.play();
}

// Animate a button when clicked

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Check if the answer is correct.
// If it is, show the next sequence after a timeout.
// If it isn't, play a nasty buzzer, flash the screen red, and reset the game.

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over. Press Any Key to Restart.");
    startOver();
  }
}

// Reset the game

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

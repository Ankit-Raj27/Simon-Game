alert(
  "How to play :  Press any key on your keyboard to start the game.\r\nOnce the game starts it'll blink a colour. The player has to click on the colour block and memorise the pattern of all blinking blocks.\r\n\r\n For example : If it blinks red, the player clicks on red; Thereafter if it blinks yellow, the player clicks on red+yellow; Then if it blinks blue, the player clicks on red+yellow+blue and so on.\r\n\r\n You better have a good memory or it's time to add almonds in your diet, mate! "
  
);

let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamePattern = [];

let started = false;
let level = 0;

$(document).keydown(function () {
  if (!started) {
    $("#title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // playSound(userChosenColour);
  // animatePress(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#title").text("Game Over, Press any key to start again!");

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

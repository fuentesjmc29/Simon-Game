var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;

$("img").click(function(){
    if (!started){
        started = true;
        nextSequence();
    }
});

function nextSequence() {
    level++;
    userPattern = [];
    $("h1").text(`Level ${level}`);
    $("p").text("");
    var randomNumber = Math.floor(Math.random()*4);
    var randomColour = buttonColours[randomNumber];
    gamePattern.push(randomColour);

    $(`#${randomColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomColour);
}

function makeSound(currentColour) {
    var audio = new Audio(`./sounds/${currentColour}.mp3`);
    audio.play();
}

$(`.btn`).click(function() {
    userSelectedCoulour = $(this).attr("id");
    userPattern.push(userSelectedCoulour);

    makeSound(userSelectedCoulour);
    animatePress(userSelectedCoulour);

    checkAnswer(userPattern.length-1);
})

function animatePress(selectedColour) {
    $(`#${selectedColour}`).addClass("pressed");
    setTimeout(function() {
        $(`#${selectedColour}`).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if ((gamePattern[currentLevel]) === (userPattern[currentLevel])) {
        if (gamePattern.length === userPattern.length) {
            setTimeout(function(){
                nextSequence();
            },500);
        }
    } else {
        $("h1").text("Game Over");
        $("p").text("Press Psyduck to Restart");
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        restartGame();
    }
}

function restartGame(){
    gamePattern = [];
    level = 0;
    started = false;
}

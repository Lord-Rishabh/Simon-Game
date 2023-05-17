var buttonColors = ["red" , "blue" , "green" , "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("keydown" , function() {
    if (started == false) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});


$(".btn").on("click" , function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    
    if(checkAnswer( (userClickedPattern.length) - 1 )){
        playSound(userChosenColor);
        animatePress(userChosenColor);
    }
    else {
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart.")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        gamePattern = [];
        level = 0;
        started = false;
        
    }
})

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if(gamePattern.length === userClickedPattern.length) {   
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
        return true;
    }
    
    else {
        return false;
    } 
}

function nextSequence() {

    userClickedPattern = [];
    level++; 
    $("#level-title").text("Level " + level);

    var randomNum = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNum]; 
    gamePattern.push(randomChosenColor);

    var temp = ("#" + randomChosenColor);
    $(temp).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}







// to play sound 
function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

//for animation when user clicks a button
function animatePress(currentColor) {
    var temp = ("#" + currentColor);
    $(temp).addClass("pressed");
    setTimeout( function () {
        $(temp).removeClass("pressed");
    },100);
}



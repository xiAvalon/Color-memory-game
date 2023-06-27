var buttonColours = ["red", "blue", "green", "yellow"];
var wrongSound = 'wrong';

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

//start the game
$(document).keypress(function(event) {
    if(event.which == 13 && !started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    userClickedPattern = [];    //resetting the userClickedPattern to an empty array after nextsequence is triggered.
    
    level++;

    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animation
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
}, 100);}


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success!");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong!");
        playSound(wrongSound);
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Enter to Restart");
        reset();
    }
}

//reset the game
function reset(){
    level = 0;
    gamePattern = [];
    started = false;
}
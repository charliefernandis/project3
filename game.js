
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;

$(document).keypress(function(){
if(start == false){
    $("#level-title").text("level "+level)
    start = true;
    nextSequence(); 
}})

$("#restart").click(function(){
    if(start == false){
        $("#level-title").text("level "+level)
        start = true;
        nextSequence(); 
    }})


var a = 0;
for(let i = 0; i<4; i++){
    document.querySelector("#"+buttonColours[i]).addEventListener("click" , function(){
        var userChosenColour = $("#"+buttonColours[i]).attr("id");
        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
        playSound(buttonColours[i]);
        
        
    })
    animatePress(buttonColours[i]);        
}




// a section for functions

function nextSequence() {
    userClickedPattern = [];
    level++; 

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#level-title").text("level "+level);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);



}   

function animatePress(currentColour){
    $("#"+currentColour).on("click" , function(){

        $("#"+currentColour).addClass("pressed");
        setTimeout(function(){
            $("#"+currentColour).removeClass("pressed");
        } , 100)
       
    })
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("success");
        

    if(userClickedPattern.length === gamePattern.length){
        
        setTimeout(function(){
            nextSequence();
        } , 1000 )
    }
}
    else{
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("game over , press any key to restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        startOver();
    }
    
}


function startOver(){
    gamePattern =[];
    level = 0;
    start = false ;
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
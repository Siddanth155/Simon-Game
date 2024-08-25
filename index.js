var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(function() {
     if (!started) {
       $("#level-title").text("Level " + level);
       nextSequence();
       started = true;
     }
   });
function nextSequence(){
     same=true;
     userClickedPattern=[];
     $("h1").text("Level "+ ++level);
     var randomNumber=Math.round(Math.random()*3); 
     var randomChosenColour=buttonColors[randomNumber];
     gamePattern.push(randomChosenColour);
     var ids="#"+randomChosenColour;
     $(ids).fadeOut(100).fadeIn(100);
     playSound(randomChosenColour);
     animatePress(randomChosenColour);

    }

$(".btn").click(function(event){
     var userChosenColour=event.target.id;
     userClickedPattern.push(userChosenColour);
     playSound(userChosenColour);
     animatePress(userChosenColour);
     if(userClickedPattern.length===gamePattern.length){
     checkAnswer(userClickedPattern.length-1);}
});

function checkAnswer(currentLevel){
     if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){  
          console.log("success");        
               if(gamePattern.length===userClickedPattern.length){
                    var same=true;
                    for(var i=0;i<userClickedPattern.length;i++){
                         if(userClickedPattern[i]!=gamePattern[i]){
                              same=false;
                          }
                    }if(same===true){
                         setTimeout(function () {
                              nextSequence();
                            }, 1000); 
                    }else if(same===false){
                         playSound("wrong");
                         $("body").addClass("game-over");
                         setTimeout(function(){
                         $("body").removeClass("game-over");
                         },200);
                         $("#level-title").text("Game Over, Press Any Key to Restart");
                         startOver();
                         console.log("wrong");
                    }
                                   
               }                
     }else{
          playSound("wrong");
          $("body").addClass("game-over");
          setTimeout(function(){
               $("body").removeClass("game-over");
          },200);
          $("#level-title").text("Game Over, Press Any Key to Restart");
          startOver();
          console.log("wrong");
     }
     
}
function playSound(name){
     var audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
}

function animatePress(currentColour){
     $("#"+currentColour).addClass("pressed");
     setTimeout(function(){
          $("#"+currentColour).removeClass("pressed");
     },10);  
}

function startOver(){
     level=0;
     gamePattern=[];
     started=false;
}


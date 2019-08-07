// Need to fix when spastic user behavior happens with a bunch of button presses while the computer is taking its turn.


var toggle = false;
var count = 0;
$("#counterText").hide();
var userTurn = false;
var strict = false;
var answerKey = [];
var playerAnswer = [];
var checkAnswer = 0;

$(document).ready(function() {
  // Makes the team text rounded
  $(".simpleArc").arctext({radius: 280});
  $(".harsherArc").arctext({radius: 180});
});

// Flips the On/Off toggle visually and resets everything when turned off
$("#onOffToggle").click(function() {
  if (toggle) {
    toggle = false;
    $("#onOffToggle").css("margin-left", "2px");
    $("#counterText").hide();
    userTurn = false;
    checkAnswer = 0;
    count = 0;
    answerKey = [];
    playerAnswer = [];
    $("#light").css("opacity", "0.5");
    strict = false;
  } else {
    toggle = true;
    $("#onOffToggle").css("margin-left", "27px");
    $("#counterText").html(" - -");
    $("#counterText").show();
  }
});

//Displays the round number
$("#startButton").click(function() {
  if (toggle) {
    if ($("#counterText").html() == "WIN") {
      count = 0;
      answerKey = [];
      playerAnswer = [];
      checkAnswer = 0;
      userTurn = false;
      $("#counterText").css("font-size", "67px").css("margin-left", "23px").css("position", "fixed").css("margin-top", "0px");
      $("#counterText").html("WIN");
    }
    if (count == 0) { 
      displayCount();
      setTimeout(function (){
        count++;
        displayCount();
        }, 500); 
       gameRunning(); 
    }
  }
 })
  


function beepShiz() {
  userTurn = false;
  for (i = 0; i < answerKey.length; i++) {
      (function(i){
        setTimeout(function(){
          if (answerKey[i] == 1) {
     greenActivated();
    } else if (answerKey[i] == 2) {
      pinkActivated();
    } else if (answerKey[i] == 3) {
      blackActivated();
    } else if (answerKey[i] == 4) {
      redActivated();
    } else if (answerKey[i] == 5) {
      blueActivated();
    } else {
                   console.log("weirdness check");
                   }
        }, i * 1000);
      }(i));
    
}
  userTurn = true;
  }
  

function round() {
  var team = (Math.floor(Math.random() * 5) + 1);
  answerKey.push(team);
  beepShiz();
}

function displayCount() {
  if (count < 10) {
  $("#counterText").html("0" + count);
} else {
  $("#counterText").html(count);
}
}

function gameRunning() {
  setTimeout(function (){
    if (toggle) {
      round();
    }
  }, 600);
}

$("#greenCircle").click(function() {
  if (toggle && userTurn) {
    greenActivated();
    playerAnswer.push(1);
  }
})
$("#pinkCircle").click(function() {
  if (toggle && userTurn) {
    pinkActivated();
    playerAnswer.push(2);
  }
})
$("#blackCircle").click(function() {
  if (toggle && userTurn) {
    blackActivated();
    playerAnswer.push(3);
  }
})
$("#redCircle").click(function() {
  if (toggle && userTurn) {
    redActivated();
    playerAnswer.push(4);
  }
})
$("#blueCircle").click(function() {
  if (toggle && userTurn) {
    blueActivated();
    playerAnswer.push(5);
  }
})

function greenActivated() {
   $("#greenCircle").css("background-color", "#33ff33");
    setTimeout(function (){
      $("#greenCircle").css("background-color", "green");
    }, 400);
    document.getElementById("beep1").play();
}

function pinkActivated() {
  $("#pinkCircle").css("background-color", "white");
    $("#hellcatText").css("color", "hotpink");
    setTimeout(function (){
      $("#pinkCircle").css("background-color", "hotpink");
      $("#hellcatText").css("color", "white");
    }, 400);
    document.getElementById("beep2").play();
}

function blackActivated() {
  $("#blackCircle").css("background-color", "gold");
    setTimeout(function (){
      $("#blackCircle").css("background-color", "black");
    }, 400);
    document.getElementById("beep3").play();
}

function redActivated() {
  $("#redCircle").css("background-color", "white");
    $("#rhinestoneText").css("color", "red");
    $("#cowgirlsText").css("color", "red");
    setTimeout(function (){
      $("#redCircle").css("background-color", "red");
      $("#rhinestoneText").css("color", "white");
      $("#cowgirlsText").css("color", "white");
    }, 400);
    document.getElementById("beep4").play();
}

function blueActivated() {
  $("#blueCircle").css("background-color", "#66a3ff");
    $("#rollerText").css("color", "blue");
    $("#rollerText").css("-webkit-text-stroke-color", "blue");
    setTimeout(function (){
      $("#blueCircle").css("background-color", "blue");
      $("#rollerText").css("color", "#66c2ff");
      $("#rollerText").css("-webkit-text-stroke-color", "white");
    }, 400);
    document.getElementById("beep2").play();
}

//Checks if user is right or wrong on each color circle click.
$(".colorCircles").click(function() {  
  if (userTurn && toggle) {
    if (playerAnswer[checkAnswer] == answerKey[checkAnswer]) {
        checkAnswer++;
        if (playerAnswer.length == answerKey.length) {
          userTurn = false;
          if (count < 20) {
            checkAnswer = 0;
            count++;
            setTimeout(function (){
              displayCount();
            }, 400);
            playerAnswer = [];
            setTimeout(function (){
              round();
            }, 1500);
          } else {
            $("#counterText").css("font-size", "52px").css("margin-left", "9px").css("position", "absolute").css("margin-top", "10px");
            $("#counterText").html("WIN");
          }
        }
      } else {
        userTurn = false;
        var replay = count;
        checkAnswer = 0;
        count = "XX";
        displayCount();    $("#counterText").fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
        playerAnswer = [];
        if (!strict) {
          setTimeout(function () {
            count = replay;
            displayCount();
            beepShiz();
          }, 2000);
        } else {
          checkAnswer = 0;
          answerKey = [];
          setTimeout(function () {
            count = 1;
            displayCount();
            gameRunning();
          }, 2000);
        }
      }
  }
})

//Toggles Strict mode on and off
$("#buttonTopAdj").click(function() {
  if (strict) {
    $("#light").css("opacity", "0.5");
    strict = false;
  } else {
    $("#light").css("opacity", "1");
    strict = true;
  }
})
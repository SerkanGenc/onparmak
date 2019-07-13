var current ;
var currentKeyCode ;
var pressed = null ;
var correct = 0 ;
var wrong = 0 ;
var duration = 1900 ;
var level = 0;
var gameOverLimit = 10 ;
var started = false ;
var slowdownFactor = 5 ;
var elapsedTimer = null ;
var elapsed = 0 ;
var charset = "678901" ;


function score(){
    $("#correct").html(correct);
    $("#wrong").html(wrong);
}

function showChars(){
    level++;
    $("#letter").css("background-color", "transparent");
    $("#letter").css("color", "#444");
    var rnd = Math.floor(Math.random()*charset.length);
    current = charset.charAt(rnd);
    currentKeyCode = charset.charCodeAt(rnd);
    $("#content").html(current).fadeIn(200).delay(duration-300).fadeOut(50, function(){
        if ( pressed === null){
            wrong++;
            score();
        }
    });
    pressed = null ;
    duration -= slowdownFactor ;
    if (duration < 1000) duration = 1000;
    //console.log(duration);
    $("#level").html(duration + " ms");
    if (wrong !== gameOverLimit)   window.setTimeout(showChars, duration);
      else {
        window.clearInterval(elapsedTimer);
        $("#main").hide();
        $("#gameover span").html($("#elapsed").html());
        $("#gameover").fadeIn(500);
      }
}

function elapsedTime(){
    elapsed++;
    var seconds = elapsed % 60 ;
    var minutes = Math.floor(elapsed / 60);
    var out = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) ;
    $("#elapsed").html(out);
}

$(function(){
  $(window).keypress(function(e){
      if (pressed === null && started === true) {
          pressed = e.keyCode ;
          if (pressed !== currentKeyCode) {
            $("#letter").css("background-color", "#F99");
            wrong++;
          } else {
            $("#letter").css("background-color", "#9F9");
            correct++;
          }
          score();
      }

      if (started === false && e.keyCode === 32) {
          started = true;
          $("#msg").hide();
          $("#inp").hide();
          $("#score").fadeIn(200);
          window.setTimeout(showChars, duration);
          elapsedTimer = window.setInterval(elapsedTime, 1000) ;
      }
  });
  if (localStorage.getItem("charset")) {
    charset = localStorage.getItem("charset");
    $("#charset").val(charset);
  }
  $("#set").click(function() {
    charset = $("#charset").val();
    localStorage.setItem("charset", charset);
  })
  $("#reset").click(function() {
    $("#charset").val("");
    localStorage.removeItem("charset");
  })
});

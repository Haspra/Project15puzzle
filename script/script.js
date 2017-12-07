/*HIDE OVERLAY*/

$( "#playButton" ).click(function() {
  $( "#overlay" ).animate({
    opacity: 0,
    height: "toggle"
  }, 1000, function() {
  });
});
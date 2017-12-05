var moves = 0;
var table; 
var rows; 
var columns;
var textMoves;
var arrayForBoard;

function start()
{
  var button = document.getElementById("newGame");
  button.addEventListener( "click", startNewGame, false );
  textMoves = document.getElementById("moves");
  table = document.getElementById("table");
  rows = 4;
  columns = 4;
  startNewGame();
}

function startNewGame()
{
  var arrayOfNumbers = new Array();
  var arrayHasNumberBeenUsed;
  var randomNumber = 0;
  var count = 0;
  moves = 0;
  rows = document.getElementById("rows").value;
  columns = document.getElementById("columns").value;
  textMoves.innerHTML = moves;
  arrayForBoard = new Array(rows);
  for (var i = 0; i < rows; i++)
  {
    arrayForBoard[i] = new Array(columns);
  }
 
 
 
 var arrayOfNumbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  
  for (var i = arrayOfNumbers.length-1; i >=0; i--) {

	var randomIndex = Math.floor(Math.random()*(i+1)); 
	var itemAtIndex = arrayOfNumbers[randomIndex]; 
	
	arrayOfNumbers[randomIndex] = arrayOfNumbers[i]; 
	arrayOfNumbers[i] = itemAtIndex;
}


  
 
  count = 0;
  for (var i = 0; i < rows; i++)
  {
    for (var j = 0; j < columns; j++)
    {
      arrayForBoard[i][j] = arrayOfNumbers[count];
      
      count++;
    }
} }
  

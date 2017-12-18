$("#infoImg").hide();

// OVERLAY
$( "#downBtn" ).click(function() {
  $("#down").delay(100).animate({
  	bottom: -1500
  }, 100, function(){
  });
  $("#logoImg")	.animate({
  	bottom: 2000
  }, 100, function(){
  });
  $( "#overlay").delay(750).fadeOut(100);
});

// BUTTON ANIMATIONS
$("#easy").mouseenter(function(){
	$("body").css("background-color", "#437356");
});
$("#easy").mouseleave(function(){
	$("body").css("background-color", "#DDA935");
});

$("#medium").mouseenter(function(){
	$("body").css("background-color", "#1E4155");
});
$("#medium").mouseleave(function(){
	$("body").css("background-color", "#DDA935");
});

$("#hard").mouseenter(function(){
	$("body").css("background-color", "#B94A50");
});
$("#hard").mouseleave(function(){
	$("body").css("background-color", "#DDA935");
});

// SHUFFLE
$("#start").click(function(){
   $("#butFirst").fadeOut(250);
   $(this).fadeOut(250);
});

// REPEAT
$(".easy").click(function(){
  countdown(10);
});
$(".rptE").click(function(){
  $("#wl").fadeOut(250);
  countdown(10);
});

$(".medium").click(function(){
  countdown(5);
});
$(".rptM").click(function(){
  $("#wl").fadeOut(250);
  countdown(5);
});

$(".hard").click(function(){
  countdown(2);
});
$(".rptH").click(function(){
  $("#wl").fadeOut(250);
  countdown(2);
});

// INFO
$("#info").hover(function() {
    $('#infoImg').clearQueue().stop().fadeToggle(200);
});

// COUNTDOWN
var timeoutHandle;
function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
    function tick() {
        var counter = document.getElementById("time");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML =
        current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            timeoutHandle=setTimeout(tick, 1000);
        } else {

            if(mins > 1){

               // countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
               setTimeout(function () { countdown(mins - 1); }, 1000);

            }
        }
        if (mins==1 && seconds==0) {
          document.getElementById("winOrLose").innerHTML="TIME OUT, YOU LOSE!";
          document.getElementById('wl').style.display = "block";
  
        }
    }
    tick();
};

// GAME
(function(){
  
  var state=1;
  var puzzle=document.getElementById('puzzle');


  solve();
  

  puzzle.addEventListener("click", function(e){
    if(state==1){ 
  
      puzzle.className="animate";
      shiftCell(e.target);
    }
  });
  
  // Listens for click on control buttons
  document.getElementById("start").addEventListener("click", scramble);
  document.getElementById("rpt").addEventListener("click", scramble);


  /**
   * Creates solved puzzle
   *
   */
  function solve ()
  {
    
    if (state==0)
      return;
    
    puzzle.innerHTML="";
    
    var n=1;
    for (var i=0; i<=3; i++)
    {
      for(var j=0; j<=3; j++)
      {
        var cell=document.createElement("span");
        cell.id='cell-'+i+'-'+j;
        cell.style.left = (j*90+3*j+3)+"px";
        cell.style.top = (i*90+3*i+3)+"px";
        
        if (n<=15)
        {
          cell.classList.add("number");
          cell.classList.add((i%2==0 && j%2>0 || i%2>0 && j%2==0)?"dark":"light");
          cell.innerHTML=(n++).toString();
        }

        else
          cell.className="empty";
        
        puzzle.appendChild(cell);
      }
    }
    
  }

  /**
   * Shifts number cell to the empty cell
   * 
   */
  function shiftCell (cell)
  {
    
    // Checks if selected cell has number
    if (cell.clasName!="empty")
    {
      
      // Tries to get empty adjacent cell
      var emptyCell=getEmptyAdjacentCell(cell);
      
      if (emptyCell)
      {
        // Temporary data
        var tmp={style: cell.style.cssText, id: cell.id};
        
        // Exchanges id and style values
        cell.style.cssText=emptyCell.style.cssText;
        cell.id=emptyCell.id;
        emptyCell.style.cssText=tmp.style;
        emptyCell.id=tmp.id;
        
        if (state==1)
        {
          // Checks the order of numbers
          checkOrder();
        }
      }
    }
    
  }

  /**
   * Gets specific cell by row and column
   *
   */
  function getCell (row, col)
  {
    return document.getElementById("cell-"+row+"-"+col);
  }
    

  /**
   * Gets empty cell
   *
   */
  function getEmptyCell ()
  {
    return puzzle.querySelector(".empty"); 
  }
  
  /**
   * Gets empty adjacent cell if it exists
   *
   */
  function getEmptyAdjacentCell (cell)
  {
    
    // Gets all adjacent cells
    var adjacent=getAdjacentCells(cell);
    
    // Searches for empty cell
    for (var i=0; i<adjacent.length; i++)
    {
      if (adjacent[i].className=="empty")
        return adjacent[i];
    }
    
    // Empty adjacent cell was not found
    return false;
    
  }

  /**
   * Gets all adjacent cells
   *
   */
  function getAdjacentCells (cell)
  {
    
    var id=cell.id.split("-");
    
    // Gets cell position indexes
    var row=parseInt(id[1]);
    var col=parseInt(id[2]);
    
    var adjacent=[];
    
    // Gets all possible adjacent cells
    if (row<3){adjacent.push(getCell(row+1, col));}      
    if (row>0){adjacent.push(getCell(row-1, col));}
    if (col<3){adjacent.push(getCell(row, col+1));}
    if (col>0){adjacent.push(getCell(row, col-1));}
    
    return adjacent;
  }
  
  /**
   * Chechs if the order of numbers is correct
   *
   */
  function checkOrder ()
  {
    
    // Checks if the empty cell is in correct position
    if (getCell(3, 3).className!="empty")
      return;
  
    var n=1;
    // Goes through all cells and checks numbers
    for (var i=0; i<=3; i++)
    {
      for (var j=0; j<=3; j++){
        if (n<=15 && getCell(i, j).innerHTML!=n.toString())
          // Order is not correct
          return;
        n++;
      }
    }
    
    // Puzzle is solved, offers to scramble it
    document.getElementById('wl').style.display = "block";
    document.getElementById('time').innerHTML = "WELL DONE!";
  }

    /**
   * Scrambles puzzle
   *
   */
  function scramble ()
  {
  
    if (state==0)
      return;
    
    puzzle.removeAttribute("class");
    state=0;
    
    var previousCell;
    var i=1;
    
    var interval=setInterval(function()
    {
      if (i<=100)
      {
        var adjacent=getAdjacentCells(getEmptyCell());
        if (previousCell)
        {
          for (var j=adjacent.length-1; j>=0; j--)
          {
            if (adjacent[j].innerHTML==previousCell.innerHTML)
              adjacent.splice(j, 1);
          }
        }
        // Gets random adjacent cell and memorizes it for the next iteration
        previousCell=adjacent[rand(0, adjacent.length-1)];
        shiftCell(previousCell);
        i++;
      }

      else
      {
        clearInterval(interval);
        state=1;
      }
    }, 5);

  }
  
  /**
   * Generates random number
   *
   */
  function rand (from, to)
  {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }

}()); 
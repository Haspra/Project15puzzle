$(function() {
  $("#infoImg").hide();
});

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
$(function(){
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
});

// INFO
$(function(){
  $("#info").hover(function() {
      $('#infoImg').clearQueue().stop().fadeToggle(200);
  });
});

// COUNTDOWN
var timeoutHandle;
function countdown (minutes)
{
    var seconds=60;
    var mins=minutes
    
    function tick ()
    {
        var counter=document.getElementById("time");
        var current_minutes=mins-1;
        seconds--;
        counter.innerHTML=current_minutes.toString()+":"+(seconds<10?"0":"") + String(seconds);
        if (seconds>0)
            timeoutHandle=setTimeout(tick, 1000);
        else
        {
            if (mins>1)
               setTimeout(function () {countdown(mins-1);}, 1000);
        }

        if (mins==1 && seconds==0)
        {
          document.getElementById("winOrLose").innerHTML="TIME OUT, YOU LOSE!";
          document.getElementById('wl').style.display="block";
        }
      }

      tick();
};

// GAME


(function()
{
  var puzzle=document.getElementById('puzzle');
  var state = 1;

  createGameboard();
  

  puzzle.addEventListener("click", function(e)
  {
    if (state==1)
    {
      puzzle.className="animate";
      moveCell(e.target);
    }
  });
  
  document.getElementById("start").addEventListener("click", mix);
  

  function createGameboard ()
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
        cell.style.left=(j*90+3*j+3)+"px";
        cell.style.top=(i*90+3*i+3)+"px";
        
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

  function moveCell (cell)
  {
    if (cell.clasName!="empty")
    {
      var emptyCell=getEmptyNearbyCell(cell);
      
      if (emptyCell)
      {
        var tmp={style: cell.style.cssText, id: cell.id};

        cell.style.cssText=emptyCell.style.cssText;
        cell.id=emptyCell.id;
        emptyCell.style.cssText=tmp.style;
        emptyCell.id=tmp.id;
        
        if (state==1)
        {
          checkOrder();
        }
      }
    }
  }


  function getCell (row, col)
  {
    return document.getElementById("cell-"+row+"-"+col);
  }
    
  function getEmptyCell ()
  {
    return puzzle.querySelector(".empty"); 
  }
  
  function getEmptyNearbyCell (cell)
  {
    
    var nearby=getNearbyCells(cell);
    
    for (var i=0; i<nearby.length; i++)
    {
      if (nearby[i].className=="empty")
        return nearby[i];
    }
    
    return false;
    
  }

  function getNearbyCells (cell)
  {
    
    var id=cell.id.split("-");

    var row=parseInt(id[1]);
    var col=parseInt(id[2]);
    
    var nearby=[];
    
    if (row<3){nearby.push(getCell(row+1, col));}      
    if (row>0){nearby.push(getCell(row-1, col));}
    if (col<3){nearby.push(getCell(row, col+1));}
    if (col>0){nearby.push(getCell(row, col-1));}
    
    return nearby;
  }
  
  function checkOrder ()
  {
    
    if (getCell(3, 3).className!="empty")
      return;
  
    var n=1;
    for (var i=0; i<=3; i++)
    {
      for (var j=0; j<=3; j++){
        if (n<=15 && getCell(i, j).innerHTML!=n.toString())
          return;
        n++;
      }
    }

    setTimeout(function()
    {
    document.getElementById('wl').style.display="block";
    document.getElementById("time").style.display="none";
    document.getElementById("winOrLose").innerHTML="Congratulation, You Won!";
    document.getElementById('changeTime').style.display = "block";}, 200);
  }

  function mix ()
  {  
    document.getElementById("start").style.display="none";
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
        var nearby=getNearbyCells(getEmptyCell());
        if (previousCell)
        {
          for (var j=nearby.length-1; j>=0; j--)
          {
            if (nearby[j].innerHTML==previousCell.innerHTML)
              nearby.splice(j, 1);
          }
        }

        previousCell=nearby[rand(0, nearby.length-1)];
        moveCell(previousCell);
        i++;
      }

      else
      {
        clearInterval(interval);
        state=1;
      }
    }, 5);

}
  

  function rand (from, to)
  {
    return Math.floor(Math.random()*(to-from+1))+from;
  }
}());

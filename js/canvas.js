var paint;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();

var navDiv = document.getElementById('navbarSupportedContent');
var canvasDiv = document.getElementById("canvas-wrap");
var canvas = document.createElement('canvas');
var btn = document.createElement('button');
btn.setAttribute('onclick', 'clearMe()');
btn.innerHTML = "clear";
canvas.setAttribute('width',document.body.clientWidth);
canvas.setAttribute('height',document.body.clientHeight);
canvas.setAttribute('id','canvas');
canvas.setAttribute('tabindex',1);
canvasDiv.appendChild(canvas);
navDiv.appendChild(btn);

var context = canvas.getContext("2d");
function clearMe(){
  context.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
}
function drawme(){

  function addClick(x,y,dragging){
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  }
  function redraw(){
    context.clearRect(0,0,context.canvas.width,context.canvas.height);
    context.strokeStyle = "#FFFFFF";
    context.lineJoin = "round";
    context.lineWidth = 5;

    for(var i = 0; i < clickX.length; i++){
      context.beginPath();
      if(clickDrag[i] && i){
        context.moveTo(clickX[i-1],clickY[i-1]);
      }
      else{
        context.moveTo(clickX[i]-1,clickY[i]);

      }
      context.lineTo(clickX[i],clickY[i]);
      context.closePath();
      context.stroke();
    }
  }
  $('#canvas').mousedown(function(e){
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    paint = true;
    addClick(mouseX,mouseY);
    redraw();
  });

  $('#canvas').mousemove(function(e){
    if(paint){
      addClick( e.pageX - this.offsetLeft,e.pageY - this.offsetTop,true);
      redraw();
    }
  });

  $('canvas').mouseup(function(e){
    paint = false;
  });

  $('canvas').mouseleave(function(e){
    paint = false;
  })
}

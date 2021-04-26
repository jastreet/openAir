const { ipcRenderer } = require('electron');

var canvas = document.querySelector('.myCanvas');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight-85;
var inputfield = document.getElementById("input").value;
var ctx = canvas.getContext('2d');
area.cols = 50;
    area.wrap = "hard";
/*ctx.fillStyle = '#9bc1ff';
ctx.fillRect(0,0,width,height);
ctx.font = "30px Arial";*/


send.onclick = function() {
  console.log(document.getElementById("input").value);
  ipcRenderer.send('message', document.getElementById("input").value);

  

}


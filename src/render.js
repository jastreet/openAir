import {events, chat} from './index.js';

var eventEmitter = new events.EventEmitter();

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

var peerListener = function peerListener() {
    console.log('peerListener executed.');
}
eventEmitter.addListener('connection', peerListener);

var messageListener = function messageListener() {
    console.log('messageListener received.');
}
eventEmitter.addListener('message', messageListener);

send.onclick = function() {
  console.log(document.getElementById("input").value);
  document.getElementById("input").value = '';
}



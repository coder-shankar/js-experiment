// gobal variable area
var startGame = true;
var speedDy = 1;
var score = 0;





var canvas = document.getElementById('canvas');
//Canvas object

function Canvas(){

var self = this;
self.backgroundY = 0;
self.backgroundDY = speedDy;


self.loopBackground = function(){

self.backgroundY += self.backgroundDY;
canvas.style.backgroundPositionY = self.backgroundY+"px";

    }
}


//Dargon Object




function StartGame(){
var window =   new  Canvas();

setInterval(function(){
    window.loopBackground();

},10);
 
    // createDragon();
    // LoadPlane();
    // createBullet();


}

StartGame();
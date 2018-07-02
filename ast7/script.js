// gobal variable area
var startGame = true;
var speedDy = 3;
var score = 0;
var dragoncounter = 0;
var dragonCollection = [];
var bulletCollection = [];
var plane = new Plane();
var canvas = document.getElementById('canvas');
document.onkeydown = checkKey;


//game start from here

loadGame();





//Canvas object

function Canvas(){

var self = this;
self.backgroundY = 0;
self.backgroundDY = speedDy;



self.loopBackground = function(){

    self.backgroundY += self.backgroundDY;
    canvas.style.backgroundPositionY = self.backgroundY+"px";


    };
}


//Dargon Object

function Dragon(){
var self = this;
    //position 

self.x = 0;
self.y = 0;
self.health = 2;

self.randomWidth = [0,160,320];

self.$elem = document.createElement('div');
self.createDragon = function(){
    
    self.$elem.className = "dragon";
    self.$elem.style.display = "block";
    self.x = self.randomWidth[Math.floor(Math.random()*3)];
    self.$elem.style.left = self.x+"px";
    canvas.appendChild(self.$elem);

};


self.moveDragon = function(){
   
    self.y += speedDy; 
    self.$elem.style.top = self.y +"px";


};




}

// Plane object
function Plane(){
var self = this;
self.x = 0;
self.y = 500;
self.$elem = document.getElementById('plane');
    
}





// Bullet objects

function Bullet(){
    var self = this;
    self.dy = 10;
    self.x = (plane.x+50);
    self.y = plane.y;
    
    self.$elem = document.createElement('div');

    self.createBullet = function(){
        self.$elem.className = "bullet";
       canvas.appendChild(self.$elem);
    }



    self.moveBullet = function(){
        self.y = self.y -self.dy;
        self.$elem.style.top = self.y+"px";
        self.$elem.style.left = self.x +"px";
        self.$elem.style.display ="block";
    }  
    
    self.destoryBullet = function(){}

}




// Game Object


function Game(){

    var self = this;
    self.window =   new  Canvas();


    var createDragon =function (){
    

        if(dragoncounter>100){
            var dragon = new Dragon();
            dragonCollection.push(dragon);
            dragon.createDragon();
            dragoncounter =0;

        }
    }


    
    var moveDragon = function (){
        var dragonArray = dragonCollection;
    
        for (var i =0;i<dragonArray.length ;i++){
            
            dragonArray[i].moveDragon();
    
            if(dragonArray[i].y>500){
                
                dragonArray[i].$elem.remove();
    
                dragonCollection.shift();
         
                    
            }
    
        }
    
    
    
    }

    

    self.createBullet =function (){
    
        var bul = new Bullet();
         bul.createBullet();
        bulletCollection.push(bul);

  
}


    var moveBullet =function (){
        

        if(bulletCollection!==undefined && bulletCollection.length>0){
      
        var bulletArray = bulletCollection;
      
          for (var i =0;i<bulletArray.length ;i++){
            
            
          
            if(bulletArray[i].y<0){
            
                bulletArray[i].$elem.remove();
                bulletArray[i] = null;
                bulletCollection = removeNull(bulletArray);
             
            }

            else{
                bulletArray[i].moveBullet();
            }

    
        }

        
    
    }
        
    }
    
    
   
    var collide =function (){


        var dragonArray = dragonCollection;
        var bulletArray = bulletCollection;
    
    
        var pl =  plane;
    
        for (var i =0; i<dragonArray.length;i++){
            if((Math.abs(pl.x-dragonArray[i].x))<(100) && (Math.abs(pl.y-dragonArray[i].y))<(100)){
                
                
                dragonArray[i].$elem.remove();
                dragonArray[i] = null;
                dragonCollection = removeNull(dragonArray);
                startGame = false;
                game.gameOver();
                
            }
        }
    

        if((dragonArray!==undefined && bulletArray !==undefined && dragonArray.length>0 && bulletArray.length>0) ){
    
            for(var i =0;i<dragonArray.length;i++){
                var dargon = dragonArray[i];
    
                if(dargon!==null){
                for (var j =0;j<bulletArray.length;j++ ){
    
                    var bullet = bulletArray[j];
                    if(bullet!==null){
    
                    if (Math.abs(dargon.x- bullet.x) < (100+10) && Math.abs(dargon.y - bullet.y) < (110+10)){
                        
                       
                        if(dragonArray[i].health<0){

                        
                        dragonArray[i].$elem.remove();
                        dragonArray[i] = null;
                        dragonCollection = removeNull(dragonArray);

                        } 
                        else{
                            dragonArray[i].health--;
                        }
    
                        bulletArray[j].$elem.remove();
                        bulletArray[j] = null;
                        bulletCollection = removeNull(bulletArray);
                        
    
                        score += 10;
    
                        game.updateScore();
                 
            
                         
                    }
    
                }
    
    
    
                }
            }
            }
    
    
        }
       
    
    }
   
   
   
    self.updateScore =function(){
        var y = document.getElementById('score');
        y.innerHTML = "score: "+score;
    }




    self.StartGame =function (){

    var x =setInterval(function(){
            if(startGame){
            self.window.loopBackground();
            createDragon();
            moveDragon();
            moveBullet();
            collide();

            dragoncounter++;

            }

            else{
                clearInterval(x);
            }




        },15);

   


    }
    
    

    self.gameOver =function (){

        var x = document.createElement('div');
        x.className = "gameover";
        x.innerHTML = "Game Over "+"<br> Score: "+ score ;
    
        canvas.appendChild(x);

        var resetButton = document.createElement("button");
        resetButton.innerHTML = "Play Again";
        resetButton.className = "reset-button";

        resetButton.addEventListener("click", function ( ) {

            x.remove();
            resetButton.remove();

            game.resetGame();
  

        });
        x.appendChild(resetButton);

    }

    self. resetGame = function () {
        bulletcounter =0;
        score =0;
        self.window.backgroundY =0;
        self.window.loopBackground();
        startGame = true;


        for (var i =0;i<bulletCollection.length ;i++){
            
                bulletCollection[i].$elem.remove();
                bulletCollection[i] = null;
                bulletCollection = removeNull(bulletCollection); 

        }


        for (var i =0;i<dragonCollection.length ;i++){
            dragonCollection[i].$elem.remove();
            dragonCollection[i] = null;
            dragonCollection = removeNull(dragonCollection);

    }
loadGame();



    }

    

}



function checkKey(e){
    e = e||window.event;

    switch(e.keyCode){

        case 32:
          game.createBullet();
          break;


        case 39:

        if(plane.x === 0 ){
            plane.x = 160;
        }
        else if (plane.x ===160){
            plane.x = 320;
        }
        else{
            plane.x =320;
        }

        plane.$elem.style.left = plane.x+ "px";
        break;


        case 37:

        if(plane.x === 320 ){
            plane.x = 160;
        }
        else if (plane.x ===160){
            plane.x = 0;
        }
        else{
            plane.x =0;
        }

        plane.$elem.style.left = plane.x+ "px";
        break;

        default:


    }

}


function  loadGame(){
    game = new Game();
   var x = document.createElement('button');
   x.className = "startgame";
   x.innerHTML = "start Game";

   canvas.appendChild(x);

   game.updateScore();
   x.onclick  = function(){
       x.remove();
       game.StartGame();
   }

}




function removeNull(array){
    var temp = []

    for (var i =0;i<array.length;i++){

        if(array[i]!=null){
            temp.push(array[i]);
        }
    }
    return temp;

}




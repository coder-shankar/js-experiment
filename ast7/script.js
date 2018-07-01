// gobal variable area
var startGame = true;
var speedDy = 3;
var score = 0;
var counter = 0;
var dragonCollection = [];
var bulletCollection = [];
var plane = new Plane();

var canvas = document.getElementById('canvas');


document.onkeydown = checkKey;

StartGame();


function StartGame(){
    var window =   new  Canvas();
    
 
    setInterval(function(){
        if(startGame){   
        window.loopBackground();
        createDragon();
        moveDragon();
        moveBullet();
        collide();
       
       
      
        counter++;
        
        }
    
    },15);
    
    
     
        // createDragon();
        // LoadPlane();
        // createBullet();
    
    
    }


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

self.fire = function(){

    var bul = new Bullet();
    bul.createBullet();

}
 

    
}





// Bullet objects

function Bullet(){
    self = this;
    self.dy = 15;
    self.x = (plane.x+50);
    self.y = plane.y;
    
    self.$elem = document.createElement('div');

    self.createBullet = function(){
        self.$elem.className = "bullet";
        self.$elem.style.display = "none";
       canvas.appendChild(self.$elem);
      
    
    }



    self.moveBullet = function(){
        
        var temp = self.y -self.dy;
        self.y = temp;

        self.$elem.style.top = self.y+"px";
        self.$elem.style.left = self.x +"px";
        self.$elem.style.display ="block";
    }

    

}










//functions 


function checkKey(e){
    e = e||window.event;

    switch(e.keyCode){

        case 38:
       createBullet();
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

function createDragon(){
    

    if(counter>(100-3*speedDy)){
        var dragon = new Dragon();
        dragonCollection.push(dragon);
        dragon.createDragon();
        counter =0;


    }
}


function moveDragon(){
var dragonArray = dragonCollection.slice(0,dragonCollection.length);

    for (var i =0;i<dragonArray.length ;i++){
        
        dragonArray[i].moveDragon();

        if(dragonArray[i].y>500){
            
            dragonArray[i].$elem.remove();

            dragonCollection.shift();
     
                
        }

    }



}


function createBullet(){
    
        var bul = new Bullet();
        bul.createBullet();
        bulletCollection.push(bul);
        


}


function moveBullet(){

    if(bulletCollection!==undefined){
    var bulletArray = bulletCollection.slice(0,bulletCollection.length);

    for (var i =0;i<bulletArray.length ;i++){
        
        
        bulletArray[i].moveBullet();
        if(bulletArray[i].y<0){
        
            bulletArray[i].$elem.remove();
            bulletArray[i] = null;
            bulletCollection = removeNull(bulletArray);
            // bulletCollection.shift();
        }
        

        
        

    }

}
    
}


function collide(){


    var dragonArray = dragonCollection;
    var bulletArray = bulletCollection;


    var pl =  plane;

    for (var i =0; i<dragonArray.length;i++){
        if((Math.abs(pl.x-dragonArray[i].x))<(100) && (Math.abs(pl.y-dragonArray[i].y))<(100)){
            
            
            dragonArray[i].$elem.remove();
            dragonArray[i] = null;
            dragonCollection = removeNull(dragonArray);
            startGame = false;
            gameOver();




            
        }
    }




    if((dragonArray!==undefined && bulletArray !==undefined && dragonArray.length>0 && bulletArray.length>0) ){

        for(var i =0;i<dragonArray.length;i++){
            var dargon = dragonArray[i];

            for (var j =0;j<bulletArray.length;j++ ){

                var bullet = bulletArray[j];


                if (Math.abs(dargon.x- bullet.x) < (100+10) && Math.abs(dargon.y - bullet.y) < (110+10)){

                    dragonArray[i].$elem.remove();
                    dragonArray[i] = null;
                    dragonCollection = removeNull(dragonArray);

                    bulletArray[j].$elem.remove();
                    bulletArray[j] = null;
                    bulletCollection = removeNull(bulletArray);

                    
             
        
                     
                }





            }
        }


    }
   

}


function removeNull(array){
    var temp = []

    for (var i =0;i<array.length;i++){

        if(array[i]!==null){
            temp.push(array[i]);
        }
    }
    return temp;

}



function gameOver(){

    var x = document.createElement('div');
    x.className = "gameover";
    x.innerHTML = "Game Over";

    canvas.appendChild(x);


}
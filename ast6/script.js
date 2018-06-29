
$body = document.getElementsByTagName('body')[0];
direction = [-1,1];


function Container(props){
    var self = this;
  self.$elem = document.createElement('div');
  self.$parent = props.$parent;
  self.height = props.height;
  self.width  = props.width;
  self.backgroundColor = props.backgroundColor;
  self.$elem.style.position = "relative";
  self.boxCollection = []


  
 


  self.plot = function(){

    self.$elem.className = "wrapper";
    self.$elem.style.height = self.height + "px";
    self.$elem.style.width = self.width + "px";
    self.$elem.style.backgroundColor = self.backgroundColor;
    self.$elem.style.border ="5px solid grey";
    self.$elem.position ="relative";
    self.$parent.appendChild(self.$elem);
   
    
    
  }

  self.addBox = function(box){
     self.boxCollection.push(box);
  }

  self.checkBallCollision  = function(){
    for (var i = 0; i < self.boxCollection.length-1;i++){
        var point1 = self.boxCollection[i];
       
        for (var j = i+1; j<self.boxCollection.length; j++){
          var point2 = self.boxCollection[j];
    
       
     
            
          if (Math.abs(point1.x- point2.x) < 20 && Math.abs(point1.y - point2.y) < 20){
  

                      point1.dx = point1.dx*direction[Math.floor(Math.random()*2)];
    
                     point2.dx = point2.dx*direction[Math.floor(Math.random()*2)];
    
                        point1.dy = point1.dy*direction[Math.floor(Math.random()*2)];
    
                        point2.dy = point2.dy*direction[Math.floor(Math.random()*2)];
          }
        }
      }

  };


  
self.init = function(noOfBall){

    self.plot();
     for(var i =0;i<noOfBall;i++){
    
    var props1 = {x:Math.floor(Math.random()*480),y:Math.floor(Math.random()*480),dx:direction[Math.floor(Math.random()*2)],dy:direction[Math.floor(Math.random()*2)],speed:1,height:20,width:20,parent:board.$elem};
    var ball = new Box(props1);
    ball.plot();
    self.addBox(ball);
    
    
    }
    


    
        setInterval(function(){
        self.boxCollection.forEach(ball => {
    
          ball.increment();
          ball.checkPosition();
         ball.checkWallCollision();
         ball.update();
         board.checkBallCollision();;
    
        });
     },10);   
    
    
 
    
     
  

}



function Box(props){
    var self = this;
    self.x = props.x;
    self.y = props.y;
    self.dx = props.dx;
    self.dy = props.dy;
    self.speed = props.speed||3;
    self.height = props.height;
    self.width = props.width;
    self.$elem = document.createElement("div");

    self.parent = props.parent;
    self.$elem.onclick = function(){
        this.remove();

    };
   
    self.update = function(){
        self.$elem.style.top  = self.y +"px";
        self.$elem.style.left = self.x + "px";
    }

    self.increment = function(){
      
        self.x +=self.dx *self.speed;
        self.y +=self.dy *self.speed;
        
    }

    this.plot  = function(){
        self.$elem.className = "box";
        self.$elem.style.height = self.height + "px";
        self.$elem.style.width = self.width + "px";
        self.$elem.style.backgroundColor = self.backgroundColor||"red";
        self.$elem.style.position ="absolute";
        self.parent.appendChild(self.$elem);
        
        self.update();
       
        
    }


    self.checkPosition = function (){

        if (self.x>480){
            self.x = 480;
        }
    
    
        if (self.y>480){
            self.y = 480;
        }
    
    
        if (self.x<0){
            self.x = 0;
        }
    
    
        if (self.ytop<0){
            self.y = 0;
        }
    }
    

    self.checkWallCollision = function(){

        containerTop = 0;
        containerLeft = 0;
    
    
    if(self.y <= containerTop){
    self.dy = self.dy*-1;
    }
    
    
    if(self.x<= containerLeft){
    
    
    self.dx = self.dx*-1;
    
    }
    
    if(self.x+20>=500){
    
    
    self.dx = self.dx* -1;
    
    }
    
    if (self.y+20>=500){
    
    self.dy = self.dy*-1;
   
    
    }
    
    



    }
 

}
}




var props = {$parent:$body,height:500,width:500,backgroundColor:"black",};

var board = new Container (props);
board.init(noOfBall=10);


 

var props = {$parent:$body,height:500,width:500,backgroundColor:"black",};

var board = new Container (props);
board.init(noOfBall=10);
var graph = document.getElementById("wrapper");
graph.style.height = "500px";
graph.style.width = "500px";
graph.style.position = "relative";
graph.style.background ="black"


var direction = [-1,1];



// generates random numbers
function randomFunction (startValue , stopValue){

    return Math.floor(Math.random()*(stopValue - startValue) + startValue);
}


// function to generate ants
function generatePoints(){
    var pointsCollection = [];

    for(var i = 0;i< 10;i++){

    var point = document.createElement("div");
    point .style.background="red";
    point.style.height ="10px"
    point.style.width = "10px"
    point.style.borderRadius = "5px";
    point.style.position = "absolute";
    graph.appendChild(point);




        var x = randomFunction(0,450);
        var y = randomFunction(0,450);


        var point = {dx:1,dy:1,xleft:x,ytop:y,$elem:point};
        pointsCollection.push(point);

    }
    return pointsCollection;
}


// render point
function updatePoint(point){


    point.$elem.style.top = point.ytop+"px";
    point.$elem.style.left = point.xleft+"px";

}


function checkBoundaryCollision(point){

    containerTop = 0;
    containerLeft = 0;


if(point.ytop <= containerTop){
point.dy = point.dy*-1;
}


if(point.xleft<= containerLeft){


point.dx = point.dx*-1;

}

if(point.xleft+10>=500){


point.dx = point.dx* -1;

}

if (point.ytop+10>=500){

point.dy = point.dy*-1;
point.dx = point.dx* -1;

}



}


function checkPoint(point){
    if (point.xleft>490){
        point.xleft = 490;
    }


    if (point.ytop>490){
        point.ytop = 490;
    }


    if (point.xleft<0){
        point.xleft = 0;
    }


    if (point.ytop<0){
        point.ytop = 0;
    }
}


function checkBallCollision(pointsCollection){
  for (var i = 0; i < pointsCollection.length-1;i++){
      

    var point1 = pointsCollection[i];
   
    for (var j = i+1; j<pointsCollection.length; j++){
      var point2 = pointsCollection[j];

     

 

      if (Math.abs(point1.xleft - point2.xleft) < 10 && Math.abs(point1.ytop - point2.ytop) < 10){
    
            
                  point1.dx = point1.dx*-1;

                 point2.dx = point2.dx*-1;

                    point1.dy = point1.dy*-1;

                    point2.dy = point2.dy*-1;
      }
    }
  }
}


function plot(){

    var pointsCollection = generatePoints();




    var  speed = 2;
    setInterval(function(){


        for (var i =0;i<pointsCollection.length;i++){

     var point = pointsCollection [i];
        point.xleft = point.xleft +point.dx * speed;
        point.ytop = point.ytop + point.dy * speed;

        checkBoundaryCollision(point);
        checkPoint(point);
        
        updatePoint(point);
        checkBallCollision(pointsCollection);

    }
  },50);


pointsCollection.forEach(function(point)
{
  var index = pointsCollection.indexOf(point);

point.$elem.onclick = function () {

  pointsCollection.splice(index,1);

this.remove();

}

}

);


}
plot();

var graph = document.getElementById("wrapper");
graph.style.height = "500px";
graph.style.width = "500px";
graph.style.position = "relative";
graph.style.background ="black"



// generates random numbers
function randomFunction (startValue , stopValue){

    return Math.floor(Math.random()*(stopValue - startValue) + startValue);
}


// function to generate ants
function generatePoints(){
    var pointsCollection = [];

    for(var i = 0;i< 10;i++){

    var point = document.createElement("div");
    point .style.background="blue";
    point.style.height ="10px"
    point.style.width = "10px"
    // point.style.borderRadius = "5px";
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
    if (point.x>480){
        point.x = 480;
    }


    if (point.y>480){
        point.y = 480;
    }


    if (point.x<0){
        point.x = 0;
    }


    if (point.y<0){
        point.y = 0;
    }
}

function checkBallCollision(pointsCollection){

  for (var i = 0; i < pointsCollection.length;i++){

      var point1 = pointsCollection[i];
      // console.log(point1);
    for (var j = 0; j<pointsCollection.length; j++){
      var point2 = pointsCollection[j];


      if(point1!=point2&& (Math.abs((point1.x-point2.x))<=10&& Math.abs( (point1.y-point2.y))<=10)){
            //just setting random motion
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




    var  speed = 5;
    setInterval(function(){


        for (var i =0;i<pointsCollection.length;i++){

                var point = pointsCollection [i];
        point.xleft = point.xleft +point.dx * speed;
        point.ytop = point.ytop + point.dy * speed;



      

        checkBoundaryCollision(point);
        checkPoint(point);
        checkBallCollision(pointsCollection);
        updatePoint(point);

    }
  },100);


pointsCollection.forEach(function(point)
{
point.$elem.onclick = function () {

this.remove();
}

}

);


}
plot();

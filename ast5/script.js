
// creating canvas
var $box = document.getElementById("wrapper");
$box.style.width = "500px";
$box.style.height = "500px";
$box.style.position = "relative";



// creates ball on screen
function createCircle(backgroundColor){
var circle = document.createElement('div');
circle.style.width = "20px";
circle.style.height = "20px";
circle.style.position = "absolute";
circle.style.borderRadius = "10px";
circle.style.background = backgroundColor;
$box.appendChild(circle);

return circle;
}




function createBall(xpos ,ypos,color){
var circle = createCircle(color);
var ball = {
    x:xpos,
    y:ypos,
    dx:1,
    dy:1 ,
    $elem:circle
};

return ball;
}

// creating two balls
var ball =createBall(50,10,"green");
var ball1 =createBall(100,10,"blue");

var speed = 5;


//initial position of balls
ball.$elem.style.left = ball.x+"px";
ball.$elem.style.top = ball.y+"px";

ball1.$elem.style.left = ball1.x+"px";
ball1.$elem.style.top = ball1.y+"px";



setInterval(function(){

    ball.x = ball.x +ball.dx*speed;
    ball.y = ball.y +ball.dy*speed;

    ball1.x = ball1.x +ball1.dx*speed;
    ball1.y = ball1.y +ball1.dy*speed;


    checkBoundaryCollision(ball);
    checkBoundaryCollision(ball1);
    checkBall(ball);
    checkBall(ball1);
    updateBall(ball);
    updateBall(ball1);

    checkBallCollision(ball,ball1);

},50);


function checkBall(ball1){
    if (ball1.x>480){
        ball1.x = 480;
    }


    if (ball1.y>480){
        ball1.y = 480;
    }


    if (ball1.x<0){
        ball1.x = 0;
    }


    if (ball1.y<0){
        ball1.y = 0;
    }
}

//key pressing event
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;


    switch(e.keyCode){

        case 38:


        ball1.dx = 0;
        if (ball1.dy = 1){
            ball1.dy = -1;
        }
        break;

        case 40:
        ball1.dx = 0;
        if (ball1.dy = -1){
            ball1.dy = 1;
        }

        break;

        case 37:
        ball1.dy =0;
        if (ball1.dx =1){
            ball1.dx=-1;
        }

        break;

        case 39:
        ball1.dy =0;
        if (ball1.dx =-1){
            ball1.dx=1;
        }


    }




}


// to detect collision of two balls
function checkBallCollision(ball , ball1){

    if(Math.abs((ball.x-ball1.x))<=20&& Math.abs( (ball.y-ball1.y))<20){


    //just setting random motion
          ball1.dx = ball1.dx*-1;

          ball.dx = ball.dx*-1;

            ball1.dy = ball1.dy*-1;

            ball.dy = ball.dy*-1;


    }



}


function updateBall(ball){
    ball.$elem.style.top = ball.y+"px";
    ball.$elem.style.left = ball.x+"px";

}




//function to check whether the ball is inside or outside container
function checkBoundaryCollision(ball){

    containerTop = 0;
    containerLeft = 0;

if(ball.y <= containerTop){


ball.dy = ball.dy*-1;

}

if(ball.x<= containerLeft){


ball.dx = ball.dx*-1;

}

if(ball.x+20>=500){


ball.dx = ball.dx* -1;

}

if (ball.y+20>=500){


ball.dy = ball.dy*-1;

}



}

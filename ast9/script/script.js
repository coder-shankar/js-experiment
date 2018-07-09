let sprites = {}
let ballWidth = 35;
let win = -1;

function loadImages(fileName) {
    let spriteImage = new Image();
    spriteImage.src = "images/" + fileName;

    return spriteImage;
}

sprites.background = loadImages("board-background.png");
sprites.stick = loadImages('stick.png');
sprites.rBall = loadImages('red-ball.png');
sprites.yBall = loadImages('yellow-ball.png');
sprites.bBall = loadImages('black-ball.png');
sprites.wBall = loadImages('white-ball.png');





//utils

calculateDistance = (point1, point2) => {

    let a = point1.x - point2.x;
    let b = point1.y - point2.y;

    return Math.sqrt(a * a + b * b);


}

removeNull = (ballCollection) => {
    temp = [];

    ballCollection.forEach(element => {
        if (element !== null) {
            temp.push(element);
        }

    });

    return temp;
}
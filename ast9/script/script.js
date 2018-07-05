let sprites = {}

function loadImages(fileName) {
    let spriteImage = new Image();
    spriteImage.src = "images/" + fileName;

    return spriteImage;
}

sprites.background = loadImages("board-background.png");
sprites.stick = loadImages('stick.png');
sprites.ball = loadImages('ball.png');
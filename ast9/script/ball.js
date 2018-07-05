class Ball {
    constructor(pos) {

        this.position = pos;

    }

    update() {
        this.position.x += 1;

    }

    draw() {

        game.gameWorld.canvas.drawImage(sprites.ball, {
            x: this.position.x,
            y: this.position.y
        });
    }
}
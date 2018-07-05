class Stick {

    constructor() {
        this.position = {
            x: 0,
            y: 200
        };
    }

    update() {
        // this.position.x += 1;
    }

    draw() {

        game.gameWorld.canvas.drawImage(sprites.stick, {
            x: this.position.x,
            y: this.position.y
        });
    }
}
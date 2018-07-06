class Game {


    constructor() {
        this.gameWorld = new GameWorld();
        this.start = this.start.bind(this);

    }

    start() {

        this.gameWorld.update();
        this.gameWorld.draw();
        this.gameWorld.reset();
        requestAnimationFrame(this.start);

    }


}

let game = new Game();
game.gameWorld.init();
game.start();
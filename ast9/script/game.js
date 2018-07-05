class Game {


    constructor() {
        this.gameWorld = new GameWorld();
        this.start = this.start.bind(this);

    }

    start() {
        this.gameWorld.init();
        this.gameWorld.update();
        this.gameWorld.draw();
        requestAnimationFrame(this.start);

    }


}

let game = new Game();
game.start();
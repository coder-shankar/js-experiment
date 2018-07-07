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



var $start = document.getElementById('start-btn');
var $startGame = document.getElementById('start-game');
var $canvas = document.getElementById('canvas');
let game = new Game();

$start.onclick = () => {
  $startGame.style.display = "none";
  $canvas.style.display = "block";

  game.gameWorld.init();
  game.start();
}
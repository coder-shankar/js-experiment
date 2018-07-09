class Game {
  constructor() {
    this.gameWorld = new GameWorld();
    this.start = this.start.bind(this);
    this.gameOver = false;
  }

  start() {
    if (this.gameOver) {
      cancelAnimationFrame(this.start);
      $endGame.style.display = "block";
      $endGame.innerHTML = "Game Over <br><br><hr> Player " + win + "  won Match";
      this.reset();
    } else {
      this.gameWorld.update();
      this.gameWorld.draw();
      this.gameWorld.reset();
      requestAnimationFrame(this.start);
    }
  }
  reset() {

    this.gameWorld = null;
  }
}



var $start = document.getElementById('start-btn');
var $startGame = document.getElementById('start-game');
var $canvas = document.getElementById('canvas');
var $endGame = document.getElementById('gameOver');
let game = new Game();


$start.onclick = () => {
  $startGame.style.display = "none";
  $canvas.style.display = "block";
  game.gameWorld.init();
  game.start();
}
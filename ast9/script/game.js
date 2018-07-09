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
      $restartGame.style.display = "block";

      this.gameOver = false;
    } else {
      this.gameWorld.update();
      this.gameWorld.draw();
      this.gameWorld.reset();
      requestAnimationFrame(this.start);
    }
  }
  restart() {

    // this.gameWorld = null;
    $startGame.style.display = "block";
    $restartGame.style.display = "none";
    $endGame.style.display = 'none';
    $canvas.style.display = "none";
    game.gameWorld.init();
    game.start();



  }
}



var $start = document.getElementById('start-btn');
var $startGame = document.getElementById('start-game');
var $canvas = document.getElementById('canvas');
var $endGame = document.getElementById('gameOver');
var $restartGame = document.getElementById('restart-btn');
let game = new Game();


$start.onclick = () => {
  $startGame.style.display = "none";
  $canvas.style.display = "block";
  game.gameWorld.init();
  game.start();
}

$restartGame.onclick = () => {

  game.restart();
}
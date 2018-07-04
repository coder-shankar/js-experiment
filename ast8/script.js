let parent = document.getElementsByTagName("body")[0];
class Bird {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.dy = props.dy;
    this.dx = props.dx;
    this.width = 34;
    this.height = 24;
    this.$parent = props.parent;
    this.gravity = 0.3;
    this.gravitySpeed = 0;
  }

  createBird() {
    let bird = document.createElement("div");
    bird.className = "bird";
    this.$parent.appendChild(bird);
    this.$elem = bird;
    this.deg = 0;
  }

  moveBird() {
    this.y += this.dy;
    this.deg += this.gravity;
    this.$elem.style.webkitTransform = "rotate(" + this.deg + "deg)";
  }

  moveUp() {
    this.y -= 30;
    this.deg = -20;
    this.$elem.style.webkitTransform = "rotate(" + this.deg + "deg)";
  }

  render() {
    this.$elem.style.left = this.x + "px";
    this.$elem.style.top = this.y + "px";
  }

  destoryBird() {
    this.$elem.remove();
  }
}

class Canvas {
  constructor(props) {
    this.width = props.width;
    this.height = props.height;
    this.$parent = parent;
  }

  createCanvas() {
    let canvas = document.getElementById("canvas");
    this.$parent.appendChild(canvas);
    this.$elem = canvas;
  }
}

class Pipe {
  constructor(props) {
    this.x = props.x;
    this.dx = 1;
    this.dy = props.dy;
    this.position = props.position;
    this.$parent = props.parent;
    this.height = props.height;
    this.y = 0;
  }

  createPipe() {
    let pipe = document.createElement("div");
    pipe.className = "pipe" + this.position;
    this.$parent.appendChild(pipe);
    this.$elem = pipe;
  }

  movePipe() {
    this.x = this.x - this.dx;
  }
  remove() {
    this.$elem.remove();
  }

  render() {
    if (this.position === "up") {
      this.$elem.style.top = 0 + "px";
    } else {
      this.$elem.style.bottom = 0 + "px";
    }

    this.$elem.style.left = this.x + "px";
    this.$elem.style.height = this.height + "px";
  }
}

class PipePair {
  constructor(props1, props2) {
    this.pipeUp = props1;
    this.pipeDown = props2;
    this.gap = 80;
  }

  createPipe() {
    this.pipeUp.createPipe();
    this.pipeDown.createPipe();
    this.pipeUp.height = random(50, 300);
    this.pipeDown.height = 500 - this.pipeUp.height - this.gap;
    this.pipeDown.y = this.pipeDown.height;

    if (this.pipeDown.height > 320) {
      this.pipeDown.height = 320;
    }
  }

  movePipe() {
    this.pipeDown.movePipe();
    this.pipeUp.movePipe();
    if (this.pipeDown.x < -52) {
      this.destoryPipe();
    }
  }

  destoryPipe() {
    this.pipeUp.remove();
    this.pipeDown.remove();
    pipeCollection.shift();
  }

  render() {
    this.pipeUp.render();
    this.pipeDown.render();
  }
}

class Game {
  constructor() {
    this.pipePosition = [200, 400, 600];
  }

  startGame() {
    this.startScreen = document.createElement("div");
    this.startScreen.className = "start-screen";
    parent.appendChild(this.startScreen);

    this.start = document.createElement("div");
    this.start.className = "start";
    this.start.innerHTML = "Flappy Bird";
    this.startScreen.appendChild(this.start);

    this.startButtton = document.createElement("button");
    this.startButtton.innerHTML = "Start Play";
    this.startButtton.onclick = () => {
      this.loadGame();
    };

    this.startScreen.appendChild(this.startButtton);
    this.startScreen.appendChild(this.start);
  }

  destoryStartScreen() {
    this.startButtton.remove();
    this.startScreen.remove();
    this.start.remove();
  }

  loadGame() {
    this.destoryStartScreen();
    let c = {
      width: 800,
      height: 500
    };
    this.canvas = new Canvas(c);
    this.canvas.createCanvas();

    let b = {
      x: 50,
      y: this.canvas.height / 2 - 100,
      dx: 1,
      dy: 1,
      parent: this.canvas.$elem
    };
    this.bird = new Bird(b);
    this.bird.createBird();

    this.x = setInterval(() => {
      this.createPipes();
      this.movePipes();
      if (keyPressed) {
        this.bird.moveBird();
      }
      this.render();
      this.collide();
      pipeCounter++;
    }, 10);
  }

  createPipes() {
    if (pipeCounter > 300) {
      let p1 = {
        x: 700,
        dx: 1,
        dy: 20,
        parent: this.canvas.$elem,
        position: "up"
      };
      let p2 = {
        x: 700,
        dx: 1,
        dy: 20,
        parent: this.canvas.$elem,
        position: "down"
      };

      let pipeup = new Pipe(p1);
      let pipedown = new Pipe(p2);

      this.pipe = new PipePair(pipeup, pipedown);
      this.pipe.createPipe();
      pipeCollection.push(this.pipe);
      pipeCounter = 0;
    }
  }

  movePipes() {
    for (let i = 0; i < pipeCollection.length; i++) {
      pipeCollection[i].movePipe();
    }
  }

  render() {
    this.bird.render();
    for (let i = 0; i < pipeCollection.length; i++) {
      pipeCollection[i].render();
    }
  }

  collide() {
    let bird = this.bird;

    if (pipeCollection.length > 0) {
      let pipeD = pipeCollection[0].pipeDown;
      let pipeU = pipeCollection[0].pipeUp;

      if (
        (bird.x + bird.width > pipeU.x && bird.y < pipeU.height) ||
        (bird.x + bird.width > pipeD.x &&
          bird.y + bird.height > pipeU.height + 80) ||
        bird.y + bird.width > 500
      ) {
        bird.destoryBird();
        clearInterval(this.x);
        this.gameOver();
      } else {
        if (bird.x + bird.width > pipeU.x + 52) {
          score++;
        }
      }
    }
  }
  gameOver() {
    let back = document.createElement("div");
    back.className = "gameover";
    back.innerHTML = "game Over <br> Score :" + score;
    this.canvas.$elem.appendChild(back);
  }

  restartGame() {}
}

let game = new Game();
game.startGame();
let pipeCounter = 300;
let pipeCollection = [];
let score = 0;
let keyPressed = false;

document.onkeydown = e => {
  e = e || window.event;

  if (e.keyCode === 32) {
    keyPressed = true;
    if (keyPressed) {
      game.bird.moveUp();
    }
  }
};

const random = (start, end) => {
  return Math.floor(Math.random() * (end - start) + 1 + start);
};

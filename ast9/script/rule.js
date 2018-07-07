let holeRadius = 35;

class Rule {
  constructor(canvas) {
    this.canvas = canvas;
    this.holeRadius = 25;

    this.topCenterHolePos = {
      x: 598,
      y: 62
    };
    this.bottomCenterHolePos = {
      x: 598,
      y: 656
    };
    this.topLeftHolePos = {
      x: 62,
      y: 62
    };
    this.topRightHolePos = {
      x: 1136,
      y: 62
    };
    this.bottomLeftHolePos = {
      x: 62,
      y: 656
    };
    this.bottomRightHolePos = {
      x: 1136,
      y: 656
    };


    this.players = [{
      color: undefined,
      score: 0
    }, {
      color: undefined,
      score: 0
    }];

    this.turn = 0;
    this.firstBall = 0;


  }


  swithTurn() {
    this.turn++;
    this.turn %= 2;
  }


  drawScore() {

    this.canvas.drawText("Player: " + (this.turn + 1) + "      Ball Left:" + (8 - this.players[this.turn].score) + "  " + this.players[this.turn].color, {
      x: 250,
      y: 30
    });
  }







  isInHole(ball) {
    let x = ball.position.x;
    let y = ball.position.y;
    let distTL = Math.sqrt(
      Math.pow(x - this.topLeftHolePos.x, 2) +
      Math.pow(y - this.topLeftHolePos.y, 2)
    );
    let distTC = Math.sqrt(
      Math.pow(x - this.topCenterHolePos.x, 2) +
      Math.pow(y - this.topCenterHolePos.y, 2)
    );
    let distTR = Math.sqrt(
      Math.pow(x - this.topRightHolePos.x, 2) +
      Math.pow(y - this.topRightHolePos.y, 2)
    );
    let distBL = Math.sqrt(
      Math.pow(x - this.bottomLeftHolePos.x, 2) +
      Math.pow(y - this.bottomLeftHolePos.y, 2)
    );
    let distBC = Math.sqrt(
      Math.pow(x - this.bottomCenterHolePos.x, 2) +
      Math.pow(y - this.bottomCenterHolePos.y, 2)
    );
    let distBR = Math.sqrt(
      Math.pow(x - this.bottomRightHolePos.x, 2) +
      Math.pow(y - this.bottomRightHolePos.y, 2)
    );

    if (
      distTL < holeRadius ||
      distTC < holeRadius - 6 ||
      distTR < holeRadius ||
      distBL < holeRadius ||
      distBC < holeRadius + 3 ||
      distBR < holeRadius + 3
    ) {
      //   ball.position.x = -10;
      //   ball.position.y = -10;

      let index = game.gameWorld.ballCollection.indexOf(ball);
      if (index > -1) {
        if (this.firstBall < 1) {



          if (ball.color = 'black') {
            //game over

          }

          if (ball.color = 'red') {
            this.players[this.turn].color = 'red';
            this.players[(this.turn + 1) % 2].color = 'yellow';
          } else {
            this.players[this.turn].color = 'red';
            this.players[(this.turn + 1) % 2].color = 'yellow';

          }
          this.firstBall++;

        }


        ball.position.x = -9000;
        ball.position.y = -9999;

      } else {
        alert("falult");
      }

    }
  }
}
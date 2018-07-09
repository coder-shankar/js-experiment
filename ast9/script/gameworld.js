class GameWorld {

  constructor() {

    this.canvas = new Board();

    this.canvasWidth = this.canvas.$canvas.width;
    this.canvasHeight = this.canvas.$canvas.height;
    this.cueBall = new Ball({
      x: this.canvasWidth * 0.5 - 250,
      y: this.canvasHeight * 0.5
    }, 'white');
    this.stick = new Stick({
      x: this.canvasWidth * 0.5 - 250,
      y: this.canvasHeight * 0.5
    });
    this.mouse = new Mouse(this.canvas.$canvas);
    this.key = new Key(this.stick);
    this.border = {
      left: 48,
      right: this.canvasWidth - 48,
      top: 48,
      bottom: this.canvasHeight - 48

    }

    this.rule = new Rule(this.canvas);



  }


  init() {




    this.ballCollection = [
      new Ball({
        x: this.canvasWidth * 0.5 + 300,
        y: this.canvasHeight * 0.5 - 100
      }, 'red'),

      new Ball({
        x: this.canvasWidth * 0.5 + 300,
        y: this.canvasHeight * 0.5 - 100 + ballWidth
      }, 'yellow'),
      new Ball({
        x: this.canvasWidth * 0.5 + 300,
        y: this.canvasHeight * 0.5 - 100 + 2 * ballWidth
      }, 'red'),
      new Ball({
        x: this.canvasWidth * 0.5 + 300,
        y: this.canvasHeight * 0.5 - 100 + 3 * ballWidth
      }, 'yellow'),

      new Ball({
        x: this.canvasWidth * 0.5 + 300,
        y: this.canvasHeight * 0.5 - 100 + 4 * ballWidth
      }, 'red'),

      new Ball({
        x: this.canvasWidth * 0.5 + 300 - ballWidth,
        y: this.canvasHeight * 0.5 - 100 + 0.5 * ballWidth
      }, 'yellow'),


      new Ball({
        x: this.canvasWidth * 0.5 + 300 - ballWidth,
        y: this.canvasHeight * 0.5 - 100 + 1.5 * ballWidth
      }, 'red'),


      new Ball({
        x: this.canvasWidth * 0.5 + 300 - ballWidth,
        y: this.canvasHeight * 0.5 - 100 + 2.5 * ballWidth
      }, 'yellow'),

      new Ball({
        x: this.canvasWidth * 0.5 + 300 - ballWidth,
        y: this.canvasHeight * 0.5 - 100 + 3.5 * ballWidth
      }, 'red'),


      new Ball({
        x: this.canvasWidth * 0.5 + 300 - 2 * ballWidth,
        y: this.canvasHeight * 0.5 - 100 + 1 * ballWidth
      }, 'yellow'),

      new Ball({
        x: this.canvasWidth * 0.5 + 300 - 2 * ballWidth,
        y: this.canvasHeight * 0.5 - 100 + 2 * ballWidth
      }, 'black'),

      new Ball({
        x: this.canvasWidth * 0.5 + 300 - 2 * ballWidth,
        y: this.canvasHeight * 0.5 - 100 + 3 * ballWidth
      }, 'yellow'),

      new Ball({
        x: this.canvasWidth * 0.5 + 300 - 3 * ballWidth,
        y: this.canvasHeight * 0.5 - 100 + 1.5 * ballWidth
      }, 'red'),

      new Ball({
        x: this.canvasWidth * 0.5 + 300 - 3 * ballWidth,
        y: this.canvasHeight * 0.5 - 100 + 2.5 * ballWidth
      }, 'yellow'),


      new Ball({
        x: this.canvasWidth * 0.5 + 300 - 4 * ballWidth,
        y: this.canvasHeight * 0.5 - 100 + 2 * ballWidth
      }, 'red'),

    ];

    this.ballArray = this.ballCollection;


    this.canvas.$canvas.onmousedown = (e) => {
      this.mouse.mouseDownHandler(e);

    }

    this.canvas.$canvas.onmouseup = (e) => {
      this.mouse.mouseUpHandler(e);
    }
    this.canvas.$canvas.onmousemove = (e) => {
      this.mouse.mouseMoveHandler(e);
    }

    document.onkeydown = (e) => {

      this.key.keyDownHandler(e);
    }








  }

  update() {

    this.stick.update();




    for (let i = 0; i < this.ballCollection.length; i++) {
      this.ballCollection[i].update();

    }

    this.collision();

    if (!this.cueBall.moving && this.stick.shoot) {

      this.stick.repositionStick(this.cueBall.position);

    }
    this.cueBall.update();
    this.ballCollection = removeNull(this.ballArray);





  }
  draw() {

    this.canvas.drawImage(sprites.background, {
      x: 0,
      y: 0
    });

    this.stick.draw();
    this.ballCollection.forEach(ball => {
      ball.update();
      ball.draw();

    });


    this.cueBall.draw();
    this.rule.drawScore();

  }


  collision() {

    for (let i = 0; i < this.ballCollection.length; i++) {
      this.checkCollison(this.cueBall, this.ballCollection[i]);

      for (let j = i + 1; j < this.ballCollection.length; j++) {

        this.checkCollison(this.ballCollection[i], this.ballCollection[j]);

      }
    }


  }


  checkCollison(ball1, ball2) {

    let dist = calculateDistance(ball1.position, ball2.position);


    if (ball1.moving || ball2.moving) {


      if (dist <= ballWidth) {
        let x = ball1.position.x - ball2.position.x;
        let y = ball1.position.y - ball2.position.y;

        let len = Math.sqrt(x * x + y * y);
        let a = (ballWidth - len) / len;

        // minimum translation distance 
        let mtd = {
          x: x * a,
          y: y * a
        };
        ball1.position.x += mtd.x * 0.5;
        ball1.position.y += mtd.y * 0.5;
        ball2.position.x -= mtd.x * 0.5;
        ball2.position.y -= mtd.y * 0.5;




        let un = {
          x: x / len,
          y: y / len
        };


        let ut = {
          x: -un.y,
          y: un.x
        };
        let v1n = un.x * ball1.velocity.dx + un.y * ball1.velocity.dy;
        let v2n = un.x * ball2.velocity.dx + un.y * ball2.velocity.dy;
        let v1t = ut.x * ball1.velocity.dx + ut.y * ball1.velocity.dy;
        let v2t = ut.x * ball2.velocity.dx + ut.y * ball2.velocity.dy;

        let v1nTag = v2n;
        let v2nTag = v1n;

        v1nTag = {
          x: un.x * v1nTag,
          y: un.y * v1nTag
        };
        let v1tTag = {
          x: ut.x * v1t,
          y: ut.y * v1t
        };


        v2nTag = {
          x: un.x * v2nTag,
          y: un.y * v2nTag
        };
        let v2tTag = {
          x: ut.x * v2t,
          y: ut.y * v2t
        };


        ball1.velocity.dx = v1nTag.x + v1tTag.x;
        ball1.velocity.dy = v1nTag.y + v1tTag.y;


        ball2.velocity.dx = v2nTag.x + v2tTag.x;
        ball2.velocity.dy = v2nTag.y + v2tTag.y;

        ball1.moving = true;
        ball2.moving = true;





      }
    }


  }





  reset() {
    this.mouse.mouseResetter();
  }



}
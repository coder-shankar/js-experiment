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



        // for (let i = 0; i < this.ballCollection.length; i++) {
        //     this.ballCollection[i].update();
        // }

        // this.ballCollection[0].update();
        this.collision();
        this.cueBall.update();



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

        // if (ball1.inHole || ball2.inHole) {
        //     return;
        // }




        let dist = calculateDistance(ball1.position, ball2.position);

        if (ball1.moving || ball2.moving) {


            if (dist < ballWidth) {



                let power = (Math.abs(ball1.velocity.dx) + Math.abs(ball1.velocity.dy)) +
                    (Math.abs(ball2.velocity.dx) + Math.abs(ball2.velocity.dy));





                let opposite = ball1.position.y - ball2.position.y;
                let adjacent = ball1.position.x - ball2.position.x;
                let rotation = Math.atan2(opposite, adjacent);


                ball1.moving = true;
                ball2.moving = true;
                // console.log(Math.cos(rotation + Math.PI));

                ball1.velocity.dx += Math.cos(rotation + Math.PI) * 10;
                ball1.velocity.dy += Math.sin(rotation + Math.PI) * 10;




                ball2.velocity.dx += Math.cos(rotation + Math.PI) * 10;
                ball2.velocity.dy += Math.sin(rotation) * 10;


                // let theta1 = ball1.angle;
                // let theta2 = ball2.angle;
                // let v1 = Math.sqrt(ball1.velocity.x * ball1.velocity.x + ball1.velocity.y * ball1.velocity.y);
                // let v2 = Math.sqrt(ball2.velocity.x * ball2.velocity.x + ball2.velocity.y * ball2.velocity.y);


                // ball1.velocity.dx += v2 * Math.cos(theta2 - phi) * Math.cos(phi) + v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI / 2);
                // ball1.velocity.dy += v2 * Math.cos(theta2 - phi) * Math.sin(phi) + v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI / 2);
                // ball2.velocity.dx += v1 * Math.cos(theta1 - phi) * Math.cos(phi) + v2 * Math.sin(theta2 - phi) * Math.cos(phi + Math.PI / 2);
                // ball2.velocity.dy += v1 * Math.cos(theta1 - phi) * Math.sin(phi) + v2 * Math.sin(theta2 - phi) * Math.sin(phi + Math.PI / 2);











            }
        }


    }


    checkWallCollision() {





    }




    reset() {
        this.mouse.mouseResetter();
    }



}
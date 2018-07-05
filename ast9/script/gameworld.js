class GameWorld {

    constructor() {

        this.canvas = new Board();
        this.stick = new Stick();
        this.canvasWidth = this.canvas.$canvas.width;
        this.canvasHeight = this.canvas.$canvas.height;



    }


    init() {


        this.ballCollection = [
            new Ball({
                x: this.canvasWidth * 0.5 + 300,
                y: this.canvasHeight * 0.5 - 100
            }),

            new Ball({
                x: this.canvasWidth * 0.5 + 300,
                y: this.canvasHeight * 0.5 - 100 + 30
            }),
            new Ball({
                x: this.canvasWidth * 0.5 + 300,
                y: this.canvasHeight * 0.5 - 100 + 2 * 30
            }),
            new Ball({
                x: this.canvasWidth * 0.5 + 300,
                y: this.canvasHeight * 0.5 - 100 + 3 * 30
            }),

            new Ball({
                x: this.canvasWidth * 0.5 + 300,
                y: this.canvasHeight * 0.5 - 100 + 4 * 30
            }),

            new Ball({
                x: this.canvasWidth * 0.5 + 300 - 30,
                y: this.canvasHeight * 0.5 - 100 + 0.5 * 30
            }),


            new Ball({
                x: this.canvasWidth * 0.5 + 300 - 30,
                y: this.canvasHeight * 0.5 - 100 + 1.5 * 30
            }),


            new Ball({
                x: this.canvasWidth * 0.5 + 300 - 30,
                y: this.canvasHeight * 0.5 - 100 + 2.5 * 30
            }),

            new Ball({
                x: this.canvasWidth * 0.5 + 300 - 30,
                y: this.canvasHeight * 0.5 - 100 + 3.5 * 30
            }),


            new Ball({
                x: this.canvasWidth * 0.5 + 300 - 2 * 30,
                y: this.canvasHeight * 0.5 - 100 + 1 * 30
            }),

            new Ball({
                x: this.canvasWidth * 0.5 + 300 - 2 * 30,
                y: this.canvasHeight * 0.5 - 100 + 2 * 30
            }),

            new Ball({
                x: this.canvasWidth * 0.5 + 300 - 2 * 30,
                y: this.canvasHeight * 0.5 - 100 + 3 * 30
            }),

            new Ball({
                x: this.canvasWidth * 0.5 + 300 - 3 * 30,
                y: this.canvasHeight * 0.5 - 100 + 1.5 * 30
            }),

            new Ball({
                x: this.canvasWidth * 0.5 + 300 - 3 * 30,
                y: this.canvasHeight * 0.5 - 100 + 2.5 * 30
            }),


            new Ball({
                x: this.canvasWidth * 0.5 + 300 - 4 * 30,
                y: this.canvasHeight * 0.5 - 100 + 2 * 30
            })




        ];

    }

    update() {

        this.stick.update();
        this.ballCollection.forEach(ball => {
            // ball.update();
        });



    }
    draw() {

        this.canvas.drawImage(sprites.background, {
            x: 0,
            y: 0
        });

        this.stick.draw();
        this.ballCollection.forEach(ball => {
            ball.draw();
        });
    }




}
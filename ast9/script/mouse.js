class Mouse {

    constructor(canvas) {
        this.mouseIsDown = false;
        this.mouseIsUp = false;

        this.canvas = canvas;


        this.position = {
            x: 0,
            y: 0
        };




    }

    mouseDownHandler(e) {
        this.mouseMoveHandler(e);

        if (e.which === 1) {

            if (!this.mouseIsDown) {

                this.mouseIsDown = true;
            }

        }


    }

    mouseUpHandler(e) {
        this.mouseMoveHandler(e);
        if (e.which === 1) {
            if (!this.mouseUpDown) {

                this.mouseIsUp = true;
            }
        }
    }


    mouseMoveHandler(e) {

        this.position.x = e.pageX;
        this.position.y = e.pageY;


    }


    mouseResetter() {

        this.mouseIsDown = false;
        this.mouseIsUp = false;

    }


}
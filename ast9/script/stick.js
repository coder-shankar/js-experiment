class Stick {

    constructor(pos) {
        this.position = pos;
        this.width = 700;
        this.height = 20;
        this.rotation = 0;
        this.center = {
            x: 730,
            y: 10
        }
        this.power = 0;
        this.stickVisibility = true;
    }

    update() {
        this.rotateStick();


        if (game.gameWorld.mouse.mouseIsDown) {

            game.gameWorld.cueBall.shoot(this.power, this.rotation);

        }



        // if (!game.gameWorld.cueBall.moving && this.stickVisibility) {

        //     this.position = game.gameWorld.cueBall.position;

        // }


    }

    draw() {

        game.gameWorld.canvas.drawImage(sprites.stick, {
            x: this.position.x,
            y: this.position.y
        }, this.center, this.rotation);
    }

    getStickBox() {
        let box = {
            x: this.position.x,
            y: this.position.y,
            height: this.height,
            width: this.width
        };

        return box;

    }

    rotateStick() {
        let opposite = game.gameWorld.mouse.position.y - this.position.y;
        let adjacent = game.gameWorld.mouse.position.x - this.position.x;

        this.rotation = Math.atan2(opposite, adjacent);


    }

    increasePower() {
        this.power += 100;
        this.center.x += 5;

    }

    decreasePower() {
        if (this.power > 100) {
            this.power -= 100;
            this.center.x -= 5;
        }
    }






}
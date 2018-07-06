const Ball_CENTER = {
    x: 25,
    y: 25
};
class Ball {
    constructor(pos, color) {
        this.position = pos;
        this.color = color;
        this.moving = false;
        this.visible = true;
        this.inHole = false;
        this.angle = 0;
        this.velocity = {
            dx: 0,
            dy: 0
        };

    }

    update() {

        this.position.x += this.velocity.dx * 0.01;
        this.position.y += this.velocity.dy * 0.01;
        this.velocity.dx = this.velocity.dx * 0.98;
        this.velocity.dy = this.velocity.dy * 0.98;
        this.angle = Math.atan2(this.velocity.dy, this.velocity.dx);

        let mag = Math.sqrt(this.velocity.dx * this.velocity.dx + this.velocity.dy * this.velocity.dy);


        if (mag < 5) {
            this.moving = false;
            this.velocity.dx = 0;
            this.velocity.dy = 0;

        } else {
            this.moving = true;
        }


    }

    draw() {

        if (this.color === 'red') {
            game.gameWorld.canvas.drawImage(sprites.rBall, {
                x: this.position.x,
                y: this.position.y
            });
        }

        if (this.color === 'yellow') {
            game.gameWorld.canvas.drawImage(sprites.yBall, {
                x: this.position.x,
                y: this.position.y
            });
        }

        if (this.color === 'black') {
            game.gameWorld.canvas.drawImage(sprites.bBall, {
                x: this.position.x,
                y: this.position.y
            });



        }

        if (this.color === 'white') {
            game.gameWorld.canvas.drawImage(sprites.wBall, {
                x: this.position.x,
                y: this.position.y
            }, Ball_CENTER);
        }
    }


    shoot(power, rotation) {

        this.moving = true;
        this.velocity.dx = Math.cos(rotation) * game.gameWorld.stick.power;
        this.velocity.dy = Math.sin(rotation) * game.gameWorld.stick.power;
    }

}
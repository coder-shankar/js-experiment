const Ball_CENTER = {
    x: 20,
    y: 20
};

const FRICTION = 0.98;
class Ball {
    constructor(pos, color) {
        this.position = pos;
        this.color = color;
        this.moving = false;
        this.visible = true;
        this.inHole = false;

        this.velocity = {
            dx: 0,
            dy: 0
        };
    }

    update() {


        this.position.x += this.velocity.dx * 0.015;
        this.position.y += this.velocity.dy * 0.015;
        this.velocity.dx = this.velocity.dx * FRICTION;
        this.velocity.dy = this.velocity.dy * FRICTION;




        let mag = Math.sqrt(this.velocity.dx * this.velocity.dx + this.velocity.dy * this.velocity.dy);



        if (mag < 10) {

            this.moving = false;
            this.velocity.dx = 0;
            this.velocity.dy = 0;




        }

        if (this.moving) {

            this.collisionWithBorder();
            game.gameWorld.rule.isInHole(this);
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


    shooting(power, rotation) {


        this.velocity.dx = Math.cos(rotation) * game.gameWorld.stick.power;
        this.velocity.dy = Math.sin(rotation) * game.gameWorld.stick.power;
        this.moving = true;
        game.gameWorld.stick.shoot = false;
    }



    collisionWithBorder() {
        if (this.moving) {
            let border = game.gameWorld.border;

            if (this.position.y < border.top + 0.5 * ballWidth) {
                this.position.y = border.top + 0.5 * ballWidth;
                this.velocity.dy *= -0.98;

                this.collided = true;
            }

            if (this.position.y + ballWidth * 0.5 > border.bottom) {
                this.position.y = border.bottom - 0.5 * ballWidth;

                this.velocity.dy *= -0.98;

                this.collided = true;
            }

            if (this.position.x + ballWidth * 0.5 > border.right) {
                this.position.x = border.right - 0.5 * ballWidth;

                this.velocity.dx *= -0.98;

                this.collided = true;
            }

            if (this.position.x < border.left + ballWidth * 0.5) {
                this.position.x = border.left + ballWidth * 0.5;

                this.velocity.dx *= -0.98;

                this.collided = true;
            }


        }


    }


}
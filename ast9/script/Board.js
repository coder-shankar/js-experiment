class Board {
    constructor() {
        this.$canvas = document.getElementById("canvas");
        this.ctx = this.$canvas.getContext("2d");
    }

    clearBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawImage(image, position, center, rotation = 0) {
        if (!center) {
            center = {
                x: 0,
                y: 0
            };
        }

        if (!position) {
            position = {
                x: 0,
                y: 0
            };
        }
        this.ctx.save();
        this.ctx.translate(position.x, position.y);
        this.ctx.rotate(rotation);
        this.ctx.drawImage(image, -center.x, -center.y);
        this.ctx.restore();
    }
}
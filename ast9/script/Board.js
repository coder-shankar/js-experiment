class Board {

    constructor() {
        this.$canvas = document.getElementById('canvas');
        this.ctx = this.$canvas.getContext('2d');

    }

    clearBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawImage(image, positon) {
        this.ctx.drawImage(image, positon.x, positon.y);

    }
}
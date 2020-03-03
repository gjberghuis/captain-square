function Tile(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
};

Tile.prototype.draw = function () {
    if (typeof (this.ctx) === 'object' && this.ctx.canvas) {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(this.x, this.y, 25 - 1, 25 - 1);
    }
};

Tile.prototype.reveal = function () {
    console.log('reveal tile', this.isBomb);
    if (this.isBomb) {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';

        this.ctx.fillRect(this.x, this.y, 25 - 1, 25 - 1);
    } else {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'green';

        this.ctx.fillRect(this.x, this.y, 25 - 1, 25 - 1);
    }
}

Tile.prototype.isBomb = false;
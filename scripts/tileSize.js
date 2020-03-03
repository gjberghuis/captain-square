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

Tile.prototype.flag = function () {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'orange';

    this.ctx.moveTo(this.x + (25 / 4), this.y + 21);
    this.ctx.lineTo(this.x + (25 / 4), this.y + 4);
    this.ctx.lineTo(this.x + ((25 / 4) * 3), this.y + 12);
    this.ctx.lineTo(this.x + (25 / 4), this.y + 16);
    this.ctx.stroke();
}

Tile.prototype.isBomb = false;
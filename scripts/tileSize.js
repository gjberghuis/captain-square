function Tile(x, y, ctx, tileSize) {
    this.x = x;
    this.y = y;
    this.x2 = 0;
    this.y2 = 0;
    this.ctx = ctx;
    this.tileSize = tileSize;
};

Tile.prototype.draw = function () {
    if (typeof (this.ctx) === 'object' && this.ctx.canvas) {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        this.x2 = this.tileSize - 1;
        this.y2 = this.tileSize - 1;
        this.ctx.fillRect(this.x, this.y, this.x2, this.y2);
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

Tile.prototype.checkBomb = function () {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x, this.y, 25 - 1, 25 - 1);

    if (this.isBomb) {

        this.ctx.beginPath();
        this.ctx.arc(this.x + (25 / 2), this.y + (25 / 2), 5, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
        this.ctx.stroke();
    } else {
        this.ctx.font = "10px Comic Sans MS";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.numberOfNeighbours, this.x + (this.x2 / 2), this.y + (this.y2 / 2));
        this.ctx.dar
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
Tile.prototype.isFlagged = false;
Tile.prototype.isRevealed = false;
Tile.prototype.isCorrect = false;
Tile.prototype.numberOfNeighbours = 0;
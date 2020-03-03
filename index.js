let game = (() => {
    let canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        game;

    var init = () => {
        board.init(canvas, ctx);
    };



    return {
        init: init
    }
})();

let board = (() => {
    let width,
        height,
        numberOfTiles,
        tiles = [],
        canvas;
    const tileSize = 25;

    var drawBoard = (ctx) => {
        width = this.canvas.width;
        height = this.canvas.height;
        numberOfTiles = Math.floor(width / tileSize) * Math.floor(height / tileSize);
        numberOfRows = Math.floor(height / tileSize);
        numberOfColumns = Math.floor(width / tileSize);


        for (let i = 0; i < numberOfRows; i++) {
            tiles[i] = [];
            for (let c = 0; c < numberOfColumns; c++) {
                tiles[i][c] = new Tile(c * (tileSize), i * (tileSize), ctx);
                tiles[i][c].draw(ctx);
            }
        }
    };

    var initEvents = () => {
        this.canvas.addEventListener("mousedown", click, false);
    };

    var getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

    var initBombs = () => {
        let numerOfBombs = Math.floor(numberOfTiles / 10);
        let bombNumbers = [];
        bombNumbers.push(0);
        for (let i = 1; i <= numerOfBombs; i++) {
            bombNumbers.push(getRandomIntInclusive(1, numberOfTiles));
        }

        console.log(bombNumbers);
        for (let i = 0; i <= numberOfTiles; i++) {
            if (bombNumbers.indexOf(i) > -1) {
                // If it's larger than the columns of a single row it must be divived by columns to know on which row
                let currentRow = 0;
                let currentColumn = i;
                if (i > numberOfColumns - 1) {
                    currentRow = Math.floor(i / numberOfColumns);
                    currentColumn = i % numberOfColumns;
                }
                tiles[currentRow][currentColumn].isBomb = true;
            }
        }

        console.log(tiles);
    }

    var click = (e) => {
        let x = e.offsetX;
        let y = e.offsetY;
        let rightclick = false;

        // determine if right click
        if (e.which && e.which === 3) {
            rightClick = true;
        } else if (e.button && e.button === 2) {
            rightClick = true;
        }

        // normalize by tile size to get the tile coordinates
        let tileX = Math.floor(y / tileSize);
        let tileY = Math.floor(x / tileSize);

        console.log(tileX, tileY);
        let clickedtile = tiles[tileX][tileY];

        if (!rightclick) {
            clickedtile.reveal();
        }
    };

    return {
        init: (canvas, ctx) => {
            this.canvas = canvas;
            drawBoard(ctx);
            initBombs();
            initEvents();
        }
    }
})();

(function () {
    "use strict";

    game.init();
})();
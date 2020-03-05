let board = (() => {
    let width,
        height,
        numberOfTiles = 0,
        tiles = [],
        canvas,
        numberOfRows = 0,
        numberOfColumns = 0;
    const tileSize = 25;

    var drawBoard = (ctx) => {
        width = this.canvas.width;
        height = this.canvas.height;
        numberOfRows = Math.floor(height / tileSize);
        numberOfColumns = Math.floor(width / tileSize);

        for (let i = 0; i < numberOfRows; i++) {
            for (let c = 0; c < numberOfColumns; c++) {
                numberOfTiles++;
                tiles[numberOfTiles] = [];
                tiles[numberOfTiles]['tile'] = new Tile(c * (tileSize), i * (tileSize), ctx, tileSize);
                tiles[numberOfTiles]['column'] = c;
                tiles[numberOfTiles]['row'] = i;
                tiles[numberOfTiles]['tile'].draw(ctx);
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
    };

    var initBombs = () => {
        let numerOfBombs = Math.floor(numberOfTiles / 10);
        let bombNumbers = [];
        for (let i = 1; i <= numerOfBombs; i++) {
            bombNumbers.push(getRandomIntInclusive(1, numberOfTiles));
        }

        for (let i = 0; i <= numberOfTiles; i++) {
            if (bombNumbers.indexOf(i) > -1) {
                tiles[i]['tile'].isBomb = true;
            }
        }
    };

    var renderNumbers = () => {
        // Check all adjacent tiles of the current tile
        for (let i = 1; i < tiles.length; i++) {
            let currentTile = tiles[i];
            let adjacentTiles = [];
            let tileLeft,
                tileRight,
                tileUpMiddle,
                tileUpLeft,
                tileUpRight,
                tileLowerMiddle,
                tileLowerLeft,
                tileLowerRight;

            // currentRow
            if (tiles[i]['column'] > 1) {
                adjacentTiles.push(i - 1);

            }
            if (tiles[i]['column'] < numberOfColumns) {
                adjacentTiles.push(i + 1);
            }

            // upperRow
            if (i > numberOfRows) {
                adjacentTiles.push(i - numberOfRows);
                if (tiles[i]['column'] > 1) {
                    adjacentTiles.push(i - (numberOfRows - 1));
                }
                if (tiles[i]['column'] < numberOfColumns) {
                    adjacentTiles.push(i - (numberOfRows + 1));
                }
            }

            // lowerRow
            if (i < (numberOfTiles - numberOfRows)) {
                adjacentTiles.push(i + numberOfRows);
                if (tiles[i]['column'] > 1) {
                    adjacentTiles.push(i + (numberOfRows - 1));
                }
                if (tiles[i]['column'] < numberOfColumns) {
                    adjacentTiles.push(i + (numberOfRows + 1));
                }
            }

            currentTile['neighbours'] = 0;
            adjacentTiles.forEach((number) => {
                if (number > 0 && number < 257) {
                    if (tiles[number]['tile'].isBomb) {
                        currentTile['neighbours']++;
                        currentTile['tile'].numberOfNeighbours++;
                    }
                }
            });
        }
    };

    var click = (e) => {
        let x = e.offsetX;
        let y = e.offsetY;
        let rightClick = false;

        // determine if right click
        if (e.which && e.which === 3) {
            rightClick = true;
        } else if (e.button && e.button === 2) {
            rightClick = true;
        }

        // normalize by tile size to get the tile coordinates
        let tileX = Math.floor(y / tileSize);
        let tileY = Math.floor(x / tileSize);

        let clickedTile;
        tiles.forEach((tile) => {
            if (tile['row'] == tileX && tile['column'] == tileY) {
                clickedTile = tile['tile'];
                return;
            }
        });

        if (!rightClick) {
            clickedTile.checkBomb();
        } else {
            clickedTile.flag();
        }
    };

    var revealAllTiles = () => {
        tiles.forEach((tile) => {
            tile['tile'].checkBomb();
        });
    };

    return {
        init: (canvas, ctx) => {
            this.canvas = canvas;
            drawBoard(ctx);
            initBombs();
            renderNumbers();
            initEvents();
        },
        revealAllTiles: revealAllTiles
    }
})();

let controls = (() => {
    var init = () => {
        document.getElementById('button-reveal-all-tiles').onclick = function () {
            board.revealAllTiles();
        };
    };

    return {
        init: init
    }
})();

let game = (() => {
    let canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        game;

    var init = () => {
        canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };

        board.init(canvas, ctx);
        controls.init();
    };

    return {
        init: init
    }
})();


(function () {
    "use strict";

    game.init();
})();
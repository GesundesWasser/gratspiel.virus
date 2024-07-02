<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tetris</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #000;
            color: #fff;
            font-family: Arial, sans-serif;
        }
        canvas {
            background: #111;
        }
    </style>
</head>
<body>
    <canvas width="300" height="600" id="gameCanvas"></canvas>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        const ROWS = 20;
        const COLS = 10;
        const BLOCK_SIZE = 30;

        const COLORS = [
            null,
            'cyan',
            'yellow',
            'purple',
            'green',
            'red',
            'blue',
            'orange'
        ];

        const SHAPES = [
            [],
            [[1, 1, 1, 1]],
            [[1, 1], [1, 1]],
            [[0, 1, 0], [1, 1, 1]],
            [[0, 1, 1], [1, 1, 0]],
            [[1, 1, 0], [0, 1, 1]],
            [[1, 0, 0], [1, 1, 1]],
            [[0, 0, 1], [1, 1, 1]]
        ];

        class Piece {
            constructor(type) {
                this.shape = SHAPES[type];
                this.color = COLORS[type];
                this.x = Math.floor(COLS / 2);
                this.y = 0;
            }

            draw() {
                ctx.fillStyle = this.color;
                this.shape.forEach((row, y) => {
                    row.forEach((value, x) => {
                        if (value) {
                            ctx.fillRect((this.x + x) * BLOCK_SIZE, (this.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                        }
                    });
                });
            }

            move(p) {
                this.undraw();
                this.x = p.x;
                this.y = p.y;
                this.shape = p.shape;
                this.draw();
            }

            undraw() {
                ctx.fillStyle = '#111';
                this.shape.forEach((row, y) => {
                    row.forEach((value, x) => {
                        if (value) {
                            ctx.fillRect((this.x + x) * BLOCK_SIZE, (this.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                        }
                    });
                });
            }
        }

        const board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

        function drawBoard() {
            board.forEach((row, y) => {
                row.forEach((value, x) => {
                    ctx.fillStyle = value ? COLORS[value] : '#111';
                    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                });
            });
        }

        function collide(piece) {
            for (let y = 0; y < piece.shape.length; y++) {
                for (let x = 0; x < piece.shape[y].length; x++) {
                    if (
                        piece.shape[y][x] &&
                        (board[piece.y + y] && board[piece.y + y][piece.x + x]) !== 0
                    ) {
                        return true;
                    }
                }
            }
            return false;
        }

        function merge(piece) {
            piece.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value) {
                        board[piece.y + y][piece.x + x] = value;
                    }
                });
            });
        }

        function rotate(piece) {
            const p = JSON.parse(JSON.stringify(piece));
            p.shape = p.shape[0].map((_, index) => p.shape.map(row => row[index]).reverse());
            return p;
        }

        function removeFullLines() {
            let lines = 0;
            board.forEach((row, y) => {
                if (row.every(value => value !== 0)) {
                    board.splice(y, 1);
                    board.unshift(Array(COLS).fill(0));
                    lines++;
                }
            });
            return lines;
        }

        let piece = new Piece(Math.floor(Math.random() * 7) + 1);

        function drop() {
            const p = { ...piece, y: piece.y + 1 };
            if (!collide(p)) {
                piece.move(p);
            } else {
                merge(piece);
                piece = new Piece(Math.floor(Math.random() * 7) + 1);
                if (collide(piece)) {
                    alert("Game Over");
                    document.location.reload();
                }
                removeFullLines();
            }
        }

        let dropCounter = 0;
        let dropInterval = 1000;
        let lastTime = 0;

        function update(time = 0) {
            const deltaTime = time - lastTime;
            lastTime = time;

            dropCounter += deltaTime;
            if (dropCounter > dropInterval) {
                drop();
                dropCounter = 0;
            }

            drawBoard();
            piece.draw();
            requestAnimationFrame(update);
        }

        document.addEventListener('keydown', event => {
            if (event.keyCode === 37) { // left arrow
                const p = { ...piece, x: piece.x - 1 };
                if (!collide(p)) {
                    piece.move(p);
                }
            } else if (event.keyCode === 39) { // right arrow
                const p = { ...piece, x: piece.x + 1 };
                if (!collide(p)) {
                    piece.move(p);
                }
            } else if (event.keyCode === 40) { // down arrow
                drop();
            } else if (event.keyCode === 38) { // up arrow
                const p = rotate(piece);
                if (!collide(p)) {
                    piece.move(p);
                }
            }
        });

        update();
    </script>
</body>
</html>

import $ from 'jquery';

const Game = (function () {
    const boardWidth = 20;
    const boardHeight = 20;
    const blockSize = 20;
    const speed = 100; // milliseconds

    let snake = [];
    let food = {};
    let direction = "right";
    let gameOver = true;
    let score = 0;

    const $board = $("#game-board");
    const $scoreDisplay = $("#score");
    const $newGameBtn = $("#new-game-btn");

    function init() {
        $newGameBtn.on("click", startGame);
        $(document).on("keydown", handleKeyPress);
    }

    function draw() {
        $board.empty();
        snake.forEach(segment => {
            $("<div>")
                .addClass("snake")
                .css({
                    left: segment.x * blockSize + "px",
                    top: segment.y * blockSize + "px"
                })
                .appendTo($board);
        });

        $("<div>")
            .addClass("food")
            .css({
                left: food.x * blockSize + "px",
                top: food.y * blockSize + "px"
            })
            .appendTo($board);
    }

    function move() {
        const head = { ...snake[0] };
        switch (direction) {
            case "up":
                head.y--;
                break;
            case "down":
                head.y++;
                break;
            case "left":
                head.x--;
                break;
            case "right":
                head.x++;
                break;
        }

        if (head.x < 0 || head.x >= boardWidth || head.y < 0 || head.y >= boardHeight) {
            gameOver = true;
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            generateFood();
            score++;
            $scoreDisplay.text(`Score: ${score}`);
        } else {
            snake.pop();
        }

        if (snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver = true;
            return;
        }
    }

    function generateFood() {
        food.x = Math.floor(Math.random() * boardWidth);
        food.y = Math.floor(Math.random() * boardHeight);
        if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
            generateFood();
        }
    }

    function handleKeyPress(event) {
        const keyPressed = event.key;
        if (!gameOver) {
            if (keyPressed === "ArrowUp" && direction !== "down") {
                direction = "up";
            } else if (keyPressed === "ArrowDown" && direction !== "up") {
                direction = "down";
            } else if (keyPressed === "ArrowLeft" && direction !== "right") {
                direction = "left";
            } else if (keyPressed === "ArrowRight" && direction !== "left") {
                direction = "right";
            }
        }
    }

    function startGame() {
        if (gameOver) {
            score = 0;
            $scoreDisplay.text(`Score: ${score}`);
            snake = [{ x: 10, y: 10 }];
            direction = "right";
            gameOver = false;
            generateFood();
            gameLoop();
        }
    }

    function gameLoop() {
        if (!gameOver) {
            move();
            draw();
            setTimeout(gameLoop, speed);
        } else {
            alert("Game over!");
        }
    }

    return {
        init
    };
})();

$(document).ready(function () {
    Game.init();
});

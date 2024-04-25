console.log("Snake Loaded!");

document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("game-board");
    const scoreDisplay = document.getElementById("score");
    const newGameBtn = document.getElementById("new-game-btn");
    const boardWidth = 20;
    const boardHeight = 20;
    const blockSize = 20;
    const speed = 100; // milliseconds

    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let direction = "right";
    let gameOver = true;
    let score = 0;

    function draw() {
        board.innerHTML = "";
        snake.forEach(segment => {
            const div = document.createElement("div");
            div.className = "snake";
            div.style.left = segment.x * blockSize + "px";
            div.style.top = segment.y * blockSize + "px";
            board.appendChild(div);
        });

        const foodDiv = document.createElement("div");
        foodDiv.className = "food";
        foodDiv.style.left = food.x * blockSize + "px";
        foodDiv.style.top = food.y * blockSize + "px";
        board.appendChild(foodDiv);
    }

    function move() {
        const head = {...snake[0]};
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
            scoreDisplay.textContent = `Score: ${score}`;
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
            scoreDisplay.textContent = `Score: ${score}`;
            snake = [{x: 10, y: 10}];
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
            console.log(score);
            localStorage.setItem("gameover", true);
            alert("Game over!");
            const accountscore = parseInt(localStorage.getItem("accountscore")); // Convert to number
            var higherScore = compareScores(score, accountscore);
        }
    }

    document.addEventListener("keydown", handleKeyPress);
    newGameBtn.addEventListener("click", startGame);
});

function compareScores(score, accountscore) {
    if (score > accountscore) {
        localStorage.setItem("newhighscore", score);
        alert("New Highscore!")
        window.location.reload(true)
        return score;
    } else {
        return accountscore;
    }
}

const board = document.getElementById('game-board');
        const scoreElement = document.getElementById('score');
        const boardSize = 400;
        const tileSize = 20;

        let snake = [{ x: 200, y: 200 }];
        let food = { x: getRandomPosition(), y: getRandomPosition() };
        let direction = { x: 0, y: 0 };
        let score = 0;
        let gameStarted = false;

        function getRandomPosition() {
            return Math.floor(Math.random() * (boardSize / tileSize)) * tileSize;
        }

        function drawSnake() {
            board.innerHTML = `<div id='score'>Score: ${score}</div>`;
            snake.forEach(segment => {
                const snakeElement = document.createElement('div');
                snakeElement.style.left = segment.x + 'px';
                snakeElement.style.top = segment.y + 'px';
                snakeElement.classList.add('snake');
                board.appendChild(snakeElement);
            });
        }

        function drawFood() {
            const foodElement = document.createElement('div');
            foodElement.style.left = food.x + 'px';
            foodElement.style.top = food.y + 'px';
            foodElement.classList.add('food');
            board.appendChild(foodElement);
        }

        function moveSnake() {
            if (!gameStarted) return;

            const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

            // Check for collisions with walls
            if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
                alert('Game Over!');
                resetGame();
                return;
            }

            // Check for collisions with itself
            if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                alert('Game Over!');
                resetGame();
                return;
            }

            snake.unshift(head);

            // Check for food collision
            if (head.x === food.x && head.y === food.y) {
                score++;
                food = { x: getRandomPosition(), y: getRandomPosition() };
            } else {
                snake.pop();
            }
        }

        function resetGame() {
            snake = [{ x: 200, y: 200 }];
            food = { x: getRandomPosition(), y: getRandomPosition() };
            direction = { x: 0, y: 0 };
            score = 0;
            gameStarted = false;
        }

        function update() {
            moveSnake();
            drawSnake();
            drawFood();
        }

        window.addEventListener('keydown', event => {
            gameStarted = true;
            switch (event.key) {
                case 'ArrowUp':
                    if (direction.y === 0) direction = { x: 0, y: -tileSize };
                    break;
                case 'ArrowDown':
                    if (direction.y === 0) direction = { x: 0, y: tileSize };
                    break;
                case 'ArrowLeft':
                    if (direction.x === 0) direction = { x: -tileSize, y: 0 };
                    break;
                case 'ArrowRight':
                    if (direction.x === 0) direction = { x: tileSize, y: 0 };
                    break;
            }
        });

        setInterval(update, 200);
//your code here
// Get the game container and score board element
const gameContainer = document.getElementById('gameContainer');
const scoreBoard = document.querySelector('.scoreBoard');

// Snake game state
let snake = [{ row: 20, col: 1 }];  // Starting at 20th row, 1st column
let direction = 'RIGHT';  // Initial direction is RIGHT
let food = null;
let score = 0;  // Initial score

// Function to create the 40x40 grid
function createGrid() {
    for (let row = 0; row < 40; row++) {
        for (let col = 0; col < 40; col++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.id = `pixel-${row}-${col}`;  // Unique ID for each pixel
            gameContainer.appendChild(pixel);
        }
    }
}

// Function to place the food randomly
function generateFood() {
    const foodRow = Math.floor(Math.random() * 40);
    const foodCol = Math.floor(Math.random() * 40);
    food = { row: foodRow, col: foodCol };
    
    // Get the food element by its unique ID and add the 'food' class
    const foodElement = document.getElementById(`pixel-${foodRow}-${foodCol}`);
    foodElement.classList.add('food');
}

// Function to draw the snake
function drawSnake() {
    // Clear any existing snake body
    const allSnakeBodyPixels = document.querySelectorAll('.snakeBodyPixel');
    allSnakeBodyPixels.forEach(pixel => {
        pixel.classList.remove('snakeBodyPixel');
    });

    // Add 'snakeBodyPixel' class to the snake's body
    snake.forEach(segment => {
        const pixelElement = document.getElementById(`pixel-${segment.row}-${segment.col}`);
        pixelElement.classList.add('snakeBodyPixel');
    });
}

// Function to move the snake
function moveSnake() {
    const head = { ...snake[0] };

    // Update head position based on the direction
    if (direction === 'UP') head.row += 2;
    if (direction === 'DOWN') head.row += 1;
    if (direction === 'LEFT') head.col += 2;
    if (direction === 'RIGHT') head.col += 1;

    // Check if snake hits the boundaries (game over)
    if (head.row < 0 || head.row >= 40 || head.col < 0 || head.col >= 40) {
        alert("Game Over! Your final score is: " + score);
        resetGame();  // Reset the game
        return;
    }

    // Check if the snake collides with itself (game over)
    if (snake.some(segment => segment.row === head.row && segment.col === head.col)) {
        alert("Game Over! Your final score is: " + score);
        resetGame();  // Reset the game
        return;
    }

    // Add the new head to the snake body
    snake.unshift(head);

    // Check if the snake eats food
    if (head.row === food.row && head.col === food.col) {
        // Increase score and update score board
        score++;
        scoreBoard.textContent = `Score: ${score}`;
        
        // Generate new food
        generateFood();
    } else {
        // Remove the last segment of the snake (tail)
        snake.pop();
    }

    // Redraw the snake after moving
    drawSnake();
}

// Handle user input (arrow keys)
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    } else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    }
});

// Game loop - moving the snake every 100ms
function gameLoop() {
    setTimeout(() => {
        moveSnake();
        gameLoop();  // Keep calling gameLoop every 100ms
    }, 100); // Move the snake 1 grid cell (10px) every 100ms
}

// Function to reset the game after a game over
function resetGame() {
    snake = [{ row: 20, col: 1 }];
    direction = 'RIGHT';
    score = 0;
    scoreBoard.textContent = `Score: ${score}`;
    generateFood();
    drawSnake();
    gameLoop();  // Restart the game loop
}

// Initialize the game
createGrid();
generateFood();
drawSnake();
gameLoop();  // Start the game loop

// game variables
let renderTime = 0;
const grid_size = 31;
let gameOver = false;
let score = 0;
// snake variables
const snakeSpeed = 8;
const snakeBody = [{ x: 17, y: 17 }];
let newSegments = 0;
const gameBoard = document.getElementById('game-board');
let inputDirections = { x: 0, y: 0 };

// food variables
let food = randomFoodPosition();
const snakeExpand = 1;

//** Game Functions */
function renderState() {
    if (gameOver) {
        if (confirm(`Game Over! Your Score was ${score}! Press OK to restart.`)) {
            clearInterval(gameSpeed);
            window.location = '/';
        }
        return;
    }

    console.log('Render');

    tick();
    buildState(gameBoard);
}

gameSpeed = setInterval(renderState, 1000 / snakeSpeed);
gameSpeed;

$(window).on('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (lastInputDirection.y !== 0) break;
            inputDirections = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (lastInputDirection.y !== 0) break;
            inputDirections = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (lastInputDirection.x !== 0) break;
            inputDirections = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (lastInputDirection.x !== 0) break;
            inputDirections = { x: 1, y: 0 };
            break;
    }
});

function getInputDirection() {
    lastInputDirection = inputDirections;
    return inputDirections;
}

function tick() {
    snakeTick();
    foodTick();
    gameOverState();
}

function buildState(gameBoard) {
    gameBoard.innerHTML = '';
    snakeState(gameBoard);
    foodPlacement(gameBoard);
}

function gameOverState() {
    gameOver = outsideGrid(snakeHead()) || snakeCollide();
}

function outsideGrid(location) {
    return (location.x < 1 || location.x > grid_size || location.y < 1 || location.y > grid_size);
}

//** Snake Functions */
function snakeState(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeSegment = document.createElement('div');
        snakeSegment.style.gridRowStart = segment.y;
        snakeSegment.style.gridColumnStart = segment.x;
        snakeSegment.classList.add('snake');
        gameBoard.appendChild(snakeSegment);
    });
}

function snakeTick() {
    addSnakeSegments();
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i] };
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;

}

function growSnake(amount) {
    newSegments += amount;
}

function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return equalPositions(segment, position);
    })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSnakeSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1] });
    }
    newSegments = 0;
}

function snakeHead() {
    return snakeBody[0];
}

function snakeCollide() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

//** Food Functions */
function foodPlacement(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function foodTick() {
    if (onSnake(food)) {
        growSnake(snakeExpand)
        food = randomFoodPosition();
    }
}

function randomFood() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomFoodPosition();
    }
    return newFoodPosition;
}

function randomFoodPosition() {
    score++;
    return {
        x: Math.floor(Math.random() * grid_size) + 1,
        y: Math.floor(Math.random() * grid_size) + 1
    }
}
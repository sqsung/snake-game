import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';

let lastRenderTime = 0;
let gameOver = false;
const GRID_SIZE = 21;
const gameBoard = document.getElementById('game-board');


function main(currentTime) {
    if (gameOver) {
        if (confirm('You lost! Press ok to restart')) {
            window.location.reload();
        }
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    console.log(`Render`);
    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function outsideGrid (position) {
    return (position.x < 1 || position.x > GRID_SIZE || position.y < 1 || position.y > GRID_SIZE)
}
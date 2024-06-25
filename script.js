let inputDir = {x: 0,y: 0};
const foodSound = new Audio('photos/food.mp3');
const gameOverSound = new Audio('photos/over.wav');
const moveSound = new Audio('photos/move.mp3');
const musicSound = new Audio('photos/bgMusic.mp3');


let score = 0;
let speed = 10;
let lastPaintTime = 0;


let snakeArr = [
    {x: 13,y: 15}
]

 let food =  {x: 9,y: 6};

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 <1/speed){
        return;
    }
    lastPaintTime = ctime;

    gameEngine();
}

function isCollide(snake){
    for(let i = 1; i<snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            gameOverSound.play();
            return true;
        }
    }    
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        gameOverSound.play();
        return true;
    }
    return false;
}

function gameEngine(){
    // part-1: updating snake array

    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over!! Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    //if you have eaten the food. regenerate the food and update score!

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score += 1;
        if (score > highscoreValue) {
            highscoreValue = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreValue));
            highscoreElement.innerHTML = "Champion Score: " + highscoreValue; // Update high score display
        }
        scorecard.innerHTML = "Score: " + score; // Update score display

        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    //Moving the snake
    for(let i = snakeArr.length-2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part-2: display snake and food

    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index == 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Logic start here!!

let highscore = localStorage.getItem("highscore");
let highscoreValue;

// Select HTML elements for displaying score and high score
const scorecard = document.getElementById('scorecard');
const highscoreElement = document.getElementById('highscore');
if (highscore === null) {
    highscoreValue = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreValue));
} else {
    highscoreValue = JSON.parse(highscore);
    highscoreElement.innerHTML = "Champion Score: " + highscoreValue;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0,y:1} //start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;  
            
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
            
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;        
    }
});
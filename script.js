// Getting Canvas
const canvas = document.getElementById("snakegrid");
const ctx = canvas.getContext("2d");

// Variables 
let speed = 7;

let tileCount = 20;// 400 = 20*20 , we created a 2d grid like context - 20 rows and 20 cols  
let tileSize = canvas.width / tileCount - 2;// khn tk snake ja skta hai

let headX = 10;
let headY = 10;
let appleX = 5;
let appleY = 5;

let Xvelocity = 0;// snake X  velocity 
let Yvelocity = 0;// snake Y velocity

//------ taking care of snake size------------
class Snakepart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}
const snakelength = [];
let currentLength = 0;
//-----------------------------------

//counting score
let score = 0;

// Audio's
let eatingaudio = new Audio("food.mp3");
let gameoveraudio = new Audio("gameover.mp3");
let movingaudio = new Audio("move.mp3");

// ----------------- Game loop ------------------------
function drawGame() {
    ChangeVelocityofSnake();
    // RequestAnimationFrame
    // setInterval - xtimes per second
    // setTimeOut 
    if(gameOver()){
        gameoveraudio.play();

        // // Showing Game-Over on Screen
        //     ctx.font = "50px Verdana";
        //     // Create gradient
        //     var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        //     gradient.addColorStop("0"," magenta");
        //     gradient.addColorStop("0.5", "blue");
        //     gradient.addColorStop("1.0", "red");
        //     // Fill with gradient
        //     ctx.fillStyle = gradient;
        //     ctx.fillText("Game Over!!", 50, 200);

        alert("Game Over !!! ");
        return;
    }
    
    
    fillScreen();
    drawSnake();
    
    CreateApple();
    Collision();
    incrementScore();

   //---- Increasing speed of snake ---   
     if(score > 50){
        speed = 50;
    }else if(score > 20){
        speed = 20;
    }else if(score > 10 ){
        speed = 15;
    }else if(score > 5){
        speed = 10;
    }
    //-----------------
    
    setTimeout(drawGame, 1000 / speed);

}
//---------------------------------------------

drawGame();

function fillScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {

    // fill the rest of snake 
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakelength.length; i++) {
        let length = snakelength[i];
        ctx.fillRect(length.x * tileCount, length.y * tileCount, tileSize, tileSize);
    }

    snakelength.push(new Snakepart(headX, headY));// pushing the object of current headX and headY into our snakelength array
    // so that when we come to drawgame function next time , we make snake including the previous head 

    while (snakelength.length > currentLength) {
        snakelength.shift();
    }

    // fill one cell of snake
    ctx.fillStyle = "white";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);



}


// Adding EventListners

document.body.addEventListener("keydown", event => {
    if (event.keyCode == 38) {
        // up
        if (Yvelocity == 1) return; // already moving down , cannot move up
        Yvelocity = -1;// 1 tile up
        Xvelocity = 0;


    }
    else if (event.keyCode == 40) {
        // down
        if (Yvelocity == -1) return;// alrady moving up, cannot move down
        Yvelocity = 1;
        Xvelocity = 0;

    }
    else if (event.keyCode == 37) {
        // left 
        if (Xvelocity == 1) return;// already moving right , cannot move left
        Yvelocity = 0;
        Xvelocity = -1;
    }
    else if (event.keyCode == 39) {
        //right
        if (Xvelocity == -1) return;// already moving left , cannot move right
        Yvelocity = 0;
        Xvelocity = 1;
    }

    movingaudio.play(); 
})

//  To change the velocity of snake
function ChangeVelocityofSnake() {
    headX += Xvelocity;
    headY += Yvelocity;


}

// generating Apples
function CreateApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function Collision() {
    if (appleX == headX && appleY == headY) {
        // we have to give the random position to our apple
        appleX = Math.floor(Math.random() * tileSize);
        appleY = Math.floor(Math.random() * tileSize);
        eatingaudio.play();

        currentLength++;
        score++;

    }
}


function incrementScore() {
    ctx.font = "10px Verdana";
    ctx.fillStyle = "white";
    ctx.fillText("SCORE : " + score, canvas.width - 80, 10);

    // console.log(score); 
}

function gameOver(){
    let check = false;// assuming that game is not over

    // Checking the walls 
    if(headX < 0){
        check =  true;
    }else if(headX === tileCount){
        check =  true;
    }else if(headY < 0){
        check =  true;
    }else if(headY === tileCount){
        check =  true;
    }

    // checking over snake occupied cells -- if snakes hits it's own body --> Game over
     for(let i=0 ;i<snakelength.length ;i++){
         if(snakelength[i].x == headX && snakelength[i].y == headY ){
             check = true;
             break;
         }
     }

     

   return check;

}




const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


const ground = new Image();
ground.src = "Pole4.png";

const foodImg = new Image();
foodImg.src = "Food.png";




a = 150;
let box = 32;
let score = 0;

//спавн еды  с 1 по 17
let food = {
x: Math.floor((Math.random() * 17 + 1))* box,
y: Math.floor((Math.random() * 15 + 3))* box,
};

let snake = [];
snake [0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener("keydown", direction);

let dir;
function direction(event){
   if(event.keyCode == 37 && dir != "right") //стрелка в лево
   dir ="left";
   if(event.keyCode == 38 && dir != "down") //стрелка в вверх
   dir ="up";
   if(event.keyCode == 39 && dir != "left") //стрелка в право
   dir ="right";
   if(event.keyCode == 40 && dir != "up") //стрелка в низ  не может если тшла в верх
   dir ="down";
   if(event.keyCode == 65 && dir != "right") //a
   dir ="left";
   if(event.keyCode == 87 && dir != "down") //w
   dir ="up";
   if(event.keyCode == 68 && dir != "left") //d
   dir ="right";
   if(event.keyCode == 83 && dir != "up") //s
   dir ="down";


}

function eatTail(head,arr){
    for(let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game);
           
    }
}

function drawGame(){
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y );
  

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = i == 0 ? "DeepSkyBlue" : "aqua";
        ctx.fillRect(snake[i].x, snake[i].y, box, box );

    }

ctx.fillStyle ="white";
ctx.font = "50px Arial";
ctx.fillText(score, box*2.5, box*1.75);

let snakeX = snake[0].x; 
let snakeY = snake[0].y;

if(snakeX  == food.x && snakeY == food.y) {
    score++;
    food = {
        x: Math.floor((Math.random() * 17 + 1))* box,
        y: Math.floor((Math.random() * 15 + 3))* box,
        };
}else 
    snake.pop();


if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
    // Очистка интревала:
    clearInterval(game);

    // Пременные:
    let isBoss = confirm("Game over");

    // Проверка:
    if (isBoss == true) {
        location.reload()
    } else {
        //
    }
}


if(dir == "left") snakeX -= box;
if(dir == "right") snakeX += box;
if(dir == "up") snakeY -= box;
if(dir == "down") snakeY += box;

let newHead = {
    x:snakeX,
    y:snakeY
};

eatTail(newHead,snake);

snake.unshift(newHead)



}

let game = setInterval(drawGame, a);







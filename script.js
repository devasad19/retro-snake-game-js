const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//create the snake
let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
}

// define audio file
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const down = new Audio();
const left = new Audio();
const right = new Audio();


dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";

// create food
let food = {
	x: Math.floor(Math.random() * 17+1) * box,
	y: Math.floor(Math.random() * 15+3) * box
}

//create score 
let score = 0;
let d ;
//control the snake
document.addEventListener("keydown", direction);

function direction(enent){
	if(event.keyCode == 37 && d != "RIGHT"){
		left.play()
		d = "LEFT";
	}else if(event.keyCode == 38 && d != "DOWN"){
		down.play();
		d = "UP";
	}else if(event.keyCode == 39 && d != "LEFT"){
		right.play();
		d = "RIGHT";
	}else if(event.keyCode == 40 && d != "UP"){
		up.play();
		d = "DOWN";
	}
}

// draw everything to the canvas
function draw(){
	ctx.drawImage(ground, 0, 0);
	for(let i = 0; i< snake.length; i++){
		ctx.fillStyle = ( i == 0) ? "green": "white";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);

		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.drawImage(foodImg, food.x, food.y);

	// old snake head position
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;


	// which direction of the snake
	if( d == "LEFT") snakeX -= box;
	if( d == "UP") snakeY -= box;
	if( d == "RIGHT") snakeX += box;
	if( d == "DOWN") snakeY += box;


	//if the snake eats food
	if(snakeX == food.x && snakeY == food.y){
		eat.play();
		score ++;

		food = {
			x : Math.floor(Math.random() * 17+1) * box,
			y : Math.floor(Math.random() * 15+3) * box
		}
	}else{
		// remove the snake tail
		snake.pop();
	}

//check collision function

function collision(head, array){
	for(let i = 0; i< array.length; i++){
		if(head.x == array[i].x && head.y == array[i].y){
			return true;
		}
	}
	return false;
}

	// add new head
	let newHead = {
		x : snakeX,
		y : snakeY
	}

// game over 
 if(snakeX < box || snakeX > 17* box || snakeY < 3* box || snakeY > 17*box || collision(newHead, snake)){
 	dead.play();
 	clearInterval(game);
 }





	snake.unshift(newHead);

	ctx.fillStyle = "white";
	ctx.font = "43px Changa one";
	ctx.fillText(score, 2*box, 1.6*box);
}

// call draw function every 100 ms

let game = setInterval(draw, 100);

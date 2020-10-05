const canvas = document.getElementById('screenGame');
const context = canvas.getContext('2d');
let width = 300;
let height= 530;
let canvas_width = 300;
let canvas_height= 530;
canvas.width = canvas_width;
canvas.height = canvas_height;
let pause = false;
const fps = 50;
const character = new Character(50, 150, 50, 50, 'imagenes/bird.png');
const score = new Score('audios/punto.mp3');

const background = new Image();
background.src = 'imagenes/background.png';

const floor = new Floor('imagenes/suelo.png');
const array = new Array();
array.push(new Pipe(context.canvas.height - 30, 0, 'imagenes/tuberiaSur.png', 'imagenes/tuberiaNorte.png'));
function keyDown(event) {
    // console.log(event);
    if (event.code === 'Enter') {
        pause = !pause;
        paintPauseText();
    } else {
        character.y -= 20;
    }
    
}
function resize() {
    canvas_height = window.innerHeight;
    canvas_width = window.innerWidth;
    canvas.height = height;
    canvas_width = width;
    canvas.style.height = `${canvas_height}px`
}
function loop() {
    if (pause) {
        return;
    }
    context.clearRect(0, 0, 300, 530);
    context.fillStyle="rgb(50,100,50,1)";
    context.drawImage(background,0,0);
    floor.paint(context);
    character.paint(context);
    paintPipes();
    score.paint(context);
    character.y += 1.5;
}
function paintPipes() {
    for (let pipe of array) {
        let dy = pipe.north.height + 80;
        pipe.paint(context, dy);
        pipe.x--;
        if (pipe.y + pipe.north.height < 80 ) {
            pipe.y = 0;
        }
        if (pipe.x === 150) {
            addRandomPipe();
        }
        if (isCollision(pipe, dy)) {
            gameOver();
        }
        if (pipe.x === character.x) {
            score.add();
        }
        if (pipe.x < -60 ) {
            array.splice(array.indexOf(pipe), 1);
        }
    }
}
function addRandomPipe() {
    const pipe = new Pipe(context.canvas.width, 0, 'imagenes/tuberiaSur.png', 'imagenes/tuberiaNorte.png');
    pipe.randomLocation()
    array.push(pipe);
}
function isCollision(currentPipe, dy) {
    return ( character.x + character.img.width >= currentPipe.x &&
        character.x <= currentPipe.x + currentPipe.north.width &&
        (   character.y <= currentPipe.y + currentPipe.north.height || 
            character.y + character.img.height >= currentPipe.y + dy
        ) || character.y + character.img.height >= context.canvas.height - floor.img.height)
}
function start() {
    try {
        resize();
        loop();
        setInterval(loop, 1000/fps);
    } catch (e) {
        alert('Error al iniciar el juego');
        console.log(e);
    }
    
}
function gameOver() {
    alert(`Game Over score: ${score.score}`);
    location.reload();
}
function paintPauseText() {
    context.fillStyle =`rgba(0,0,0,${pause ? 1 : 0})`;
    context.font = '25px Arial';
    context.fillText('Pause', 100, 50);
}
window.addEventListener('keydown', keyDown);
window.addEventListener('click', keyDown)
window.addEventListener('resize',resize);
start();

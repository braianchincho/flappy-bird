const context = document.getElementById('screenGame').getContext('2d');
context.canvas.width = 300;
context.canvas.height = 530;
const fps = 60;
const character = new Character(50, 150, 50, 50, 'imagenes/bird.png');
const score = new Score('audios/punto.mp3');

const background = new Image();
background.src = 'imagenes/background.png';

const floor = new Floor('imagenes/suelo.png');
const array = new Array();
array.push(new Pipe(context.canvas.height - 30, 0, 'imagenes/tuberiaSur.png', 'imagenes/tuberiaNorte.png'));
function keyDown() {
    character.y -= 20;
}
function loop() {
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
window.addEventListener('keydown', keyDown);
start();

const context = document.getElementById('screenGame').getContext('2d');
context.canvas.width = 300;
context.canvas.height = 530;
const fps = 60;
const character = {
    x: 50,
    y: 100,
    w: 50,
    h: 50
};
let score = 0;
const audioScore = new Audio();
audioScore.src = 'audios/punto.mp3';
const bird = new Image();
bird.src = 'imagenes/bird.png';

const background = new Image();
background.src = 'imagenes/background.png';

const northPipe = new Image();
northPipe.src = 'imagenes/tuberiaNorte.png';

const southPipe = new Image();
southPipe.src = 'imagenes/tuberiaSur.png';

const floor = new Image();
floor.src = 'imagenes/suelo.png';
const array = new Array();
array.push({ x: context.canvas.height , y: 0});
function keyDown() {
    character.y -= 20;
}
function loop() {
    context.clearRect(0, 0, 300, 530);
    context.fillStyle="rgb(50,100,50,1)";
    context.drawImage(background,0,0);
    context.drawImage(floor,0,context.canvas.height - floor.height);
    context.drawImage(bird,character.x, character.y);
    for (let index = 0; index < array.length; index++) {
        const pipe = array[index];
        let dy = northPipe.height + 80;
        context.drawImage(northPipe, pipe.x, pipe.y);
        context.drawImage(southPipe, pipe.x, pipe.y + dy);
        if (pipe.y + northPipe.height < 80 ) {
            pipe.y = 0;
        }
        pipe.x--;
        if (pipe.x === 150) {
            array.push({ 
                x: context.canvas.width, 
                y: Math.floor(Math.random()*northPipe.height) - northPipe.height
            });
        }
        if (isCollision(pipe, dy)) {
            alert(`
                Game Over           
                Score: ${score}
            `);
            location.reload();
        }
        if (pipe.x === character.x) {
            audioScore.play();
            score++;
        }

    }
    context.fillStyle = 'rgba(0,0,0,1)'
    context.font = '25px Arial';
    context.fillText(`Score: ${score}`, 10, context.canvas.height - 40);
    character.y += 1.5;
}
function isCollision(currentPipe, dy) {
    return ( character.x + bird.width >= currentPipe.x &&
        character.x <= currentPipe.x + northPipe.width &&
        (   character.y <= currentPipe.y + northPipe.height || 
            character.y + bird.height >= currentPipe.y + dy
        ) || character.y + bird.height >= context.canvas.height - floor.height)
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
window.addEventListener('keydown', keyDown);
start();

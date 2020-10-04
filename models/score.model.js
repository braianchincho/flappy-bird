class Score {
    constructor(srcSound ,font, color = 'rgba(0,0,0,1)') {
        this.score = 0;
        this.audio = new Audio();
        this.audio.src = srcSound;
        this.font = font || '25px Arial';
        this.color = color;
    }
    add() {
        this.score++;
        this.audio.play();
    }
    paint(context) {
        if(!context || !context.canvas) {
            return;
        }
        context.fillStyle = this.color;
        context.font = this.font;
        context.fillText(`Score: ${this.score}`, 10, context.canvas.height - 40);
    }
}
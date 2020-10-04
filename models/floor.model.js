class Floor {
    constructor(imgSrc) {
        this.img = new Image();
        this.img.src = imgSrc;
    }
    paint(context) {
        if(!context || !context.canvas) {
            return;
        }
        context.drawImage(this.img, 0, context.canvas.height - this.img.height);
    }
}
class Character {
    constructor(x, y, w, h, srcImage) {
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 0;
        this.h = h || 0;
        this.img = new Image();
        this.img.src = srcImage;
    }
    paint(context) {
        context.drawImage(this.img, this.x, this.y);
    }
}
class Pipe {
    constructor(x, y, srcSouth, srcNorth) {
        this.x = x || 0;
        this.y = y || 0;
        this.north = new Image();
        this.north.src = srcNorth;
        this.south = new Image();
        this.south.src = srcSouth;

    }
    paint(context, dy) {
        context.drawImage(this.north, this.x, this.y);
        context.drawImage(this.south, this.x, this.y + dy);
    }
    randomLocation() {
        this.y = Math.floor(Math.random()*this.north.height) - this.north.height;
    }
}
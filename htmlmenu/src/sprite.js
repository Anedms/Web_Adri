
class Sprite {
    constructor(img, position) {
        this.img = img;
        this.img.halfWidth = img.width / 2;
        this.img.halfHeight = img.height / 2;
        this.position = Vector2.Copy(position);
        this.rotation = 0;
        this.scale = 1;
    }

    Draw(ctx) {
        ctx.save();
        ctx.translate(-this.img.halfWidth, -this.img.halfHeight);
        ctx.rotation(this.rotation);
        ctx.scale(this.scale);
        ctx.restore();
    }
}
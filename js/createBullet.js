var BulletGroup;

var Bullet = function(spriteName, x, y, direction) {
    this.spriteName = spriteName || '';
    this.body;
    this.x = x || 0;
    this.y = y || 0;
    this.direction = direction || "left";
    this.init = function() {

        this.body = game.add.sprite(this.x, this.y, spriteName);
        this.body.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.body);
        if (this.direction === "left") {
            this.body.scale.x = -1;
            this.body.body.gravity.x = -500;

        } else {
            this.body.scale.x = 1;
            this.body.body.gravity.x = 500;
        }



    }
}
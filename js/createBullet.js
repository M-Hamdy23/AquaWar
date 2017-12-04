var BulletGroup;

var Bullet = function(spriteName, x, y) {
    this.spriteName = spriteName || '';
    this.body;
    this.x = x || 0;
    this.y = y || 0;
    this.init = function() {
        this.body = game.add.sprite(this.x, this.y, imageName);
        this.body.animations.add(this.animationName);
        this.body.animations.play(this.animationName, 5, true);
        this.body.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.body);
    }
}
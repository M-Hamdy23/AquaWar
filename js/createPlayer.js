var CreatePlayer = function(imageName, animateName, fireSpriteName) {
    this.playerObj;
    this.spriteName = imageName || '';
    this.animationName = animateName || '';
    this.fireSpriteName = fireSpriteName || '';
    this.x = game.world.centerX;
    this.y = game.world.centerY;
    this.health = 100;
    this.LeftFlag = false;

    this.cursor;
    this.init = function() {
        this.playerObj = game.add.sprite(this.x, this.y, imageName);
        this.playerObj.animations.add(this.animationName);
        this.playerObj.animations.play(this.animationName, 5, true);
        this.playerObj.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.playerObj);
    }

    this.setControlKey = function(keyType) {
        if (keyType === 'cursor') {
            this.cursor = game.input.keyboard.createCursorKeys();
            this.cursor['fire'] = game.input.keyboard.addKey(Phaser.Keyboard.L);

        } else {
            this.cursor = {
                up: game.input.keyboard.addKey(Phaser.Keyboard.W),
                down: game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: game.input.keyboard.addKey(Phaser.Keyboard.D),
                fire: game.input.keyboard.addKey(Phaser.Keyboard.F)
            };
        }
    }

    this.fire = function() {
        if (this.cursor.fire.isDown) {
            if (LeftFlag) {
                this.playerObj.scale.x = -1;

            } else {
                this.playerObj.scale.x = 1;

            }
        }
    }
    this.move = function() {
        if (this.cursor.left.isDown) {
            this.playerObj.body.gravity.x = -500;
            this.playerObj.scale.x = -1;
            LeftFlag = true;
        } else if (this.cursor.right.isDown) {
            this.playerObj.body.gravity.x = 500;
            this.playerObj.scale.x = 1;
            LeftFlag = false;
        } else {
            if (this.playerObj.body.velocity.x > 0)
                this.playerObj.body.velocity.x -= 10;
            else if (this.playerObj.body.velocity.x < 0)
                this.playerObj.body.velocity.x += 10;

        }

        if (this.cursor.up.isDown) {
            this.playerObj.body.gravity.y = -500;

        } else if (this.cursor.down.isDown) {
            this.playerObj.body.gravity.y = 500;
        } else {
            if (this.playerObj.body.velocity.y > 0)
                this.playerObj.body.velocity.y -= 10;
            else if (this.playerObj.body.velocity.y < 0)
                this.playerObj.body.velocity.y += 10;
        }
    }

}
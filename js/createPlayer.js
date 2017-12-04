var CreatePlayer = function(imageName, animateName, fireSpriteName, bulletSpriteName) {
    this.body;
    this.spriteName = imageName || '';
    this.animationName = animateName || '';
    this.fireSpriteName = fireSpriteName || '';
    this.bulletSpriteName = bulletSpriteName || '';
    this.x = game.world.centerX;
    this.y = game.world.centerY;
    this.health = 100;
    this.LeftFlag = false;

    this.cursor;
    this.isFire = false;
    this.init = function() {
        this.body = game.add.sprite(this.x, this.y, imageName);
        this.body.animations.add(this.animationName);
        this.body.animations.play(this.animationName, 5, true);
        this.body.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.body);
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

    this.newBullet = function() {
        this.x = this.body.x;
        this.y = this.body.y;
        console.log("current: X=" + this.x + "  Y=" + this.y);
        let bul;
        if (this.LeftFlag) {
            bul = new Bullet(bulletSpriteName, this.x - 80, this.y, "left");
        } else {
            bul = new Bullet(bulletSpriteName, this.x + 80, this.y, "right");
        }
        bul.init();
    }
    this.fire = function() {
        if (this.body.animations.currentAnim.name === 'fire') {
            this.body.animations.currentAnim.onComplete.add(
                function() {
                    this.x = this.body.x;
                    this.y = this.body.y;

                    /////////////////
                    //// creat bullet
                    if (this.isFire) {
                        this.newBullet();
                        this.isFire = false;
                    }
                    /////////////////
                    this.body.kill();
                    this.body = game.add.sprite(this.x, this.y, imageName);
                    this.body.animations.add(this.animationName);
                    this.body.animations.play(this.animationName, 5, true);
                    this.body.anchor.setTo(0.5, 0.5);
                    game.physics.arcade.enable(this.body);
                    if (this.LeftFlag) {
                        this.body.scale.x = -1;

                    } else {
                        this.body.scale.x = 1;

                    }
                }, this);
        }
        if (this.cursor.fire.isDown) {
            this.isFire = true;
            this.x = this.body.x;
            this.y = this.body.y;
            this.body.kill();
            this.body = game.add.sprite(this.x, this.y, fireSpriteName);
            this.body.animations.add('fire');
            //console.log("animation name:" + this.body.animations);
            this.body.animations.play('fire', 5, false);
            this.body.anchor.setTo(0.5, 0.5);
            game.physics.arcade.enable(this.body);
            console.log("current : " + this.body.animations.currentAnim.name);
            if (this.LeftFlag) {
                this.body.scale.x = -1;

            } else {
                this.body.scale.x = 1;

            }

        }
    }
    this.move = function() {
        if (this.cursor.left.isDown) {
            this.body.body.gravity.x = -500;
            this.body.scale.x = -1;
            this.LeftFlag = true;
        } else if (this.cursor.right.isDown) {
            this.body.body.gravity.x = 500;
            this.body.scale.x = 1;
            this.LeftFlag = false;
        } else {
            if (this.body.body.velocity.x > 0)
                this.body.body.velocity.x -= 10;
            else if (this.body.body.velocity.x < 0)
                this.body.body.velocity.x += 10;

        }

        if (this.cursor.up.isDown) {
            this.body.body.gravity.y = -500;

        } else if (this.cursor.down.isDown) {
            this.body.body.gravity.y = 500;
        } else {
            if (this.body.body.velocity.y > 0)
                this.body.body.velocity.y -= 10;
            else if (this.body.body.velocity.y < 0)
                this.body.body.velocity.y += 10;
        }
    }

}
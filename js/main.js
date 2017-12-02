var mainState = {
    preload: function() {
        // This function will be executed at the beginning 
        // That's where we load the game's assets 
        game.load.spritesheet('player', 'assets/move_animation.png', 200, 200);
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('env', 'assets/prototype_environment.jpg');
    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        this.leftFlage = false;


        this.fireRate = 100;
        this.nextFire = 0;
        this.bg = game.add.sprite(0, 0, 'env');
        this.bg.width = 1350;
        this.bg.height = 630;
        game.stage.backgroundColor = this.bg;


        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.playerOne = new CreatePlayer('player', 'walk');
        this.playerOne.init();
        this.playerOne.setControlKey('cursor');

        this.playerTwo = new CreatePlayer('player', 'walk');
        this.playerTwo.init();
        this.playerTwo.setControlKey('');

        this.creatBorder();



    },

    update: function() {
        // This function is called 60 times per second // It contains the game's logic 
        this.collide(this.playerOne);
        this.collide(this.playerTwo);
        //game.physics.arcade.collide(this.playerOne.playerObj, this.wallH);

        this.playerOne.move();
        this.playerTwo.move();
        this.playerOne.fire();
        this.playerTwo.fire();


    },

    collide: function(player) {
        game.physics.arcade.collide(player.playerObj, this.wallLeft);
        game.physics.arcade.collide(player.playerObj, this.wallRight);
        game.physics.arcade.collide(player.playerObj, this.wallTop);
        game.physics.arcade.collide(player.playerObj, this.wallDown);
    },
    creatBorder: function() {

        this.wallLeft = game.add.sprite(-20, 0, 'wallV'); // Left

        game.physics.arcade.enable(this.wallLeft);
        this.wallLeft.enableBody = true;
        this.wallLeft.body.immovable = true;

        this.wallRight = game.add.sprite(1350, 0, 'wallV'); // Right
        game.physics.arcade.enable(this.wallRight);
        this.wallRight.enableBody = true;
        this.wallRight.body.immovable = true;

        this.wallTop = game.add.sprite(0, -60, 'wallH');
        game.physics.arcade.enable(this.wallTop);
        this.wallTop.height = 0;
        this.wallTop.enableBody = true;
        this.wallTop.body.immovable = true;

        this.wallDown = game.add.sprite(0, 670, 'wallH');
        game.physics.arcade.enable(this.wallDown);
        this.wallDown.enableBody = true;
        this.wallDown.body.immovable = true;
    }

};

// We initialising Phaser 
var game = new Phaser.Game(1350, 630, Phaser.AUTO, 'gameDiv');
// And finally we tell Phaser to add and start our 'main' state 

game.state.add('main', mainState);

game.state.start('main');





/*if (this.cursor.left.isDown) {
            playerObj.body.velocity.x = -200;
        } else if (this.cursor.left.isUp) {
            playerObj.body.velocity.x = 0;

        }

        if (this.cursor.right.isDown) {

            playerObj.body.velocity.x = 200;
        } else if (this.cursor.up.isDown) {
            playerObj.body.velocity.y = -200;
        } else if (this.cursor.down.isDown) {
            playerObj.body.velocity.y = 200;
        }*/
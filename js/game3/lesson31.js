var TopDownGame = TopDownGame || {};
var player;

var flag = false;


var scene2 = 3; // 0 is start scene2 of the level
var goalbarrelcount;

var lastSuccessfullPosition = {
    x: Maze.SQUARE_SIZE * 12.5,
    y: Maze.SQUARE_SIZE * 7.5
}; //хранит положение какое было у спрайта когда он в последний раз соверлаппился с целью
//title screen
TopDownGame.Lesson31 = function() {};
TopDownGame.Lesson31.prototype = {
    create: function() {
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        this.map = this.game.add.tilemap('lesson31');
        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('tileSheets01-10', 'gameTiles');

        //create layers
        this.flour = this.map.createLayer('flour');
        this.blockLayer = this.map.createLayer('blockLayer');
        this.onBlockLayer = this.map.createLayer('onBlockLayer');
        this.drawLayer = this.map.createLayer('drawLayer');

        //this.createItems();




        player = this.game.add.sprite(200, 200, 'totalsheet', Pegman.selected_tileid);

        player.anchor.setTo(0.5, 0.5);


        this.game.physics.arcade.enable(player);
        //this.game.physics.arcade.enable(pointer);
        player.body.setSize(60, 13, 40, 73);

        //collision on blockedLayer

        //this.map.setTileIndexCallback([...Array(500).keys()], this.hitWall, this, 'blockLayer');
        //this.map.setTileIndexCallback([17, 18, 30, 31], this.hitWall, this, this.blockLayer);
        //this.map.setCollisionBetween(1, 4000, true, 'blockLayer');
        //resizes the game world to match the layer dimensions
        this.flour.resizeWorld();
        Pegman.init(player);

        player.alpha = 0;

        this.game.add.tween(player).to({
            alpha: 1
        }, 500, Phaser.Easing.Cubic.InOut, true, 0, 500, true);



        //the camera will follow the player in the world
        this.game.camera.follow(player);
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        for (var y = 0; y < this.map.height; ++y) {
            for (var x = 0; x < this.map.width; ++x) {
                var tile = this.map.getTile(x, y, this.drawLayer);
                if (tile) {
                    tile.alpha = 0.63;
                }
            }
        }
    },



    update: function() {


        //collision
        //this.game.physics.arcade.collide(player, this.blockLayer);
        //this.game.physics.arcade.overlap(player, chests, this.chestCallback, null, this);
        //this.game.physics.arcade.collide(player, barrels, this.hitWall, null, this);
        //this.game.physics.arcade.overlap(barrels, weapon.bullets, this.bulletHitBarrel, null, this);
        //this.game.physics.arcade.overlap(player, pointer, this.scene2CompeteHandler, null, this);
        //this.game.physics.arcade.overlap(this.blockLayer, weapon.bullets, this.bulletHitWall, null, this);
        //player movement

        player.body.velocity.x = 0;
        var velocity = 400;

        if (this.cursors.up.isDown) {
            if (player.body.velocity.y == 0)
                player.body.velocity.y -= velocity;

        } else if (this.cursors.down.isDown) {
            if (player.body.velocity.y == 0)
                player.body.velocity.y += velocity;

        } else {
            player.body.velocity.y = 0;
        }
        if (this.cursors.left.isDown) {
            player.body.velocity.x -= velocity;
        } else if (this.cursors.right.isDown) {
            player.body.velocity.x += velocity;
        }

        if (fireButton.isDown) {

        }
        /*
                if (this.cursors.up.isDown) {
                    this.game.camera.y -= 4;
                } else if (this.cursors.down.isDown) {
                    this.game.camera.y += 4;
                }
                if (this.cursors.left.isDown) {
                    this.game.camera.x -= 4;
                } else if (this.cursors.right.isDown) {
                    this.game.camera.x += 4;
                }
        */
        // this.game.debug.body(player);
        // this.game.debug.physicsGroup(barrels);
        // this.game.debug.bodyInfo(player, 32, 50);

    },

};
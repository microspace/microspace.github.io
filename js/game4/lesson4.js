var TopDownGame = TopDownGame || {};


var player;
var cp;

var flag = false;

var map;
var drawLayer;
Pegman.dposX = 11;
Pegman.dposY = 7;
//var data;


var lastSuccessfullPosition = {
    x: Maze.SQUARE_SIZE * (4 + 0.5),
    y: Maze.SQUARE_SIZE * (3 + 0.5)
};

//title screen
TopDownGame.Lesson4 = function () { };
TopDownGame.Lesson4.prototype = {
    create: function () {

        Blockly.mainWorkspace.clear();
        Blockly.mainWorkspace.clearUndo();
        Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);


        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        this.map = this.game.add.tilemap('lesson41');
        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('tileSheetWinter', 'gameTiles');
        //create layer
        this.flour = this.map.createLayer('flour');
        //this.collision1 = this.map.createLayer('collision1');
        //this.collision2 = this.map.createLayer('collision2');
        this.railing = this.map.createLayer('railing');





        player = this.game.add.sprite(0, 0, 'totalsheet', Pegman.selected_tileid);
        player.tint = 0xAADDDD;
        player.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(player);
        player.body.setSize(32, 32, 16, 16);
        this.flour.resizeWorld();
        Pegman.init(player);




        //the camera will follow the player in the world
        this.game.camera.follow(player);
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        TopDownGame.game.camera.flash(0x000000, 500);
        //this.map.setTileIndexCallback([...Array(500).keys()], this.hitWall1, this, this.collision1);
        //this.map.setTileIndexCallback([...Array(500).keys()], this.hitWall2, this, this.collision2);
        railingGroup = this.game.add.group();


        for (var y = 0; y < this.map.height; ++y) {
            for (var x = 0; x < this.map.width; ++x) {
                var tile = this.map.getTile(x, y, this.railing);
                if (tile) {
                    //console.log(tile);
                    if (tile.index == 166) { //upper
                        var graphics = this.game.add.graphics(0, 0);
                        graphics.lineStyle(1, 0xffff00, 1);
                        graphics.moveTo(tile.worldX, tile.worldY + Maze.SQUARE_SIZE);
                        graphics.lineTo(tile.worldX + Maze.SQUARE_SIZE, tile.worldY + Maze.SQUARE_SIZE);
                        // graphics.moveTo(50,50);
                        var sprite = this.game.add.sprite(tile.worldX, tile.worldY + Maze.SQUARE_SIZE, graphics.generateTexture());
                        this.game.physics.arcade.enable(sprite);
                        sprite.body.immovable = true;
                        sprite.body.moves = false;
                        //console.log(sprite.x, sprite.y);
                        railingGroup.add(sprite);
                        graphics.destroy();
                    }
                    if (tile.index == 167) { //lower
                        var graphics = this.game.add.graphics(0, 0);
                        graphics.lineStyle(1, 0xff00ff, 1);
                        graphics.moveTo(tile.worldX, tile.worldY);
                        graphics.lineTo(tile.worldX + Maze.SQUARE_SIZE, tile.worldY);
                        // graphics.moveTo(50,50);
                        var sprite = this.game.add.sprite(tile.worldX, tile.worldY, graphics.generateTexture());
                        this.game.physics.arcade.enable(sprite);
                        sprite.body.immovable = true;
                        sprite.body.moves = false;
                        //console.log(sprite.x, sprite.y);
                        railingGroup.add(sprite);
                        graphics.destroy();
                    }
                    if (tile.index == 154) { //left
                        var graphics = this.game.add.graphics(0, 0);
                        graphics.lineStyle(1, 0x0000ff, 1);
                        graphics.moveTo(tile.worldX + Maze.SQUARE_SIZE, tile.worldY + Maze.SQUARE_SIZE);
                        graphics.lineTo(tile.worldX + Maze.SQUARE_SIZE, tile.worldY);
                        // graphics.moveTo(50,50);
                        var sprite = this.game.add.sprite(tile.worldX + Maze.SQUARE_SIZE, tile.worldY, graphics.generateTexture());
                        this.game.physics.arcade.enable(sprite);
                        sprite.body.immovable = true;
                        sprite.body.moves = false;
                        railingGroup.add(sprite);
                        graphics.destroy();
                    }
                    if (tile.index == 153) { //right
                        var graphics = this.game.add.graphics(0, 0);
                        graphics.lineStyle(1, 0x000000, 1);
                        graphics.moveTo(tile.worldX + Maze.SQUARE_SIZE, tile.worldY + Maze.SQUARE_SIZE);
                        graphics.lineTo(tile.worldX + Maze.SQUARE_SIZE, tile.worldY);
                        // graphics.moveTo(50,50);
                        var sprite = this.game.add.sprite(tile.worldX, tile.worldY, graphics.generateTexture());
                        this.game.physics.arcade.enable(sprite);

                        sprite.body.immovable = true;
                        sprite.body.moves = false;
                        //console.log(sprite.x, sprite.y);
                        railingGroup.add(sprite);
                        graphics.destroy();
                    }
                    railingGroup.enableBody = true;
                    railingGroup.physicsBodyType = Phaser.Physics.ARCADE;
                    // railingGroup.forEach(function(c) {
                    //    c.immovable = true;
                    //      });
                }
            }
        }
        // railingGroup.forEach(function(c) {
        //     console.log(c.x);
        // });
        //var graphics = this.game.add.graphics(0, 0);
        // graphics.lineStyle(2, 0xffd900, 0.11);
        // graphics.moveTo(50, 50);
        // graphics.lineTo(250, 50);
        //
        //sprite.anchor.set(0.5);
        //  And destroy the original graphics object
        ////graphics.destroy();


    },

    update: function () {
        //this.game.physics.arcade.collide(player, this.collision1);
        //this.game.physics.arcade.collide(player, this.collision2);
        this.game.physics.arcade.collide(player, railingGroup, null, null, this);

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


            // sublevel = 3;
            // change_map('lesson3' + sublevel);
            // Pegman.reset2();

        }
        this.game.debug.body(player);
        // this.game.debug.physicsGroup(barrels);
        // this.game.debug.bodyInfo(player, 32, 50);
    },
    hitWall1: function () {
        console.log("hit1");
    },
    hitWall2: function () {
        console.log("hit2");
    }
};





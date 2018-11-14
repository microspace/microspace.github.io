var TopDownGame = TopDownGame || {};


var player;
var cp;

var flag = false;
var scene;
var map;
var drawLayer;
var showflag = true;
Pegman.dposX = 11;
Pegman.dposY = 7;
//var data;
var capacity = 100;
var maxcaps2;
var myHealthBar;

var lastSuccessfullPosition = {
    x: Maze.SQUARE_SIZE * (4 + 0.5),
    y: Maze.SQUARE_SIZE * (3 + 0.5)
};

//title screen
TopDownGame.Lesson4 = function() {};
TopDownGame.Lesson4.prototype = {
    create: function() {

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
        this.upperLayer = this.map.createLayer('upperLayer');
        this.onBlockLayer = this.map.createLayer('onBlockLayer');
        this.blockLayer = this.map.createLayer('blockLayer');
        this.sinkLayer = this.map.createLayer('sinkLayer');
        this.onFlour = this.map.createLayer('onFlour');





        this.createItems();
        weapon = this.game.add.weapon(20, 'bullet');
        var result = this.findObjectsByType('playerStartPosition', this.map, 'playerLayer');
        lastSuccessfullPosition = {
            x: result[0].x,
            y: result[0].y
        };
        player = this.game.add.sprite(result[0].x, result[0].y, 'pegman');


        player.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(player);
        player.body.setSize(60, 13, 40, 73);
        this.flour.resizeWorld();
        Pegman.init(player);

        //bullets


        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletAngleOffset = 0;
        weapon.bulletSpeed = 500;
        weapon.fireAngle = Phaser.ANGLE_RIGHT; // shoot at right direcion by default
        weapon.trackSprite(player, 0, -9, false); //-65 выведено экспериментальным путём
        //weapon.addBulletAnimation("fly", [0, 1, 2, 3, 4, 5, 6, 7], 40, true);

        //explosion
        explosion = this.game.add.sprite(0, 0, 'explosion');
        explosion.visible = false;
        explanim = explosion.animations.add('EXPL', [0, 1, 2, 3, 4, 5], 20, /*loop*/ false);
        explanim.onComplete.add(this.animationStopped, this);






        var fps = 7;
        player.animations.add('NORTH', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], fps, /*loop*/ true);
        player.animations.add('EAST', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], fps, /*loop*/ true);
        player.animations.add('SOUTH', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], fps, /*loop*/ true);
        player.animations.add('WEST', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], fps, /*loop*/ true);
        player.animations.add('WEST_SOUTH', [14], fps, /*loop*/ false);
        player.animations.add('SOUTH_WEST', [14], fps, /*loop*/ false);
        player.animations.add('WEST_NORTH', [14], fps, /*loop*/ false);
        player.animations.add('NORTH_WEST', [14], fps, /*loop*/ false);
        player.animations.add('EAST_SOUTH', [14], fps, /*loop*/ false);
        player.animations.add('SOUTH_EAST', [14], fps, /*loop*/ false);
        player.animations.add('EAST_NORTH', [14], fps, /*loop*/ false);
        player.animations.add('NORTH_EAST', [14], fps, /*loop*/ false);
        player.animations.add('STAND', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], fps, /*loop*/ true);
        player.animations.add('HIT', [25, 26, 27, 28, 29], fps, /*loop*/ false);
        player.animations.add('SHOOT', [20, 21, 22, 23, 24], fps, /*loop*/ false);
        player.animations.play('STAND');


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
        scene = 1;
        load_scene();

    },
    animationStopped: function(sprite, animation) {
        explosion.visible = false;
    },
    update: function() {

        //this.game.physics.arcade.collide(player, this.collision1);
        //this.game.physics.arcade.collide(player, this.collision2);
        //this.game.physics.arcade.collide(player, railingGroup, null, null, this);
        this.game.physics.arcade.overlap(barrels, weapon.bullets, this.bulletHitBarrel, null, this);

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
        if (fireButton.isDown) {}

        try {
            myHealthBar.setPercent(workspace.remainingCapacity() / (maxcaps2 - 1) * 100);
            
        } catch {};
    },
    hitWall1: function() {
        console.log("hit1");
    },
    hitWall2: function() {
        console.log("hit2");
    },
    createItems: function() {
        //create items
        barrels = this.game.add.group();
        barrels.enableBody = true;
        result = this.findObjectsByType('barrel', this.map, 'objectLayer');
        result.forEach(function(element) {
            this.createFromTiledObject(element, barrels);
        }, this);
    },

    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
    findObjectsByType: function(type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function(element) {
            if (element.properties.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust
                //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                //so they might not be placed in the exact position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },
    //create a sprite from an object
    createFromTiledObject: function(element, group) {
        var sprite = group.create(element.x, element.y, 'totalsheet', 234);
        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key) {
            sprite[key] = element.properties[key];
        });
        sprite.health = 100;
        sprite.body.immovable = true;
        //sprite.scale.set(2 , 2 );
        if (sprite["sprite"] === "needToHit") {
            sprite.frame = 195;
        }
        if (sprite["scene"] < scene) {
            sprite.frame = 197
        } else if (sprite["scene"] > scene) {
            sprite.kill();
        }
    },
    bulletHitBarrel: function(sprite, bullet) {
        var damage = 48;
        sprite.damage(damage);
        if (sprite.health > 50) {
            sprite.frame = 196;
        } else if (sprite.health < 20) {
            sprite.frame = 197;
            sprite.body.enable = false; // отключаем физику чтобы пули пролетали сквозь остатки бочки
        }
        explosion.x = sprite.x;
        explosion.y = sprite.y - 30;
        explosion.visible = true;
        explosion.animations.play('EXPL');
        bullet.kill();
    },
};


function load_scene() {

    showflag = true;

    var runButton = document.getElementById('runButton');
    runButton.style.display = 'inline';
    document.getElementById('resetButton').style.display = 'none';
    // Prevent double-clicks or double-taps.
    runButton.disabled = false;

    Blockly.mainWorkspace.clear();
    Blockly.mainWorkspace.clearUndo();
    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
    
    
    if (scene == 2) {

        var newTree = `
        <xml id="toolbox" style="display: none; background-color: #4d90fe;">
        <block type="fire"></block>
        <block type="repeat_n_times"></block>
        </xml>`;
        
    
        workspace.updateToolbox(newTree);

        var barConfig = {
            width: 150,
            height: 20,
            x: 600,
            y: 30,
            bg: {
              color: '#651828'
            },
            bar: {
              color: '#FEFF03'
            },
            animationDuration: 200,
            flipped: false
          };
        
        myHealthBar = new HealthBar(TopDownGame.game, barConfig);
        myHealthBar.setFixedToCamera(true);
        myHealthBar.setPercent(capacity); 
        myHealthBar.alpha = 0;
        
        maxcaps2 = 2+1;
        workspace.options.maxBlocks = maxcaps2;

    } else if (scene == 3) { 
        var newTree = `
        <xml id="toolbox" style="display: none; background-color: #4d90fe;">
        <block type="maze_up"></block>
        <block type="maze_down"></block>
        <block type="maze_left"></block>
        <block type="maze_right"></block>
        <block type="fire"></block>
        <block type="repeat_n_times"></block>
        </xml>`;
        workspace.updateToolbox(newTree);
        maxcaps2 = 11+1;
        workspace.options.maxBlocks = maxcaps2;

    } else if (scene == 4) { 
        var newTree = `
        <xml id="toolbox" style="display: none; background-color: #4d90fe;">
        <block type="maze_up"></block>
        <block type="maze_down"></block>
        <block type="maze_left"></block>
        <block type="maze_right"></block>
        <block type="fire"></block>
        <block type="repeat_n_times"></block>
        </xml>`;
        workspace.updateToolbox(newTree);
        maxcaps2 = 5+1;
        workspace.options.maxBlocks = maxcaps2;

    } else if (scene == 5) { 
        var newTree = `
        <xml id="toolbox" style="display: none; background-color: #4d90fe;">
        <block type="maze_up"></block>
        <block type="maze_down"></block>
        <block type="maze_left"></block>
        <block type="maze_right"></block>
        <block type="fire"></block>
        <block type="repeat_n_times"></block>
        </xml>`;
        workspace.updateToolbox(newTree);
        maxcaps2 = 5+1;
        workspace.options.maxBlocks = maxcaps2;

    }

    barrels.forEach(function (c) {
        if (c.scene == scene) {
            c.revive();
        } else {
            c.kill();
        }
    });
    Pegman.reset2();
}
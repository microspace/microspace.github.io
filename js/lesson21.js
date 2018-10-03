var TopDownGame = TopDownGame || {};
var player;
var b;
var flag = false;
var weapon;
var explosion;
var items;
var barrels;
var scene2 = 3; // 0 is start scene2 of the level
var goalbarrelcount;
var xyqueue = getArrayWithLimitedLength(10);
var lastSuccessfullPosition = {
    x: null,
    y: null
}; //хранит положение какое было у спрайта когда он в последний раз соверлаппился с целью
//title screen
TopDownGame.Lesson21 = function() {};
TopDownGame.Lesson21.prototype = {
    create: function() {
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        this.map = this.game.add.tilemap('lesson21');
        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('tileSheet04-01', 'gameTiles');
        //create layer
        this.flour = this.map.createLayer('flour');
        this.blockLayer = this.map.createLayer('blockLayer');

        // this.onBlockLayer = this.map.createLayer('onBlockLayer');
        // this.onFlour = this.map.createLayer('onFlour');
        //create player
        // load all data from map json, populate the structure.
        //this.loadsceneData();
        /*        lastSuccessfullPosition = {
                    x: Maze.scenes[scene2].startPos[0],
                    y: Maze.scenes[scene2].startPos[1]
                };*/
        //var result = this.findObjectsByType('playerStartPosition', this.map, 'playerLayer');
        this.createItems();
        // here we count barrels which we need to hit

        /*        barrels.forEach(function(c) {
                    console.log(c.health);
                });*/

        weapon = this.game.add.weapon(20, 'bullet');



        explosion = this.game.add.sprite(0, 0, 'explosion');
        explosion.visible = false;
        explanim = explosion.animations.add('EXPL', [0, 1, 2, 3, 4, 5], 20, /*loop*/ false);
        explanim.onComplete.add(this.animationStopped, this);
        var result = this.findObjectsByType('playerStartPosition', this.map, 'playerLayer');
        lastSuccessfullPosition = {
            x: result[0].x,
            y: result[0].y
        };
        player = this.game.add.sprite(result[0].x, result[0].y, 'pegman');
        //player.kill();
        //console.log(scene2s[currentscene2].startPos[0]);
        //console.log(scene2s[currentscene2].startPos[1]);


        player.anchor.setTo(0.5, 0.5);
        //pointer.anchor.setTo(0.5, 0.5);

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

        this.upperLayer = this.map.createLayer('upperLayer');
        this.game.physics.arcade.enable(player);
        //this.game.physics.arcade.enable(pointer);
        player.body.setSize(60, 13, 40, 73);

        //collision on blockedLayer

        this.map.setTileIndexCallback([...Array(500).keys()], this.hitWall, this, 'blockLayer');
        //this.map.setTileIndexCallback([17, 18, 30, 31], this.hitWall, this, this.blockLayer);
        //this.map.setCollisionBetween(1, 4000, true, 'blockLayer');
        //resizes the game world to match the layer dimensions
        this.flour.resizeWorld();
        Pegman.init(player);


        //the camera will follow the player in the world
        this.game.camera.follow(player);
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        //this.game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);

        //        button = this.game.add.button(1100, 1100, 'button', this.actionOnClick, this, 2, 1, 0)
        var cp = this.game.add.sprite(0, 0, 'coordinateplane');
        //this.blockLayer.debug = true;
        var t = this.game.add.text(0, 0, "Уровень 2.1", {
            font: "32px Arial",
            fill: "#ffffff",
            align: "center"
        });
        t.fixedToCamera = true;
        t.cameraOffset.setTo(700, 10);
        b = this.game.add.text(0, 0, "0,0", {
            font: "32px Arial",
            fill: "#ffffff",
            align: "center"
        });
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletAngleOffset = 0;
        weapon.bulletSpeed = Pegman.bulletSpeed;
        weapon.fireAngle = Phaser.ANGLE_RIGHT; // shoot at right direcion by default
        weapon.trackSprite(player, 0, -9, false); //-65 выведено экспериментальным путём
    },



    update: function() {
        var xtext = Math.floor(player.x / Maze.SQUARE_SIZE) + Maze.coordoffset_x;
        var ytext = -1 * Math.floor(player.y / Maze.SQUARE_SIZE) + Maze.coordoffset_y;

        b.text = xtext + ", " + ytext;

        b.x = Math.floor(player.x + Pegman.textoffset_x);
        b.y = Math.floor(player.y - player.height + Pegman.textoffset_y);

        if (xyqueue.length <= 9) {
            xyqueue.push({
                x: player.x,
                y: player.y
            });
        } else {
            if (xyqueue[9].x != player.x || xyqueue[9].y != player.y) {
                xyqueue.push({
                    x: player.x,
                    y: player.y
                });
            }
        }





        //collision
        this.game.physics.arcade.collide(player, this.blockLayer);
        this.game.physics.arcade.overlap(player, chests, this.chestCallback, null, this);
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
            TopDownGame.game.state.start('lesson22');
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
    animationStopped: function(sprite, animation) {
        explosion.visible = false;
    },

    hitWall: function() {

        if (!flag) {

            console.log("hitWall1");
            //Pegman.pegmanSprite.body.enable = false;
            player.y = xyqueue[7].y;
            player.x = xyqueue[7].x;
            Pegman.pegmanActions = [];
            if (Pegman.tween) {
                Pegman.tween.stop();
            }
            player.animations.play('HIT');

            flag = true;


        }
    },
    chestCallback: function(sprite, chest) {
        chest.visible = false;
    },

    createItems: function() {
        //create items
        chests = this.game.add.group();
        chests.enableBody = true;
        result = this.findObjectsByType('chest', this.map, 'objectLayer');
        result.forEach(function(element) {
            this.createFromTiledObject(element, chests);
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
        var sprite = group.create(element.x, element.y, 'totalsheet', 163);
        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key) {
            sprite[key] = element.properties[key];
        });

        sprite.health = 100;
        sprite.body.immovable = true;
    },

};


function getArrayWithLimitedLength(length) {
    var array = new Array();

    array.push = function() {
        if (this.length >= length) {
            this.shift();
        }
        return Array.prototype.push.apply(this, arguments);
    }
    return array;
}
var TopDownGame = TopDownGame || {};
var player;
var pointer;
var flag = false;
var weapon;
var explosion;
var items;
var barrels;
 // 0 is start scene of the level
var goalbarrelcount;
var xyqueue = getArrayWithLimitedLength(10);
var lastSuccessfullPosition = {}; //хранит положение какое было у спрайта когда он в последний раз соверлаппился с целью
//title screen
TopDownGame.Lesson1 = function () { };
TopDownGame.Lesson1.prototype = {
    create: function () {
        this.map = this.game.add.tilemap('lesson1');
        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('tileSheet04-01', 'gameTiles');
        //create layer
        this.flour = this.map.createLayer('flour');
        this.blockLayer = this.map.createLayer('blockLayer');
        this.onBlockLayer = this.map.createLayer('onBlockLayer');
        this.onFlour = this.map.createLayer('onFlour');
        this.sinkLayer = this.map.createLayer('sinkLayer');
        //create player
        // load all data from map json, populate the structure.
        this.loadSceneData();
        console.log("locaded");

        if (jQuery.isEmptyObject(lastSuccessfullPosition)) {
            if (scene === undefined || scene === null) {
               scene = 0
           }
            var result = this.findObjectsByType('playerStartPosition', this.map, 'playerLayer');
            console.log(result);
            lastSuccessfullPosition = {
                x: result[0].x,
                y: result[0].y 
            };

            console.log(lastSuccessfullPosition);
        }



        //var result = this.findObjectsByType('playerStartPosition', this.map, 'playerLayer');
        this.createItems();


        weapon = this.game.add.weapon(20, 'bullet');
        // game goal pointer
        pointer = this.game.add.sprite(Maze.scenes[scene].endPos[0], Maze.scenes[scene].endPos[1], 'pointer');
        pointer.scale.setTo(0.8, 0.8);
        pointer.animations.add('ANIM', [0, 1], 2, /*loop*/ true);
        pointer.animations.play('ANIM');

        player = this.game.add.sprite(Maze.scenes[scene].startPos[0], Maze.scenes[scene].startPos[1], 'pegman');

        player.anchor.setTo(0.5, 0.5);
        pointer.anchor.setTo(0.5, 0.5);

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
        player.body.enable = false;
        this.game.physics.arcade.enable(pointer);
        player.body.setSize(60, 13, 40, 73);
        pointer.body.setSize(10, 65, 48, 10);
        //collision on blockedLayer

        this.map.setTileIndexCallback([...Array(500).keys()], this.hitWall, this, this.blockLayer);
        this.map.setTileIndexCallback([81, 82, 83, 132, 133], this.sinkInWater, this, 'sinkLayer');
        //this.map.setTileIndexCallback([17, 18, 30, 31], this.hitWall, this, this.blockLayer);
        //this.map.setCollisionBetween(1, 2000, true, 'blockLayer');
        //resizes the game world to match the layer dimensions
        this.blockLayer.resizeWorld();
        Pegman.init(player);
        //player.kill();

        //bullets


        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletAngleOffset = 0;
        weapon.bulletSpeed = 1200;
        weapon.fireAngle = Phaser.ANGLE_RIGHT; // shoot at right direcion by default
        weapon.trackSprite(player, 0, -9, false); //-65 выведено экспериментальным путём
        //weapon.addBulletAnimation("fly", [0, 1, 2, 3, 4, 5, 6, 7], 40, true);

        //explosion
        explosion = this.game.add.sprite(0, 0, 'explosion');
        explosion.visible = false;
        explanim = explosion.animations.add('EXPL', [0, 1, 2, 3, 4, 5], 20, /*loop*/ false);
        explanim.onComplete.add(this.animationStopped, this);
        //bullets.callAll('animations.add', 'animations', 'fire', [0,1,2,3,4,5,6], 5, true);bullets.callAll('play', null, 'fire');
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        //the camera will follow the player in the world
        this.game.camera.follow(player);
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        //this.game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
        //this.blockLayer.debug = true;


    },
    animationStopped: function (sprite, animation) {
        explosion.visible = false;
    },

    update: function () {

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
        this.game.physics.arcade.collide(player, this.sinkLayer);
        this.game.physics.arcade.collide(player, barrels, this.hitWall, null, this);
        this.game.physics.arcade.overlap(barrels, weapon.bullets, this.bulletHitBarrel, null, this);
        //this.game.physics.arcade.overlap(player, pointer, this.sceneCompeteHandler, null, this);
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
            this.game.state.start('lesson21');
        }
    },
    render: function () {

    },
    hitWall: function () {

        if (!flag) {
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
    bulletHitBarrel: function (sprite, bullet) {
        var damage = 48;
        sprite.damage(damage);
        if (sprite["sprite"] == "restrictedToHit") {
            $("#modaltext").text("Нельзя стрелять по бочкам с водой! Целься точнее!");
            $("#exampleModal").modal();
            Pegman.reset2();
        } else {
            if (sprite.health > 40) {
                sprite.frame = 237;
                if (sprite["sprite"] == "needToHit") {
                    sprite.frame = 239;
                }
                if (sprite["flipped"] == true) {
                    sprite.frame = 242;
                }
            } else if (sprite.health < 60) {
                sprite.frame = 240;
                if (sprite["sprite"] == "needToHit") {
                    sprite.frame = 240;
                }
                if (sprite["flipped"] == true) {
                    sprite.frame = 243;
                }
                sprite.health += damage; // говнокод, позволяющий не умирать
                sprite.body.enable = false; // отключаем физику чтобы пули пролетали сквозь остатки бочки
            }
        }
        explosion.x = sprite.x;
        explosion.y = sprite.y - 30;
        explosion.visible = true;
        explosion.animations.play('EXPL');
        bullet.kill();
    },
    sinkInWater: function () {
        if (!flag) {
            Pegman.pegmanActions = [];
            if (Pegman.tween) {
                Pegman.tween.stop();
            }
            this.tween1 = this.game.add.tween(player).to({
                angle: 359
            }, 1000, Phaser.Easing.Linear.None, true);
            var dx;
            var dy;
            dx = Math.sign(xyqueue[9].x - xyqueue[7].x);
            dy = Math.sign(xyqueue[9].y - xyqueue[7].y);

            this.tween2 = this.game.add.tween(player).to({
                x: player.x + (Maze.SQUARE_SIZE - 10) * dx,
                y: player.y + (Maze.SQUARE_SIZE - 10) * dy,
            }, 1000, Phaser.Easing.Circular.Out, true);

            this.tween = this.game.add.tween(player.scale).to({
                x: 0.1,
                y: 0.1
            }, 1000, Phaser.Easing.Linear.None, true);

            this.tween.onComplete.addOnce(function () {
                player.kill();
            }, this);
            flag = true;
        }
    },
    createItems: function () {
        //create items
        barrels = this.game.add.group();
        barrels.enableBody = true;
        result = this.findObjectsByType('barrel', this.map, 'objectLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, barrels);
        }, this);
    },

    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
    findObjectsByType: function (type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function (element) {
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
    createFromTiledObject: function (element, group) {
        var sprite = group.create(element.x, element.y, 'totalsheet', 234);
        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function (key) {
            sprite[key] = element.properties[key];
        });

        if (sprite["sprite"] === "allowedToHit") {
            sprite.frame = 234;

        } else if (sprite["sprite"] == "allowedToHit2") {
            sprite.frame = 236;

        }
        else if (sprite["sprite"] == "needToHit") {
            sprite.frame = 238;
            if (sprite["flipped"] == true) {
                sprite.frame = 241;
            }

        } else if (sprite["sprite"] == "restrictedToHit") {
            sprite.frame = 235;

        }


        sprite.health = 100;
        sprite.body.immovable = true;
    },
    loadSceneData: function () {
/*          var result = this.findObjectsByType('playerStartPosition', this.map, 'playerLayer');
        Maze.scenes[0].startPos[0] = result[0].x;
        Maze.scenes[0].startPos[1] = result[0].y;  */
        var result = this.findObjectsByType('scene1Goal', this.map, 'playerLayer');
        Maze.scenes[0].endPos[0] = result[0].x;
        Maze.scenes[0].endPos[1] = result[0].y;

        var result = this.findObjectsByType('scene2Goal', this.map, 'playerLayer');
        Maze.scenes[1].startPos[0] = Maze.scenes[0].endPos[0];
        Maze.scenes[1].startPos[1] = Maze.scenes[0].endPos[1];
        Maze.scenes[1].endPos[0] = result[0].x;
        Maze.scenes[1].endPos[1] = result[0].y;

        var result = this.findObjectsByType('scene3Goal', this.map, 'playerLayer');
        Maze.scenes[2].startPos[0] = Maze.scenes[1].endPos[0];
        Maze.scenes[2].startPos[1] = Maze.scenes[1].endPos[1];
        Maze.scenes[2].endPos[0] = result[0].x;
        Maze.scenes[2].endPos[1] = result[0].y;

        var result = this.findObjectsByType('scene4Goal', this.map, 'playerLayer');
        Maze.scenes[3].startPos[0] = Maze.scenes[2].endPos[0];
        Maze.scenes[3].startPos[1] = Maze.scenes[2].endPos[1];
        Maze.scenes[3].endPos[0] = result[0].x;
        Maze.scenes[3].endPos[1] = result[0].y;

        Maze.scenes[4].startPos[0] = Maze.scenes[3].endPos[0];
        Maze.scenes[4].startPos[1] = Maze.scenes[3].endPos[1];
        Maze.scenes[4].endPos[0] = null;
        Maze.scenes[4].endPos[1] = null;
    },
};


function getArrayWithLimitedLength(length) {
    var array = new Array();

    array.push = function () {
        if (this.length >= length) {
            this.shift();
        }
        return Array.prototype.push.apply(this, arguments);
    }
    return array;
}
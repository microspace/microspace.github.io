var TopDownGame = TopDownGame || {};
var player;

var flag = false;
var bulletFlag = false;
var weapon;
var explosion;
var items;
var barrels;
var explosionSound = null;
var hitWallSound = null;
var bubbleSound = null;
var keyPickUpSound = null;
var clickSound = null;
var goalbarrelcount;
var xyqueue = getArrayWithLimitedLength(10);
var lastSuccessfullPosition = {
    x: null,
    y: null
}; //хранит положение какое было у спрайта когда он в последний раз соверлаппился с целью
//title screen
TopDownGame.Lesson24 = function () { };
TopDownGame.Lesson24.prototype = {
    create: function () {
        this.shotSound = this.game.add.audio('shot');
        this.successSound = this.game.add.audio('success');
        explosionSound = this.game.add.audio("explosion");
        hitWallSound = this.game.add.audio('hitwall');
        bubbleSound = this.game.add.audio('bubble');
        keyPickUpSound = this.game.add.audio('keypickup');
        clickSound = this.game.add.audio('click');
        scene = 4; // 0 is start scene2 of the level
        this.map = this.game.add.tilemap('lesson24');
        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('tileSheet04-01', 'gameTiles');
        //create layer
        this.flour = this.map.createLayer('flour');
        this.blockLayer = this.map.createLayer('blockLayer');
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        this.onBlockLayer = this.map.createLayer('onBlockLayer');
        this.onFlour = this.map.createLayer('onFlour');
        this.sinkLayer = this.map.createLayer('sinkLayer');

        this.createItems();
        weapon = this.game.add.weapon(20, 'bullet');
        // here we count barrels which we need to hit


        var result = findObjectsByType('playerStartPosition', this.map, 'playerLayer');
        lastSuccessfullPosition = {
            x: result[0].x,
            y: result[0].y
        };
        player = this.game.add.sprite(result[0].x, result[0].y, 'pegman');



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
        player.body.collideWorldBounds = true;
        //this.game.physics.arcade.enable(pointer);
        player.body.setSize(60, 13, 40, 73);

        //collision on blockedLayer




        this.map.setTileIndexCallback([...Array(300).keys()], this.sinkInWater, this, 'sinkLayer');
        this.map.setTileIndexCallback([...Array(300).keys()], this.hitWall, this, 'blockLayer');

        //this.map.setCollisionBetween(1, 4000, true, 'blockLayer');
        //resizes the game world to match the layer dimensions
        this.flour.resizeWorld();
        Pegman.init(player, this);

        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletAngleOffset = 0;
        weapon.bulletSpeed = bulletSpeed;
        weapon.fireAngle = Phaser.ANGLE_RIGHT; // shoot at right direcion by default
        weapon.trackSprite(player, 0, -9, false); //-65 выведено экспериментальным путём
        //the camera will follow the player in the world
        this.game.camera.follow(player);
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        //this.game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);

        //        button = this.game.add.button(1100, 1100, 'button', this.actionOnClick, this, 2, 1, 0)
        var cp = this.game.add.sprite(0, 0, 'coordinateplane');
        //this.blockLayer.debug = true;

        b = this.game.add.text(0, 0, "0,0", {
            font: "32px Arial",
            fill: "#ffffff",
            align: "center"
        });
        b.anchor.set(0.5);


        explosion = this.game.add.sprite(0, 0, 'explosion');
        explosion.visible = false;
        explanim = explosion.animations.add('EXPL', [0, 1, 2, 3, 4, 5], 20, /*loop*/ false);
        explanim.onComplete.add(this.animationStopped, this);

        this.game.physics.arcade.enable(weapon.bullets);

        explosion = this.game.add.sprite(0, 0, 'explosion');
        explosion.visible = false;
        explanim = explosion.animations.add('EXPL', [0, 1, 2, 3, 4, 5], 20, /*loop*/ false);
        explanim.onComplete.add(this.animationStopped, this);

    },



    update: function () {

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
        this.game.physics.arcade.collide(player, this.sinkLayer);
        this.game.physics.arcade.collide(weapon.bullets, this.blockLayer);
        this.game.physics.arcade.collide(player, barrels, this.hitWall, null, this);
        this.game.physics.arcade.overlap(player, chests, this.chestCallback, null, this);
        this.game.physics.arcade.overlap(barrels, weapon.bullets, this.bulletHitBarrel, null, this);

        if (this.cursors.up.isDown) {
            this.game.camera.unfollow();
            this.game.camera.y -= cameraSpeed;
        }
        else if (this.cursors.down.isDown) {
            this.game.camera.unfollow();
            this.game.camera.y += cameraSpeed;
        }

        if (this.cursors.left.isDown) {
            this.game.camera.unfollow();
            this.game.camera.x -= cameraSpeed;
        }
        else if (this.cursors.right.isDown) {
            this.game.camera.unfollow();
            this.game.camera.x += cameraSpeed;
        }

    },
    animationStopped: function (sprite, animation) {
        explosion.visible = false;
    },
    hitWall: function (sprite) {

        if (!flag && sprite.key == "pegman") {
            hitWallSound.play();
            player.y = xyqueue[7].y;
            player.x = xyqueue[7].x;
            Pegman.pegmanActions = [];
            if (Pegman.tween) {
                Pegman.tween.stop();
            }
            player.animations.play('HIT');
            flag = true;
        } else if (sprite.key == "bullet") {
            explosionSound.play();
            explosion.x = sprite.x - 20;
            explosion.y = sprite.y - 50;
            explosion.visible = true;
            explosion.animations.play('EXPL');
            sprite.kill();

        }
    },
    animationStopped: function (sprite, animation) {
        explosion.visible = false;
    },
    sinkInWater: function () {
        if (!flag) {
            bubbleSound.play();
            player.body.enable = false;
            b.visible = false;

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
    bulletHitBarrel: function (sprite, bullet) {
        var damage = 48;
        sprite.damage(damage);
        if (sprite["sprite"] == "restrictedToHit") {
            $("#imagecontainer").attr('class', "hero_fail");
            $("#modaltext").text(get_l10n("game1", "fail_water"));
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
    chestCallback: function (sprite, chest) {
        chest.visible = false;
    },

    createItems: function () {
        //create items
        chests = this.game.add.group();
        chests.enableBody = true;
        result = findObjectsByType('chest', this.map, 'objectLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, chests);
        }, this);

        barrels = this.game.add.group();
        barrels.enableBody = true;
        result = findObjectsByType('barrel', this.map, 'objectLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, barrels);
        }, this);
    },


    //create a sprite from an object
    createFromTiledObject: function (element, group) {
        var sprite = group.create(element.x, element.y, 'totalsheet', 163);
        //copy all properties to the sprite
        element.properties.forEach(function (element) {
            sprite[element.name] = element.value;
        });
        if (sprite["sprite"] === "allowedToHit") {
            sprite.frame = 234;
        }
        if (sprite["sprite"] === "treasure1") {
            sprite.frame = 163;

        } else if (sprite["sprite"] === "treasure2") {
            sprite.frame = 164;

        }
        sprite.health = 100;
        sprite.body.immovable = true;
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
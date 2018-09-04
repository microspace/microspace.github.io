var TopDownGame = TopDownGame || {};
var player;
var flag;
var weapon;
var explosion;
var items;
//title screen
TopDownGame.Game = function() {};

TopDownGame.Game.prototype = {
    create: function() {
        this.map = this.game.add.tilemap('level1');

        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('tileSheet04-01', 'gameTiles');

        //create layer
        this.flour = this.map.createLayer('flour');
        this.blockLayer = this.map.createLayer('blockLayer');
        this.onBlockLayer = this.map.createLayer('onBlockLayer');
        this.onFlour = this.map.createLayer('onFlour');

        //create player
        var result = this.findObjectsByType('playerStartPosition', this.map, 'playerLayer')
        player = this.game.add.sprite(result[0].x, result[0].y, 'pegman');
        player.scale.setTo(0.3, 0.3);
        player.anchor.setTo(0.5, 0.5);

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

        Pegman.init(player, {
            x: 0,
            y: 0
        }); // temporarily. need to rethink

        this.upperLayer = this.map.createLayer('upperLayer');
        this.game.physics.arcade.enable(player);
        player.body.setSize(200, 60, 150, 250);
        //collision on blockedLayer

        this.map.setTileIndexCallback([...Array(500).keys()], this.hitWall, this, this.blockLayer);
        //this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');
        //resizes the game world to match the layer dimensions
        this.createItems();
        this.blockLayer.resizeWorld();

        //bullets
        weapon = this.game.add.weapon(5, 'bullet');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletAngleOffset = 0;
        weapon.bulletSpeed = 400;
        weapon.trackSprite(player, 75, -10, true); //-65 выведено экспериментальным путём
        weapon.addBulletAnimation("fly", [0, 1, 2, 3, 4, 5, 6, 7], 40, true);

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
    },
    animationStopped: function(sprite, animation) {

        explosion.visible = false;

    },



    update: function() {
        //collision
        this.game.physics.arcade.collide(player, this.blockLayer);
        this.game.physics.arcade.overlap(items, weapon.bullets, this.bulletHitBarrel, null, this);
        //player movement

        player.body.velocity.x = 0;

        if (this.cursors.up.isDown) {
            if (player.body.velocity.y == 0)
                player.body.velocity.y -= 200;
        } else if (this.cursors.down.isDown) {
            if (player.body.velocity.y == 0)
                player.body.velocity.y += 200;
        } else {
            player.body.velocity.y = 0;
        }
        if (this.cursors.left.isDown) {
            player.body.velocity.x -= 200;
        } else if (this.cursors.right.isDown) {
            player.body.velocity.x += 200;
        }

        if (fireButton.isDown) {
            weapon.fire();
            player.animations.play('SHOOT');
        }

        //this.game.debug.body(player);

    },
    render: function() {
        //this.game.debug.spriteBounds(player);
        //        

    },
    hitWall: function() {

        if (!flag) {
            flag = true;
            player.animations.play('HIT');
            console.log("ouch!");

            if (Pegman.tween) {
                Pegman.tween.stop();
            }
        }
    },

    bulletHitBarrel: function(sprite, bullet) {
        sprite.damage(0.5);
        sprite.frame = 3;
        explosion.x = sprite.x-20;
        explosion.y = sprite.y-30;
        explosion.visible = true;
        explosion.animations.play('EXPL');
        
        bullet.kill();
    },

    createItems: function() {
        //create items
        items = this.game.add.group();
        items.enableBody = true;
        var item;
        result = this.findObjectsByType('barrel', this.map, 'objectLayer');
        result.forEach(function(element) {
            this.createFromTiledObject(element, items);
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
        var sprite = group.create(element.x, element.y, 'barrel');


        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key) {
            sprite[key] = element.properties[key];
        });
    },
};
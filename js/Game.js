var TopDownGame = TopDownGame || {};
var player;
var flag;
//title screen
TopDownGame.Game = function() {};

TopDownGame.Game.prototype = {
    create: function() {
        this.map = this.game.add.tilemap('level1');

        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('tiles', 'gameTiles');

        //create layer
        this.backgroundLayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');

        //create player
        var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
        player = this.game.add.sprite(result[0].x, result[0].y, 'pegman');
        player.scale.setTo(0.5, 0.5);
        player.anchor.setTo(1, 1);

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
        player.animations.add('STAND', [14], fps, /*loop*/ false);
        player.animations.add('HIT', [10, 11, 12, 13, 14], fps, /*loop*/ false);

        player.animations.play('STAND');

        Pegman.init(player, {
            x: 0,
            y: 0
        }); // temporarily. need to rethink

        this.upperLayer = this.map.createLayer('upperLayer');



        this.game.physics.arcade.enable(player);
        player.body.setSize(150, 37, 20, 190);
        //collision on blockedLayer
        
        this.map.setTileIndexCallback([...Array(500).keys()], this.hitWall, this, this.blockedLayer);
//this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');
        //resizes the game world to match the layer dimensions
        this.blockedLayer.resizeWorld();

        this.createItems();
        this.createDoors();



        //the camera will follow the player in the world
        //this.game.camera.follow(player);

        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();

    },
    createItems: function() {
        //create items
        this.items = this.game.add.group();
        this.items.enableBody = true;
        var item;
        result = this.findObjectsByType('item', this.map, 'objectsLayer');
        result.forEach(function(element) {
            this.createFromTiledObject(element, this.items);
        }, this);
    },
    createDoors: function() {
        //create doors
        this.doors = this.game.add.group();
        this.doors.enableBody = true;
        result = this.findObjectsByType('door', this.map, 'objectsLayer');

        result.forEach(function(element) {
            this.createFromTiledObject(element, this.doors);
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
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key) {
            sprite[key] = element.properties[key];
        });
    },
    update: function() {
        //collision
        this.game.physics.arcade.collide(player, this.blockedLayer);
        this.game.physics.arcade.overlap(player, this.items, this.collect, null, this);
        this.game.physics.arcade.overlap(player, this.doors, this.enterDoor, null, this);

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
this.game.debug.body(player);
    },
    collect: function(player, collectable) {
        console.log('yummy!');

        //remove sprite
        collectable.destroy();
    },
    enterDoor: function(player, door) {
        console.log('entering door that will take you to ' + door.targetTilemap + ' on x:' + door.targetX + ' and y:' + door.targetY);
    },
    render: function() {
        //this.game.debug.spriteBounds(player);
        //        

    },
    hitWall: function() {

        if (!flag) {
            flag = true;
            player.animations.play('HIT');
                  console.log("hit event");

            if (Pegman.tween) {
                Pegman.tween.stop();
            }
        }
    }
};
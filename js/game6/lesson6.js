var TopDownGame = TopDownGame || {};


var player;
var explosion;
var cp;
var flag = false;
var hitflag = false;
var scene;
var map;
var drawLayer;
var showflag = true;
var batteries;
//var data;
var capacity = 100;
var maxcaps2 = 100;
var myHealthBar;
var velocity = 400;
var sinkflag = false;
var text;

var ccellx, xcelly;

var lastSuccessfullPosition = {
    x: null,
    y: null
};
var dlastSuccessfullPosition = {
    x: null,
    y: null
};
var timeSinceLastIncrement = 0;
//title screen
TopDownGame.lesson6 = function () { };
TopDownGame.lesson6.prototype = {
    create: function () {
        if (scene === undefined || scene === null) {
            Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
            scene = "610";
        }
        player = this.game.add.sprite(0, 0, 'pegman');
        loadmap("lesson" + scene.substring(0, 2));
        player.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.enable = false;
        player.body.setSize(60, 13, 40, 73);
        flour.resizeWorld();

        pointer = this.game.add.sprite(0, 0, 'pointer');
        pointer.scale.setTo(0.8, 0.8);
        pointer.animations.add('ANIM', [0, 1], 2, /*loop*/ true);

        pointer.animations.play('ANIM');

        this.game.physics.arcade.enable(pointer);
        pointer.anchor.setTo(0.5, 0.5);
        pointer.body.setSize(10, 65, 48, 10);
        load_scene(scene);

        this.createItems();

        Pegman.init(player);

        builddust = this.game.add.sprite(0, 0, 'build');
        builddust.visible = false;
        builddust.animations.add('BUILD', [0, 1, 2, 3, 4, 5], 20, false);
        //bullets

        //explosion
        explosion = this.game.add.sprite(0, 0, 'explosion');
        explosion.visible = false;
        explanim = explosion.animations.add('EXPL', [0, 1, 2, 3, 4, 5], 20, /*loop*/ false);
        explanim.onComplete.add(this.animationStopped, this);

        this.game.world.bringToTop(pointer);
        this.game.world.bringToTop(explosion);
        this.game.world.bringToTop(player);

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


        //menu
        inventory = this.game.add.sprite(600, 30, 'battery');
        inventory.fixedToCamera = true;
        text = this.game.add.text(690, 65, 'x 7');
        text.fixedToCamera = true;

        //	Center align
        text.anchor.set(0.5);
        text.align = 'center';

        //	Font style
        text.font = 'Arial Black';
        text.fontSize = 30;
        text.fontWeight = 'bold';

        //	Stroke color and thickness
        text.stroke = '#000000';
        text.strokeThickness = 6;
        text.fill = '#43d637';
        //menu

        //the camera will follow the player in the world
        //this.game.camera.follow(player);
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        map.setTileIndexCallback([...Array(500).keys()], sinkInWater, this, sinkLayer);
        map.setTileIndexCallback(235, sinkInWater, this, flour);
        map.setTileIndexCallback([...Array(500).keys()], hitEvent, this, blockLayer);
        TopDownGame.game.camera.flash(0x000000, 500);
        h = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
        h.onDown.add(this.h_down, this);
        h.onUp.add(this.h_up, this);
        j = this.game.input.keyboard.addKey(Phaser.Keyboard.J);
        j.onDown.add(this.j_down, this);
        j.onUp.add(this.j_up, this);
        k = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
        k.onDown.add(this.k_down, this);
        k.onUp.add(this.k_up, this);
        l = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
        l.onDown.add(this.l_down, this);
        l.onUp.add(this.l_up, this);

    },
    animationStopped: function (sprite, animation) {
        explosion.visible = false;
    },
    h_down: function () {
        player.body.velocity.x = -1 * velocity;
    },
    h_up: function () {
        player.body.velocity.x = 0;
    },
    j_down: function () {
        player.body.velocity.y = -1 * velocity;
    },
    j_up: function () {
        player.body.velocity.y = 0;
    },
    k_down: function () {
        player.body.velocity.y = velocity;
    },
    k_up: function () {
        player.body.velocity.y = 0;
    },
    l_down: function () {
        player.body.velocity.x = velocity;
    },
    l_up: function () {
        player.body.velocity.x = 0;
    },

    update: function () {
        text.text = 'x ' + batteries.countLiving();

        this.game.physics.arcade.collide(player, sinkLayer);
        this.game.physics.arcade.collide(player, flour);
        this.game.physics.arcade.collide(player, blockLayer);

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
    // render: function () {
    //     this.game.debug.bodyInfo(player, 32, 32);
    //     this.game.debug.body(player);
    // },
    createItems: function () {
        //create items
        batteries = this.game.add.group();
        batteries.enableBody = true;
        result = this.findObjectsByType('battery', map, 'objectLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, batteries);
        }, this);
    },
    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
    findObjectsByType: function (type, map, layer) {
        var result = new Array();
        var elemid;
        map.objects[layer].forEach(function (element) {
            var i;

            for (i = 0; i < element.properties.length; i++) {
                if (element.properties[i].value === type) {
                    elemid = i;
                    element.y -= map.tileHeight;
                    result.push(element);
                }
            }
        });

        return result;
    },
    //create a sprite from an object
    createFromTiledObject: function (element, group) {
        var sprite = group.create(element.x, element.y, 'totalsheet', 176);
        //copy all properties to the sprite
        element.properties.forEach(function (element) {
            sprite[element.name] = element.value;
        });
        sprite.health = 100;
        sprite.body.immovable = true;
        //sprite.scale.set(2 , 2 );

    },

};

function hitEvent() {
    if (!hitflag) {
        console.log("hit");
        player.body.enable = false;
        Pegman.pegmanActions = [];
        if (Pegman.tween) {
            Pegman.tween.stop();
        }
        player.animations.play('HIT');
        hitflag = true;
    }
};

function sinkInWater() {

    if (sinkflag == false) {
        player.body.enable = false;
        sinkflag = true;
        var step = Maze.getStepInDirection[Maze.directionToString(Pegman.direction)];
        //убейте меня!
        if (Pegman.direction === Maze.DirectionType.NORTH) {
            coef = 2;
        } else {
            coef = 1;
        }
        Pegman.pegmanActions = [];
        if (Pegman.tween) {
            Pegman.tween.stop();
        }
        this.tween = TopDownGame.game.add.tween(player).to({
            x: player.x + step[0] * Maze.SQUARE_SIZE,
            y: player.y + step[1] * Maze.SQUARE_SIZE / coef,
        }, 500, Phaser.Easing.Linear.In, true);
        this.tween.onComplete.addOnce(function () {
            player.animations.play("STAND");
            this.tween = TopDownGame.game.add.tween(player.scale).to({
                x: 0.1,
                y: 0.1
            }, 1000, Phaser.Easing.Linear.None, true);
            this.tween.onComplete.addOnce(function () {
                player.visible = false;
            }, this);
        }, this);
    }
};


function findObjectsByType(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function (element) {

        if (element.properties[0].value === type) {
            //Phaser uses top left, Tiled bottom left so we have to adjust
            //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
            //so they might not be placed in the exact position as in Tiled
            element.y -= map.tileHeight;
            result.push(element);
        }
    });

    return result;
}

function createFromTiledObject2(element, group) {
    var sprite = group.create(element.x, element.y, 'totalsheet', 234);
    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function (key) {
        sprite[key] = element.properties[key];
    });
    sprite.health = 100;
    sprite.body.immovable = true;
    //sprite.scale.set(2 , 2 );
    if (sprite["sprite"] === "needToHit") {
        sprite.frame = 195;
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}








function load_scene(scene) {
    if (scene == "610") {
        try { player.body.enable = false; } catch (e) { }
        var result = findObjectsByType('playerStartPosition', map, 'playerLayer');
        lastSuccessfullPosition.x = result[0].x;
        lastSuccessfullPosition.y = result[0].y;
    }



    // player.x = lastSuccessfullPosition.x;
    // player.y = lastSuccessfullPosition.y;
    try { Pegman.reset2() } catch (e) { }
}


function loadmap(name) {
    try { player.body.enable = false; } catch (e) { }

    TopDownGame.game.camera.flash(0x000000, 1000);

    try {
        map.destroy();
        flour.destroy();
        onFlour.destroy();
        blockLayer.destroy();
        onBlockLayer.destroy();
        sinkLayer.destroy();
        upperLayer.destroy();


    } catch (e) { }


    map = TopDownGame.game.add.tilemap(name); //add tileset image     
    map.addTilesetImage('tileSheetWinter', 'gameTiles');
    flour = map.createLayer('flour');
    onFlour = map.createLayer('onFlour');
    sinkLayer = map.createLayer('sinkLayer');
    blockLayer = map.createLayer('blockLayer');
    onBlockLayer = map.createLayer('onBlockLayer');



    sinkLayer = map.createLayer('sinkLayer');
    map.setTileIndexCallback([...Array(500).keys()], sinkInWater, this, sinkLayer);
    map.setTileIndexCallback([...Array(500).keys()], hitEvent, this, blockLayer);

    upperLayer = map.createLayer('upperLayer');






    try {
        TopDownGame.game.world.bringToTop(pointer);
        TopDownGame.game.world.bringToTop(explosion);
        TopDownGame.game.world.bringToTop(player);
    } catch (e) { }

}
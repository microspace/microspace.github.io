var TopDownGame = TopDownGame || {};
var player;
var map;
var sinkLayer;
var blockLayer;
var flour;
var sinkLayer;
var screenGroup;
var xyqueue = getArrayWithLimitedLength(10);
var lastSuccessfullPosition = {}; //хранит положение какое было у спрайта когда он в последний раз соверлаппился с целью
//title screen
var flag;
var scaledflag = false;
TopDownGame.Lesson0 = function () { };
TopDownGame.Lesson0.prototype = {
    create: function () {
        this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);
        this.game.kineticScrolling.configure({
            kineticMovement: true,
            timeConstantScroll: 325, //really mimic iOS
            horizontalScroll: true,
            verticalScroll: true,
            horizontalWheel: false,
            verticalWheel: false,
            deltaWheel: 40,
            onUpdate: null //A function to get the delta values if it's required (deltaX, deltaY)
        });

        this.game.kineticScrolling.start();
        this.game.scale.onSizeChange.add(this.onSizeChange, this);

        map = this.game.add.tilemap('lesson0');
        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        map.addTilesetImage('tileSheet04-01', 'gameTiles');
        //create layer
        flour = map.createLayer('flour');
        blockLayer = map.createLayer('blockLayer');

        this.onFlour = map.createLayer('onFlour');
        sinkLayer = map.createLayer('sinkLayer');
        this.onBlockLayer = map.createLayer('onBlockLayer');
        //create player
        // load all data from map json, populate the structure.
        this.loadSceneData();

        if (jQuery.isEmptyObject(lastSuccessfullPosition)) {
            if (scene === undefined || scene === null) {
                scene = 0
            }
        }

        if (scene == 3) {
            var result = findObjectsByType('scene3Goal', map, 'playerLayer');

            lastSuccessfullPosition = {
                x: result[0].x,
                y: result[0].y - 15
            };
        } else {
            var result = findObjectsByType('playerStartPosition', map, 'playerLayer');
            lastSuccessfullPosition = {
                x: result[0].x,
                y: result[0].y
            };
        }
        var result = findObjectsByType('goldenKey', map, 'objectLayer');
        goldenKey = this.game.add.sprite(result[0].x + 16, result[0].y - 16, 'goldenKey');
        goldenKey.animations.add('SHADOW', [1], 2, /*loop*/ false);
        goldenKey.animations.add('NOSHADOW', [0], 2, /*loop*/ false);
        goldenKey.animations.play('SHADOW');
        goldenKey.realX = goldenKey.x;
        goldenKey.realY = goldenKey.y;
        this.game.physics.arcade.enable(goldenKey);
        goldenKey.body.setSize(30, 30, 0, 32);

        // totalsheet
        //var result = this.findObjectsByType('playerStartPosition', map, 'playerLayer');


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


        this.game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.enable = false;
        this.game.physics.arcade.enable(pointer);
        player.body.setSize(50, 13, 40, 73);
        pointer.body.setSize(10, 65, 48, 10);
        //collision on blockedLayer

        map.setTileIndexCallback([15, 16, 17, 18, 28, 29, 30, 31, 32, 35, 36, 37, 169, 231, 209, 210, 222, 223], this.hitWall, this, blockLayer);
        map.setTileIndexCallback(229, this.restoreBridge, this, flour);
        // /* S */map.setTileLocationCallback(2, 0, 1, 1, this.hitCoin, this);
        map.setTileIndexCallback([...Array(500).keys()], this.sinkInWater, this, sinkLayer);
        //map.setTileIndexCallback([17, 18, 30, 31], this.hitWall, this, blockLayer);
        //map.setCollisionBetween(1, 2000, true, 'blockLayer');
        //resizes the game world to match the layer dimensions
        blockLayer.resizeWorld();
        Pegman.init(player);
        this.upperLayer = map.createLayer('upperLayer');





        //the camera will follow the player in the world
        this.game.camera.follow(player);
        this.game.camera.unfollow(player);
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        //this.game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
        //blockLayer.debug = true;



    },
    onSizeChange: function () {
        // fire the game resize event for the current state (make sure each state has this)
        // this.game.state.callbackContext.resize();


        // var height = $(window).height();
        // var width = $(window).width();
        var height = document.getElementById('rightside').clientHeight;
        var width = document.getElementById('rightside').clientWidth;

        // game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'gameArea');
        // height = height / scalefactor;
        // width = width / scalefactor;


        // var height = $(window).height();
        // var width = $(window).width();
        this.game.width = width;
        this.game.height = height;

        sinkLayer.resize(width, height);
        blockLayer.resize(width, height);
        sinkLayer.resize(width, height);
        flour.resize(width, height);
        this.upperLayer.resize(width, height);

        this.game.scale.setGameSize(width, height);
        this.game.stage.getBounds.width = width;
        this.game.stage.getBounds.height = height;
        if (this.game.renderType === Phaser.WEBGL) {
            this.game.renderer.resize(width, height);
        }
        this.game.scale.refresh();

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

    },
    render: function () {
        // this.game.debug.bodyInfo(player, 32, 32);
        // this.game.debug.body(player);
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
        this.game.physics.arcade.collide(player, blockLayer);
        this.game.physics.arcade.collide(player, flour);
        this.game.physics.arcade.collide(player, sinkLayer);
        //this.game.physics.arcade.overlap(player, pointer, this.sceneCompeteHandler, null, this);
        //this.game.physics.arcade.overlap(blockLayer, weapon.bullets, this.bulletHitWall, null, this);

        this.game.physics.arcade.overlap(player, goldenKey, this.goldenKeyCallback, null, this);

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.game.camera.unfollow(player);
            this.camera.x -= 10;
        }

        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {

            this.game.camera.unfollow(player);
            this.camera.x += 10;


        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.game.camera.unfollow(player);
            this.camera.y -= 10;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.game.camera.unfollow(player);
            this.camera.y += 10;
        }





    },
    animationStopped: function () {
        explosion.visible = false;
    },
    restoreBridge: function () {
        map.removeTile(19, 7, sinkLayer);
        map.removeTile(20, 7, sinkLayer);
        map.removeTile(21, 7, sinkLayer);
        map.removeTile(19, 8, sinkLayer);
        map.removeTile(20, 8, sinkLayer);
        map.removeTile(21, 8, sinkLayer);
        map.removeTile(19, 9, sinkLayer);
        map.removeTile(20, 9, sinkLayer);
        map.removeTile(21, 9, sinkLayer);

        map.putTile(107, 19, 7, flour);
        map.putTile(107, 20, 7, flour);
        map.putTile(107, 21, 7, flour);
        map.putTile(107, 19, 8, flour);
        map.putTile(107, 20, 8, flour);
        map.putTile(107, 21, 8, flour);
        map.putTile(107, 19, 9, flour);
        map.putTile(107, 20, 9, flour);
        map.putTile(107, 21, 9, flour);

        map.replace(229, 228, 21, 2, 1, 1, flour);

    },
    mouseWheel: function (event) {

        scalefactor += event.deltaY / 1000;
        if (scalefactor < 0.2) {
            scalefactor = 0.2;
        }
        sinkLayer.scale.set(scalefactor);
        blockLayer.scale.set(scalefactor);
        sinkLayer.scale.set(scalefactor);
        flour.scale.set(scalefactor);
        //  this.upperLayer.scale.set(scalefactor);
        //  this.onFlour.scale.set(scalefactor);
        //  this.onBlockLayer.scale.set(scalefactor);

        player.scale.setTo(scalefactor, scalefactor);
        var height = document.getElementById('rightside').clientHeight;
        var width = document.getElementById('rightside').clientWidth;
        height = height / scalefactor;
        width = width / scalefactor;
        TopDownGame.game.width = width;
        TopDownGame.game.height = height;
        sinkLayer.resize(width, height);
        blockLayer.resize(width, height);
        sinkLayer.resize(width, height);
        flour.resize(width, height);
        //  this.upperLayer.resize(width, height);
        //  this.onFlour.resize(width, height);
        //  this.onBlockLayer.resize(width, height);

        TopDownGame.game.scale.setGameSize(width, height);

        TopDownGame.game.scale.refresh();

        var result = findObjectsByType('playerStartPosition', map, 'playerLayer');
        lastSuccessfullPosition = {
            x: result[0].x * scalefactor,
            y: result[0].y * scalefactor
        };
        player.x = lastSuccessfullPosition.x;
        player.y = lastSuccessfullPosition.y;

        Pegman.posX = player.x;
        Pegman.posY = player.y;


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

    goldenKeyCallback: function () {
        
        if (!flag) {
            //goldenKey.visible = false;
            //goldenKey.body.enable = false;
            goldenKey.animations.play('NOSHADOW');
            player.addChild(goldenKey);
            goldenKey.x = -40;
            goldenKey.y = -100;
            Pegman.hasGoldenKey = true;
        }
    },
    sinkInWater: function () {
        console.log("sink");
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
        result = findObjectsByType('barrel', map, 'objectLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, barrels);
        }, this);
    },
    loadSceneData: function () {
        /*          var result = this.findObjectsByType('playerStartPosition', map, 'playerLayer');
                Maze.scenes[0].startPos[0] = result[0].x;
                Maze.scenes[0].startPos[1] = result[0].y;  */
        var result = findObjectsByType('scene1Goal', map, 'playerLayer');
        Maze.scenes[0].endPos[0] = result[0].x;
        Maze.scenes[0].endPos[1] = result[0].y;

        var result = findObjectsByType('scene2Goal', map, 'playerLayer');
        Maze.scenes[1].startPos[0] = Maze.scenes[0].endPos[0];
        Maze.scenes[1].startPos[1] = Maze.scenes[0].endPos[1];
        Maze.scenes[1].endPos[0] = result[0].x;
        Maze.scenes[1].endPos[1] = result[0].y;

        var result = findObjectsByType('scene3Goal', map, 'playerLayer');
        Maze.scenes[2].startPos[0] = Maze.scenes[1].endPos[0];
        Maze.scenes[2].startPos[1] = Maze.scenes[1].endPos[1];
        Maze.scenes[2].endPos[0] = result[0].x;
        Maze.scenes[2].endPos[1] = result[0].y;

        var result = findObjectsByType('scene4Goal', map, 'playerLayer');
        Maze.scenes[3].startPos[0] = Maze.scenes[2].endPos[0];
        Maze.scenes[3].startPos[1] = Maze.scenes[2].endPos[1];
        Maze.scenes[3].endPos[0] = result[0].x;
        Maze.scenes[3].endPos[1] = result[0].y;

        var result = findObjectsByType('scene5Goal', map, 'playerLayer');
        Maze.scenes[4].startPos[0] = Maze.scenes[3].endPos[0];
        Maze.scenes[4].startPos[1] = Maze.scenes[3].endPos[1];
        Maze.scenes[4].endPos[0] = result[0].x;
        Maze.scenes[4].endPos[1] = result[0].y;
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
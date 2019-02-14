var TopDownGame = TopDownGame || {};
var player;
var map;
var sinkLayer;
var blockLayer;
var flour;
var sinkLayer;
var screenGroup;
var lastSuccessfullPosition = {};
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
        // player = this.game.add.sprite(64 * 5 + 20, 64 * 5 - 31, 'pegman');
        player = this.game.add.sprite(0, 0, 'pegman');
        var fps = 7;
        player.animations.add('STAND', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], fps, /*loop*/ true);
        player.animations.play('STAND');
        this.game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.enable = false;

        // player.body.setSize(50, 13, 40, 73);

        //collision on blockedLayer

        blockLayer.resizeWorld();

        this.upperLayer = map.createLayer('upperLayer');

        //this.game.camera.follow(player);
        // the big map to scroll
        var result = findObjectsByType('playerStartPosition', map, 'playerLayer');
        lastSuccessfullPosition = {
            x: result[0].x * scalefactor,
            y: result[0].y * scalefactor
        };


        this.game.physics.arcade.enable(player);
        Pegman.init(player);
        player.body.setSize(50, 13, 40, 73);
        player.anchor.setTo(0.5, 0.5);

        this.onSizeChange();



        screenGroup = this.game.add.group();
        screenGroup.add(player);
        subsKey = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_SUBTRACT);

        this.game.input.mouse.mouseWheelCallback = this.mouseWheel;



    },
    onSizeChange: function () {
        // fire the game resize event for the current state (make sure each state has this)
        // this.game.state.callbackContext.resize();


        // var height = $(window).height();
        // var width = $(window).width();
        var height = document.getElementById('rightside').clientHeight;
        var width = document.getElementById('rightside').clientWidth;

        // game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'gameArea');
        height = height / scalefactor;
        width = width / scalefactor;


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



    },
    render: function () {
        // this.game.debug.bodyInfo(player, 32, 32);
        // this.game.debug.body(player);
    },
    update: function () {

    

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
};



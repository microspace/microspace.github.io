var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function () { };

TopDownGame.Preload.prototype = {
    preload: function () {
        //show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        //load game assets
        this.load.tilemap('lesson0', 'assets/maps/game0/lesson0.json', null, Phaser.Tilemap.TILED_JSON);


        this.game.time.advancedTiming = true;
        this.load.spritesheet('totalsheet', 'assets/maps/game0/tileSheets16-01-19.png', 64, 64);
        this.load.spritesheet('pegman', 'assets/sprites/player.png', 141, 100);
        this.load.spritesheet('explosion', 'assets/sprites/explosion.png', 99, 87);
        this.load.spritesheet("pointer", "assets/sprites/pointer.png", 80, 58);
        this.load.spritesheet("goldenKey", "assets/sprites/goldenKey.png", 64, 64);


        this.load.image('bullet', 'assets/images/bullet2.png');
        this.load.image('gameTiles', 'assets/maps/game0/tileSheets16-01-19.png');
        this.load.image('coordinateplane', 'assets/images/coordinatePlane.png');

    },
    create: function () {
        this.state.start('lesson_test');
    }
};
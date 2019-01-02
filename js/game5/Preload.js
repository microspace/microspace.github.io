var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function() {};

TopDownGame.Preload.prototype = {
    preload: function() {
        //show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);
        this.game.plugins.add(ParticleEditorPlugin);

        //this.game.load.json('data', 'assets/Particles.json');

        //load game assets
        this.load.tilemap('lesson51', 'assets/maps/game5/5 игра 1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('lesson52', 'assets/maps/game5/5 игра 2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('lesson53', 'assets/maps/game5/5 игра 3.json', null, Phaser.Tilemap.TILED_JSON);
        
        this.load.spritesheet('totalsheet', 'assets/maps/game5/tileSheetWinter30-12.png', 64, 64);

        this.load.spritesheet('pegman', 'assets/sprites/player.png', 141, 100);
        this.load.spritesheet('explosion', 'assets/sprites/explosion.png', 99, 87);
        this.load.spritesheet("pointer", "assets/sprites/pointer.png", 107, 77);
        this.load.spritesheet("build", "assets/sprites/buildAnimation.png", 100, 100);
        
        this.load.image('bullet', 'assets/images/bullet2.png');
        this.load.image('gameTiles', 'assets/maps/game5/tileSheetWinter30-12.png');
        this.load.image('coordinateplane', 'assets/images/coordinatePlane.png');
        this.load.image('water', 'assets/images/water.png');

    },
    create: function() {
        this.state.start('lesson5');
    }
};
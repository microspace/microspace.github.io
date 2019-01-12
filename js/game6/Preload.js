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
        this.load.tilemap('lesson61', 'assets/maps/game6/6 игра 1.json', null, Phaser.Tilemap.TILED_JSON);


        this.load.spritesheet('totalsheet', 'assets/maps/game6/tileSheetWinter30-12.png', 64, 64);

        this.load.spritesheet('pegman', 'assets/sprites/player.png', 141, 100);
        this.load.spritesheet('explosion', 'assets/sprites/explosion.png', 99, 87);
        this.load.spritesheet("pointer", "assets/sprites/pointer.png", 80, 58);
        this.load.spritesheet("build", "assets/sprites/buildAnimation.png", 100, 100);

        this.load.image('bullet', 'assets/images/bullet2.png');
        this.load.image('gameTiles', 'assets/maps/game6/tileSheetWinter30-12.png');
        this.load.image('coordinateplane', 'assets/images/coordinatePlane.png');
        this.load.image('water', 'assets/images/water.png');
        this.load.image('battery', 'assets/images/battery.png');

    },
    create: function() {

        //  

        try {
            loadWorkspace('lesson6');
        } catch {
            console.log("fallback - no server");
            this.state.start('lesson6');
        }
    }
};
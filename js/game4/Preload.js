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
        this.load.tilemap('lesson41', 'assets/maps/game4/4 игра 1-5.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('lesson42', 'assets/maps/game4/4 игра 6.json', null, Phaser.Tilemap.TILED_JSON);
        
        this.load.spritesheet('totalsheet', 'assets/maps/game4/tileSheetWinter03-11.png', 64, 64);

        this.load.spritesheet('pegman', 'assets/sprites/player.png', 141, 100);
        this.load.spritesheet('explosion', 'assets/sprites/explosion.png', 99, 87);
        this.load.spritesheet("pointer", "assets/sprites/pointer.png", 80, 58);

        this.load.image('bullet', 'assets/images/bullet2.png');
        this.load.image('gameTiles', 'assets/maps/game4/tileSheetWinter03-11.png');
        this.load.image('coordinateplane', 'assets/images/coordinatePlane.png');

        this.load.audio('shot', 'assets/sounds/shot.mp3');
        this.load.audio('explosion', 'assets/sounds/explosion.mp3');
        this.load.audio('hitwall', 'assets/sounds/hitwall.mp3');
        this.load.audio('bubble', 'assets/sounds/bubble.mp3');
        this.load.audio('keypickup', 'assets/sounds/keypickup.mp3');
        this.load.audio('click', 'assets/sounds/click.mp3');
        this.load.audio('success', 'assets/sounds/success.mp3');
    },
    create: function() {
        // 
        
        try {
            loadWorkspace('lesson4');
        } catch (e) {
            console.log("fallback - no server");
            this.state.start('lesson4');
        }
    }
};




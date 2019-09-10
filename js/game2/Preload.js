var scene;
var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function() {};

TopDownGame.Preload.prototype = {
    preload: function() {
        //show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        //load game assets
        this.load.tilemap('lesson21', 'assets/maps/game2/2 игра 1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('lesson22', 'assets/maps/game2/2 игра 2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('lesson23', 'assets/maps/game2/2 игра 3.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('lesson24', 'assets/maps/game2/2 игра 4.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('lesson25', 'assets/maps/game2/2 игра 5.json', null, Phaser.Tilemap.TILED_JSON);

        
        this.load.spritesheet('totalsheet', 'assets/maps/tileSheet2.png', 64, 64);
        this.load.spritesheet('pegman', 'assets/sprites/player.png', 141, 100);
        this.load.spritesheet('explosion', 'assets/sprites/explosion.png', 99, 87);
        this.load.spritesheet("pointer", "assets/sprites/pointer.png", 80, 58);

        this.load.image('bullet', 'assets/images/bullet2.png');
        this.load.image('gameTiles', 'assets/maps/tileSheet2.png');
        this.load.image('coordinateplane', 'assets/images/coordinatePlane.png');

    },
    create: function() {

        
        try {
            loadWorkspace('lesson2');
        } catch (e) {
            console.log("fallback - no server");
            scene = 1;
            this.state.start('lesson2' + scene);
        }
    }
};
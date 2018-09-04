var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.tilemap('level1', 'assets/maps/lesson11/leson1-1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/maps/lesson11/tileSheet04-01.png');
    this.load.spritesheet('bullet', 'assets/sprites/bullet2.png', 20, 9);
    this.load.spritesheet('barrel', 'assets/sprites/barrels64.png', 64, 64);
    this.load.spritesheet('pegman', 'assets/sprites/player.png', 512, 363);
    this.load.spritesheet('explosion', 'assets/sprites/explosion.png', 99, 87);
    
  },
  create: function() {
    this.state.start('Game');
  }
};
var TopDownGame = TopDownGame || {};

TopDownGame.Boot = function () { };

//setting game configuration and loading the assets for the loading screen
TopDownGame.Boot.prototype = {
  preload: function () {
    //assets we'll use in the loading screen
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  },
  create: function () {
    //loading screen will have a white background
    this.game.stage.backgroundColor = '#000';


   // this.game.world.scale.setTo(scalefactor, scalefactor);
    
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    
    this.scale.refresh(); 


    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state.start('Preload');
  }
};

 import makeAnimations from '../helpers/animations';

 class BootScene extends Phaser.Scene {
     constructor(test) {
         super({
             key: 'BootScene'
         });
     }
     preload() {
         const progress = this.add.graphics();

         // Register a load progress event to show a load bar
         this.load.on('progress', (value) => {
             progress.clear();
             progress.fillStyle(0xffffff, 1);
             progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
         });

         // Register a load complete event to launch the title screen when all files are loaded
         this.load.on('complete', () => {
             // prepare all animations, defined in a separate file
             makeAnimations(this);
             progress.destroy();
             this.scene.start('GameScene');
         });


         this.load.image('tiles', 'assets/images/tileSheets16-01-19.png');

         this.load.image("bullet", "assets/images/bullet.png");

         this.load.tilemapTiledJSON('map', 'assets/tilemaps/lesson0.json');


         this.load.spritesheet('player', 'assets/images/player.png', {
             frameWidth: 141,
             frameHeight: 100
         });
         this.load.spritesheet('pointer', 'assets/images/pointer.png', {
            frameWidth: 80,
            frameHeight: 58
        });

         this.load.atlas('explosion', 'assets/particles/explosion.png', 'assets/particles/explosion.json');
         
         this.load.spritesheet("goldenKey", "assets/images/goldenKey.png", {
            frameWidth: 64,
            frameHeight: 64
        });
     }
 }

 export default BootScene;

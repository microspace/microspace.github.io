'use strict';
var TopDownGame = TopDownGame || {};


TopDownGame.game = new Phaser.Game(600, 400, Phaser.AUTO, 'canvasContainer', null, false, true);

TopDownGame.game.state.add('Boot', TopDownGame.Boot);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('lesson0', TopDownGame.Lesson0);
TopDownGame.game.state.start('Boot');



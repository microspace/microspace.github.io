'use strict';
var TopDownGame = TopDownGame || {};

const thisDeviceOS = platform.os.family;
let renderEngine = Phaser.AUTO;
if (thisDeviceOS == "Android" || thisDeviceOS == "iOS") {
    renderEngine = Phaser.CANVAS;
} 
TopDownGame.game = new Phaser.Game(400, 400, renderEngine, 'canvasContainer', null, false, true);

TopDownGame.game.state.add('Boot', TopDownGame.Boot);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('lesson_test', TopDownGame.Lesson0);
TopDownGame.game.state.start('Boot');



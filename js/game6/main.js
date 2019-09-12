'use strict';

var TopDownGame = TopDownGame || {};
$(window).resize(function() {
    window.resizeGame();
});

const thisDeviceOS = platform.os.family;
let renderEngine = Phaser.AUTO;
if (thisDeviceOS == "Android" || thisDeviceOS == "iOS") {
    renderEngine = Phaser.CANVAS;
} 
TopDownGame.game = new Phaser.Game($(window).width(), $(window).height(), renderEngine, 'canvasContainer', null, false, true);
TopDownGame.game.state.add('Boot', TopDownGame.Boot);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('lesson6', TopDownGame.lesson6);
TopDownGame.game.state.start('Boot');

function resizeGame() {
    var height = $(window).height();
    var width = $(window).width();
    TopDownGame.game.width = width;
    TopDownGame.game.height = height;
    TopDownGame.game.stage.getBounds.width = width;
    TopDownGame.game.stage.getBounds.height = height;
    if (TopDownGame.game.renderType === Phaser.WEBGL) {
        TopDownGame.game.renderer.resize(width, height);
    }
}

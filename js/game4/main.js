'use strict';

var TopDownGame = TopDownGame || {};
$(window).resize(function() {
    window.resizeGame();
});

TopDownGame.game = new Phaser.Game($(window).width(), $(window).height(), Phaser.CANVAS, 'canvasContainer', null, false, true);
TopDownGame.game.state.add('Boot', TopDownGame.Boot);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('lesson4', TopDownGame.Lesson4);
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


var init = function() {
    $("#nextButton").hide();
};



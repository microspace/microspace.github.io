'use strict';

var TopDownGame = TopDownGame || {};
$(window).resize(function() {
    window.resizeGame();
});

TopDownGame.game = new Phaser.Game($(window).width(), $(window).height(), Phaser.AUTO, 'canvasContainer', null, false, true);
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


/* var init = function() {
    Maze.bindClick('runButton', runProgram);
    Maze.bindClick('resetButton', resetProgram);
    $("#nextButton").hide();
}; */



/* var runProgram = function() {

    //var statements_stack = Blockly.JavaScript.statementToCode(Blockly.Blocks['factory_base'], 'STACK');
    TopDownGame.game.stage.updateTransform();
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    //console.log(code);
    Pegman.vdposX = Pegman.dposX;
    Pegman.vdposY = Pegman.dposY;
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
    TopDownGame.game.stage.updateTransform();
    Pegman.play();
    TopDownGame.game.stage.updateTransform();
    TopDownGame.game.camera.follow(player);
};

var resetProgram = function() {

    try {
        weapon.fireAngle = Phaser.ANGLE_RIGHT;
    } catch (e) {

    }
    TopDownGame.game.stage.updateTransform();
    Pegman.reset2();
    TopDownGame.game.stage.updateTransform();
} */
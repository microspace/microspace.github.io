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
    Maze.bindClick('runButton', runProgram);
    Maze.bindClick('resetButton', resetProgram);
    $("#nextButton").hide();
};



var runProgram = function() {
    var runButton = document.getElementById('runButton');
    var resetButton = document.getElementById('resetButton');
    // Ensure that Reset button is at least as wide as Run button.
    if (!resetButton.style.minWidth) {
        resetButton.style.minWidth = runButton.offsetWidth + 'px';
    }
    runButton.style.display = 'none';
    resetButton.style.display = 'inline';
    // Prevent double-clicks or double-taps.
    resetButton.disabled = false;
    //var statements_stack = Blockly.JavaScript.statementToCode(Blockly.Blocks['factory_base'], 'STACK');
    TopDownGame.game.stage.updateTransform();
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
    TopDownGame.game.stage.updateTransform();
    Pegman.play();
    TopDownGame.game.stage.updateTransform();
};

var resetProgram = function() {
    var runButton = document.getElementById('runButton');
    runButton.style.display = 'inline';
    document.getElementById('resetButton').style.display = 'none';
    // Prevent double-clicks or double-taps.
    runButton.disabled = false;
    try {
        weapon.fireAngle = Phaser.ANGLE_RIGHT;
    } catch {

    }
    TopDownGame.game.stage.updateTransform();
    Pegman.reset2();
    TopDownGame.game.stage.updateTransform();
}
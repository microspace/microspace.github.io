'use strict';

var TopDownGame = TopDownGame || {};
TopDownGame.game = new Phaser.Game(1400, 600, Phaser.AUTO, 'canvasContainer', null, false, true);
TopDownGame.game.state.add('Boot', TopDownGame.Boot);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('Game', TopDownGame.Game);
TopDownGame.game.state.start('Boot');


var init = function(){
	Maze.bindClick('runButton', runProgram);
	Maze.bindClick('resetButton', resetProgram);

	//initDemo();
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
	

    var code = Blockly.JavaScript.workspaceToCode(workspace);

    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
	Pegman.play();
};

var resetProgram = function() {
	var runButton = document.getElementById('runButton');
	runButton.style.display = 'inline';
	document.getElementById('resetButton').style.display = 'none';
	// Prevent double-clicks or double-taps.
	runButton.disabled = false;
	
	Pegman.reset();
	


	//sprite.health = 1;
}

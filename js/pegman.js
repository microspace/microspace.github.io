
'use strict';

var Pegman = {
	posX: 0,
	posY: 0,
	direction: Maze.DirectionType.EAST,
	pegmanActions: [],

	pegmanSprite: null,
	anim: null,
	tween: null,

	init: function(pegmanSprite, coords){
		this.posX = coords.x;
		this.posY = coords.y;
		this.pegmanSprite = pegmanSprite;

		this.reset();
	},

	reset: function() {
		this.preReset();
		this.tween = null;
		this.anim = null;

		this.posX = Maze.start_.x;
		this.posY = Maze.start_.y;
		this.direction = Maze.DirectionType.EAST;
		this.pegmanActions = [];
		this.postReset();
	},

	nextAction: function(action, step) {
		var actionobject = {action: action, stepcount: step};
		this.pegmanActions.push(actionobject);
	},

	play: function() {
		this.playNextAction();
	},

	playNextAction: function() {
		if (this.pegmanActions.length <= 0)
			return;

		this.finishPreviousAction();
		if (this.tween) {
			this.tween = null;
		}
		if (this.anim) {
			this.anim = null;
		}

		var actionobject = this.pegmanActions.shift();
		var action = actionobject.action;
		var stepcount = actionobject.stepcount;
		switch (action) {
            case "up":
                var step = Maze.getStepInDirection["NORTH"];
                this.moveNSWE(this.posX + step[0] * stepcount, this.posY + step[1] * stepcount, stepcount);
                break;
            case "down":
                var step = Maze.getStepInDirection["SOUTH"];
                this.moveNSWE(this.posX + step[0] * stepcount, this.posY + step[1] * stepcount, stepcount);
                break;
			case "left":
                var step = Maze.getStepInDirection["WEST"];
                //this.pegmanSprite.scale.x *= -1;
                this.moveNSWE(this.posX + step[0] * stepcount, this.posY + step[1] * stepcount, stepcount);
                break;
			case "right":
                var step = Maze.getStepInDirection["EAST"];
                this.moveNSWE(this.posX + step[0] * stepcount, this.posY + step[1] * stepcount, stepcount);
                break;
		}
	},

	turnToInternal: function(newDirection) {
		var d = Maze.directionToString(this.direction);
		this.direction = newDirection;
		d += "_" + Maze.directionToString(this.direction);
		this.turnTo(d);
	},
};




Pegman.preReset = function() {
	if (this.tween) {
		this.tween.stop();
	}
	if (this.anim) {
		this.anim.stop();
	}
};
Pegman.postReset = function() {
	this.pegmanSprite.reset(this.posX * Maze.SQUARE_SIZE, this.posY * Maze.SQUARE_SIZE);
	//this.pegmanSprite.animations.play(Maze.directionToString(this.direction));
};


Pegman.finishPreviousAction = function() {
};



Pegman.animateFailMoveBy = function(stepX, stepY) {
	var x = this.posX * Maze.SQUARE_SIZE;
	var y = this.posY * Maze.SQUARE_SIZE;
	this.tween = game.add.tween(this.pegmanSprite);
	this.tween
		.to({ x: x + stepX * 10, y: y + stepY * 10 }, 200, Phaser.Easing.Linear.None)
		.to({ x: x, y: y }, 10, Phaser.Easing.Linear.None)
		.to({ x: x + stepX * 10, y: y + stepY * 10 }, 200, Phaser.Easing.Linear.None)
		.to({ x: x, y: y }, 10, Phaser.Easing.Linear.None)
		.to({ x: x + stepX * 10, y: y + stepY * 10 }, 200, Phaser.Easing.Linear.None)
		.to({ x: x, y: y }, 10, Phaser.Easing.Linear.None)
		.start();
	}


Pegman.moveNSWE = function(x, y, stepcount = 1) {
    this.posX = x;
    this.posY = y;

    this.anim = this.pegmanSprite.animations.play("NORTH");
    this.tween = TopDownGame.game.add.tween(this.pegmanSprite);
    this.tween.to({
        x: this.posX * Maze.SQUARE_SIZE,
        y: this.posY * Maze.SQUARE_SIZE,
    }, 500 * stepcount, Phaser.Easing.Linear.In);
    this.tween.onComplete.addOnce(function() {
        //this.pegmanSprite.animations.stop(null, true);
        this.pegmanSprite.animations.play("STAND");
        this.playNextAction();
    }, this);
    this.tween.start();
},

Pegman.moveTo = function(x, y, d) {
	this.posX = x;
	this.posY = y;
    this.anim = this.pegmanSprite.animations.play(d);

	this.tween = game.add.tween(this.pegmanSprite);
	this.tween.to({
			x: this.posX * Maze.SQUARE_SIZE,
			y: this.posY * Maze.SQUARE_SIZE,
		}, 1000, Phaser.Easing.Linear.In);
	this.tween.onComplete.addOnce(function() {
        //this.pegmanSprite.animations.stop(null, true);
        this.pegmanSprite.animations.play("STAND");
		this.playNextAction();

	}, this);
	this.tween.start();
},

Pegman.turnTo = function(d) {
	this.anim = this.pegmanSprite.animations.play(d);
	this.anim.onComplete.addOnce(function() {
		this.playNextAction();
	}, this);
};

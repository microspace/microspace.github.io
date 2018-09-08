
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
		
		this.posX = Maze.start_.x;
		this.posY = Maze.start_.y;
		this.preReset();
		this.tween = null;
		this.anim = null;
		this.pegmanSprite.scale.x = 1


		this.direction = Maze.DirectionType.EAST;
		this.pegmanActions = [];
		this.postReset();

	},

	nextAction: function(action, step = 1) {

		var actionobject = {action: action, stepcount: step};
		this.pegmanActions.push(actionobject);
		//console.log(JSON.stringify(this.pegmanActions));
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
                weapon.fireAngle = Phaser.ANGLE_RIGHT;
                var step = Maze.getStepInDirection["NORTH"];
                this.moveNSWE(this.posX + step[0] * stepcount, this.posY + step[1] * stepcount, stepcount);
                break;
            case "down":
                weapon.fireAngle = Phaser.ANGLE_RIGHT;
                var step = Maze.getStepInDirection["SOUTH"];
                this.moveNSWE(this.posX + step[0] * stepcount, this.posY + step[1] * stepcount, stepcount);
                break;
			case "left":
                var step = Maze.getStepInDirection["WEST"];
                this.pegmanSprite.scale.x = -1;
                weapon.fireAngle = Phaser.ANGLE_LEFT;
                this.moveNSWE(this.posX + step[0] * stepcount, this.posY + step[1] * stepcount, stepcount);
                break;
			case "right":
                var step = Maze.getStepInDirection["EAST"];
                this.pegmanSprite.scale.x = 1;
                weapon.fireAngle = Phaser.ANGLE_RIGHT;
                this.moveNSWE(this.posX + step[0] * stepcount, this.posY + step[1] * stepcount, stepcount);
                break;
			case "fire":
			    this.Shoot();
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
	items.forEach(function (c) { c.revive(); });
	items.forEach(function (c) { c.frame = 0; c.body.enable = true;});
	//this.pegmanSprite.reset(this.posX * Maze.SQUARE_SIZE, this.posY * Maze.SQUARE_SIZE);
	this.pegmanSprite.x = this.posX * Maze.SQUARE_SIZE;
	this.pegmanSprite.y = this.posY * Maze.SQUARE_SIZE;
	flag = false;

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
        this.pegmanSprite.animations.play("STAND");
		this.playNextAction();

	}, this);
	this.tween.start();
},

Pegman.Shoot = function() {

    this.anim = this.pegmanSprite.animations.play("SHOOT");
    weapon.fire();

	this.anim.onComplete.addOnce(function() {
		player.animations.play('STAND');
		this.playNextAction();
	}, this);
},


Pegman.turnTo = function(d) {
	this.anim = this.pegmanSprite.animations.play(d);
	this.anim.onComplete.addOnce(function() {
		this.playNextAction();
	}, this);
};

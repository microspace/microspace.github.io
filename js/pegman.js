'use strict';

var Pegman = {
    posX: Maze.scenes[scene].startPos[0],
    posY: Maze.scenes[scene].startPos[1],
    direction: Maze.DirectionType.EAST,
    pegmanActions: [],

    pegmanSprite: null,
    anim: null,
    tween: null,

    init: function(pegmanSprite) {
        this.posX = Maze.scenes[scene].startPos[0];
        this.posY = Maze.scenes[scene].startPos[1];
        this.pegmanSprite = pegmanSprite;
        // сделать так чтобы это сообщение не выходило когда игрок начинает со второго уровня
        $("#modaltext").text("Приветствую тебя рекрут! Я научу тебя пользоваться твоим экзокостюмом. Для начала попробуй просто сдвинуться с места!");
        $("#exampleModal").modal();


        this.reset();
    },

    reset: function() {


        this.posX = Maze.scenes[scene].startPos[0];
        this.posY = Maze.scenes[scene].startPos[1];
        this.preReset();
        this.tween = null;
        this.anim = null;
        this.pegmanSprite.scale.x = 1
        this.pegmanActions = [];
        this.postReset();

    },

    preReset: function() {
        if (this.tween) {
            this.tween.stop();
        }
        if (this.anim) {
            this.anim.stop();
        }
    },

    postReset: function() {
        this.pegmanSprite.body.enable = false;
        //this.pegmanSprite.x = this.posX * Maze.SQUARE_SIZE;
        //this.pegmanSprite.y = this.posY * Maze.SQUARE_SIZE;
        this.pegmanSprite.x = Maze.scenes[scene].startPos[0];
        this.pegmanSprite.y = Maze.scenes[scene].startPos[1];
        pointer.x = Maze.scenes[scene].endPos[0];
        pointer.y = Maze.scenes[scene].endPos[1];
        this.pegmanSprite.body.enable = true;
        //this.pegmanSprite.reset(this.posX * Maze.SQUARE_SIZE, this.posY * Maze.SQUARE_SIZE);
        flag = false;
        barrels.forEach(function(c) {
            c.revive();
            if (c["sprite"] == "allowedToHit") {
                c.frame = 0;
            } else if (c["sprite"] == "needToHit") {
                c.frame = 4;
            } else if (c["sprite"] == "restrictedToHit") {
                c.frame = 1;
            }
            c.body.enable = true;
        });
    },

    nextAction: function(action, step = 1) {
        var actionobject = {
            action: action,
            stepcount: step
        };
        this.pegmanActions.push(actionobject);
    },

    play: function() {
        this.playNextAction();
    },

    playNextAction: function() {
        if (this.pegmanActions.length <= 0) {

            var isOverlapping = TopDownGame.game.physics.arcade.overlap(player, pointer, null, null, this);
            if (isOverlapping == true) {
                console.log("scene complete!");

                if (scene == 0) {
                    var messagetext = "Отлично получилось! Теперь попробуй дойди до конца коридора!";
                } else if (scene == 1) {
                    var messagetext = "Превосходно! Сейчас надо дойти до тех бочек!";
                } else if (scene == 2) {
                    var messagetext = "Эти бочки преградили тебе путь. Расстреляй их, чтобы пройти дальше!";
                } else if (scene == 3) {
                    //var messagetext = "А теперь нужно найти 3 бочки с мишенями и подстрелить их. Но не в коем случае не стреляй в бочки с водой!";
                    var messagetext = "А теперь нужно найти 3 бочки с мишенями и подстрелить их";
                }
                $("#modaltext").text(messagetext);
                $("#exampleModal").modal();
                scene += 1;
                this.pegmanSprite.body.enable = false;
                //this.pegmanSprite.x = this.posX * Maze.SQUARE_SIZE;
                //this.pegmanSprite.y = this.posY * Maze.SQUARE_SIZE;
                //this.pegmanSprite.x = scenes[currentScene].startPos[0];
                //this.pegmanSprite.y = scenes[currentScene].startPos[1];
                pointer.x = Maze.scenes[scene].endPos[0];
                pointer.y = Maze.scenes[scene].endPos[1];
                this.pegmanSprite.body.enable = true;
                var runButton = document.getElementById('runButton');
                runButton.style.display = 'inline';
                document.getElementById('resetButton').style.display = 'none';
                // Prevent double-clicks or double-taps.
                runButton.disabled = false;
            } else {
                //show modal unsuccessful
                if (scene == 4) {
                    var aliveBarrelsCount = 0;
                    barrels.forEach(function(c) {

                        if (c["sprite"] == "needToHit" && c.health > 60) {
                            aliveBarrelsCount += 1;
                        }

                    });
                    if (aliveBarrelsCount != 0) {
                        $("#modaltext").text("Ты убрал не все нужные бочки!");
                        $("#exampleModal").modal();
                    } else {
                        $("#modaltext").text("Победа!!!");
                        $("#exampleModal").modal();

                    }
                } else {
                    $("#modaltext").text("Попробуй еще раз, не отчаивайся!");
                    $("#exampleModal").modal();
                    console.log("please try again!");

                }

            }


            return;
        }

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
                this.moveNSWE(this.posX + Maze.SQUARE_SIZE * step[0] * stepcount, this.posY + Maze.SQUARE_SIZE * step[1] * stepcount, stepcount);
                break;
            case "down":
                weapon.fireAngle = Phaser.ANGLE_RIGHT;
                var step = Maze.getStepInDirection["SOUTH"];
                this.moveNSWE(this.posX + Maze.SQUARE_SIZE * step[0] * stepcount, this.posY + Maze.SQUARE_SIZE * step[1] * stepcount, stepcount);
                break;
            case "left":
                var step = Maze.getStepInDirection["WEST"];
                this.pegmanSprite.scale.x = -1;
                weapon.fireAngle = Phaser.ANGLE_LEFT;
                this.moveNSWE(this.posX + Maze.SQUARE_SIZE * step[0] * stepcount, this.posY + Maze.SQUARE_SIZE * step[1] * stepcount, stepcount);
                break;
            case "right":
                var step = Maze.getStepInDirection["EAST"];
                this.pegmanSprite.scale.x = 1;
                weapon.fireAngle = Phaser.ANGLE_RIGHT;
                this.moveNSWE(this.posX + Maze.SQUARE_SIZE * step[0] * stepcount, this.posY + Maze.SQUARE_SIZE * step[1] * stepcount, stepcount);
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

Pegman.finishPreviousAction = function() {};

Pegman.moveNSWE = function(x, y, stepcount = 1) {
        this.animSpeedByStep = 500;
        this.posX = x;
        this.posY = y;

        this.anim = this.pegmanSprite.animations.play("NORTH");
        this.tween = TopDownGame.game.add.tween(this.pegmanSprite);
        this.tween.to({
            x: this.posX,
            y: this.posY,
        }, this.animSpeedByStep * stepcount, Phaser.Easing.Linear.In);
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
    };
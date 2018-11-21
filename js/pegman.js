'use strict';

var Pegman = Pegman || {};

var Pegman = {
    posX: null,
    posY: null,
    dposX: null,
    dposY: null,
    direction: Maze.DirectionType.EAST,
    pegmanActions: [],
    pegmanSprite: null,
    anim: null,
    tween: null,

    init: function (pegmanSprite) {
        this.pegmanSprite = pegmanSprite;
        TopDownGame.game.camera.follow(player);
        // сделать так чтобы это сообщение не выходило когда игрок начинает со второго уровня
        if (TopDownGame.game.state.getCurrentState().key == "lesson11" && scene == 0) {
            $("#modaltext").text("Приветствую тебя рекрут! Я научу тебя пользоваться твоим экзокостюмом. Для начала попробуй просто сдвинуться с места!");
            $("#exampleModal").modal();
        }
        if (TopDownGame.game.state.getCurrentState().key == "lesson21") {
            $("#modaltext").text("Рекрут, тебе нужно собрать все сундуки с золотом. Управляй экзокостюмом с помощью галактической системы координат.");
            $("#exampleModal").modal();
        }
        if (TopDownGame.game.state.getCurrentState().key == "lesson3") {
            $("#modaltext").text("На этом этапе необходимо достроить недостающую часть карты.");
            $("#exampleModal").modal();
        }
        if (TopDownGame.game.state.getCurrentState().key == "lesson4") {
            $("#modaltext").text("Только что с учебки, а уже сразу на такое опасное задание?!! Сначала докажи, что умеешь стрелять!");
            $("#exampleModal").modal();
        } else
            this.reset2();
    },

    reset2: function () {
        TopDownGame.game.tweens.removeAll();
        TopDownGame.game.stage.updateTransform();

        this.posX = lastSuccessfullPosition.x;
        this.posY = lastSuccessfullPosition.y;
        try {
            this.dposX = startPositions['lesson3' + sublevel][0];
            this.dposY = startPositions['lesson3' + sublevel][1];
        } catch {

        }
        this.preReset();
        this.tween = null;
        this.tween1 = null;
        this.tween2 = null;
        this.anim = null;


        this.pegmanSprite.scale.x = 1;
        this.pegmanSprite.scale.y = 1;
        try {
            sinkflag = false;
            hitflag = false;
            b.visible = true;
        } catch { };
        this.pegmanActions = [];
        this.postReset();
    },

    preReset: function () {

        if (this.tween) {
            this.tween.stop();
        }
        if (this.tween1) {
            this.tween1.stop();
        }
        if (this.tween2) {
            this.tween2.stop();
        }
        if (this.anim) {
            this.anim.stop();
        }
    },

    postReset: function () {
        this.pegmanSprite.reset(lastSuccessfullPosition.x, lastSuccessfullPosition.y);
        this.pegmanSprite.fresh = false;
        flag = false;

        if (TopDownGame.game.state.getCurrentState().key == "lesson11") {
            barrels.forEach(function (c) {
                if (c["scene"] - 1 == scene) { //оживляем только те бочки, которые относятся к данной сцене.
                    c.revive();
                    if (c["sprite"] == "allowedToHit") {
                        c.frame = 234;
                    } else if (c["sprite"] == "allowedToHit2") {
                        c.frame = 236;
                    } else if (c["sprite"] == "needToHit") {
                        c.frame = 238;
                        if (c["flipped"] == true) {
                            c.frame = 241;
                        }
                    } else if (c["sprite"] == "restrictedToHit") {
                        c.frame = 235;
                    }
                    c.body.immovable = true;
                    c.body.enable = true;
                }
            });
        }

        if (TopDownGame.game.state.getCurrentState().key == "lesson24" || TopDownGame.game.state.getCurrentState().key == "lesson25") {
            barrels.forEach(function (c) {
                c.revive();
                if (c["sprite"] == "allowedToHit") {
                    c.frame = 234;
                } else if (c["sprite"] == "allowedToHit2") {
                    c.frame = 236;
                } else if (c["sprite"] == "needToHit") {
                    c.frame = 238;
                    if (c["flipped"] == true) {
                        c.frame = 241;
                    }
                } else if (c["sprite"] == "restrictedToHit") {
                    c.frame = 235;
                }
                c.body.immovable = true;


                c.body.enable = true;

            });
        }

        if (TopDownGame.game.state.getCurrentState().key[6] == "2") { // это значит второй уровень (((
            chests.forEach(function (c) {
                c.revive();
            });

        }

        if (TopDownGame.game.state.getCurrentState().key == "lesson3") {
            // map.replace(tile.id, tileid_pairs[tile.id-1]+1, 0, 0, 20, 20, drawLayer); 
            tilestodraw.forEach(function (tile) {
                map.replace(tileid_pairs[tile.id - 1] + 1, tile.id, 0, 0, 40, 40, drawLayer);
            });

            setblocks = 0;
            this.selected_tileid = 1;
            this.pegmanSprite.frame = this.selected_tileid;
            crosses.callAll('kill');
        }
        if (TopDownGame.game.state.getCurrentState().key == "lesson4") {
            if (scene == 42) {
                barrels.forEach(function (c) {

                    c.revive();
                    c.frame = 195;
                    c.body.immovable = true;
                    c.body.enable = true;

                });
            } else {

                barrels.forEach(function (c) {
                    if (c.scene == scene) {
                        c.revive();
                        c.frame = 195;
                        c.body.immovable = true;
                        c.body.enable = true;
                    } else {
                        c.kill();
                    }
                });
            }



            if (showflag && scene == 2) {
                $("#modaltext").text("Я так и знал! У нас тут на планете каждый патрон, каждая энергетическая ячейка не счету! Для экономии энергии используй команду 'Повтори'!");
                $("#exampleModal").modal();
                showflag = false;
            } else if (showflag && scene == 3) {
                $("#modaltext").text("Тебе нужно потренироваться еще больше. Подстрели вот эти бочки.");
                $("#exampleModal").modal();
                showflag = false;
            } else if (showflag && scene == 4) {
                $("#modaltext").text("Отлично справляешься! Теперь я понимаю почему тебе доверили такое важное задание!");
                $("#exampleModal").modal();
                showflag = false;
            } else if (showflag && scene == 5) {
                $("#modaltext").text("Мы почти закончили! Для тебя новое испытание.");
                $("#exampleModal").modal();
                showflag = false;
            }
        }

        if (TopDownGame.game.state.getCurrentState().key == "lesson42") {

            barrels.forEach(function (c) {

                c.revive();
                c.frame = 195;
                c.body.immovable = true;
                c.body.enable = true;

            });
        }

        this.pegmanSprite.animations.play('STAND');

    },

    nextAction: function (action, step = 1, tox = 0, toy = 0) {
        var actionobject = {
            action: action,
            tox: tox,
            toy: toy,
            stepcount: step
        };
        this.pegmanActions.push(actionobject);
    },

    play: function () {
        this.playNextAction();
    },

    playNextAction: function () {
        if (this.pegmanActions.length <= 0) {
            TopDownGame.game.time.events.add(500, delayBeforeCheck, this);
            function delayBeforeCheck() {
                Pegman.checkFinal();
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
        var tox = actionobject.tox;
        var toy = actionobject.toy;

        switch (action) {
            case "up":
                this.direction = Maze.DirectionType.NORTH;
                var step = Maze.getStepInDirection["NORTH"];
                this.moveNSWE(this.posX + Maze.SQUARE_SIZE * step[0] * stepcount, this.posY + Maze.SQUARE_SIZE * step[1] * stepcount, stepcount);
                break;
            case "down":
                this.direction = Maze.DirectionType.SOUTH;
                var step = Maze.getStepInDirection["SOUTH"];
                this.moveNSWE(this.posX + Maze.SQUARE_SIZE * step[0] * stepcount, this.posY + Maze.SQUARE_SIZE * step[1] * stepcount, stepcount);
                break;
            case "left":
                this.direction = Maze.DirectionType.WEST;
                var step = Maze.getStepInDirection["WEST"];
                this.pegmanSprite.scale.x = -1;
                weapon.fireAngle = Phaser.ANGLE_LEFT;
                this.moveNSWE(this.posX + Maze.SQUARE_SIZE * step[0] * stepcount, this.posY + Maze.SQUARE_SIZE * step[1] * stepcount, stepcount);
                break;
            case "right":
                this.direction = Maze.DirectionType.EAST;
                var step = Maze.getStepInDirection["EAST"];
                this.pegmanSprite.scale.x = 1;
                weapon.fireAngle = Phaser.ANGLE_RIGHT;
                this.moveNSWE(this.posX + Maze.SQUARE_SIZE * step[0] * stepcount, this.posY + Maze.SQUARE_SIZE * step[1] * stepcount, stepcount);
                break;
            case "nswe":
                this.pegmanSprite.scale.x = 1;
                try {
                    weapon.fireAngle = Phaser.ANGLE_RIGHT
                } catch { };
                // нужно вычислить в пикселях куда должен попасть игрок.

                var goalx = Maze.SQUARE_SIZE * (tox - Maze.coordoffset_x) + Maze.SQUARE_SIZE / 2;
                var goaly = Maze.SQUARE_SIZE * (-1 * toy + Maze.coordoffset_y) + 14;
                if (goalx < player.x) {
                    this.pegmanSprite.scale.x = -1;
                    try {
                        weapon.fireAngle = Phaser.ANGLE_LEFT
                    } catch { };
                } else {
                    this.pegmanSprite.scale.x = 1;
                    try {
                        weapon.fireAngle = Phaser.ANGLE_RIGHT
                    } catch { };
                }
                this.moveNSWE(goalx, goaly, stepcount);
                break;
            case "changex":
                var goalx = this.posX + Maze.SQUARE_SIZE * tox;
                var goaly = this.posY + Maze.SQUARE_SIZE * toy;
                this.dposX += tox;
                this.moveNSWE(goalx, goaly, stepcount);
                break;
            case "changey":
                var goalx = this.posX + Maze.SQUARE_SIZE * tox;
                var goaly = this.posY - Maze.SQUARE_SIZE * toy;
                this.dposY -= toy;
                this.moveNSWE(goalx, goaly, stepcount);
                break;
            case "fire":
                this.Shoot();
                break;
            case "changeskin":
                this.selected_tileid = stepcount;
                this.pegmanSprite.frame = this.selected_tileid; // в будущем надо сделать по нормальному, сейчас айди фрейма передается как stepcount. Не бейте меня за это
                this.playNextAction();
                break;
            case "build":
                var tileIDToReplace;
                var tileToReplaceX;
                var tileToReplaceY;
                //console.log(Pegman.dposX, Pegman.dposY, Pegman.selected_tileid);
                tilestodraw.forEach(function (tile) {
                    //console.log(tile.x, tile.y, tileid_pairs[tile.id - 1]);
                    if (tile.x == Pegman.dposX && tile.y == Pegman.dposY && tileid_pairs[tile.id - 1] == Pegman.selected_tileid) {
                        tileIDToReplace = tile.id;
                        tileToReplaceX = tile.x;
                        tileToReplaceY = tile.y;
                    }
                });
                TopDownGame.game.camera.shake(0.003, 100);
                if (tileIDToReplace) {
                    map.replace(tileIDToReplace, tileid_pairs[tileIDToReplace - 1] + 1, tileToReplaceX, tileToReplaceY, 1, 1, drawLayer);
                    setblocks += 1;
                } else {
                    crosses.create(Pegman.dposX * Maze.SQUARE_SIZE, Pegman.dposY * Maze.SQUARE_SIZE, 'totalsheet', 0);
                }

                builddust.x = Pegman.dposX * Maze.SQUARE_SIZE - 16;
                builddust.y = Pegman.dposY * Maze.SQUARE_SIZE - 16;
                builddust.visible = true;
                this.anim = builddust.animations.play("BUILD");
                this.anim.onComplete.addOnce(function () {
                    builddust.visible = false;
                    //console.log(builddust.x, builddust.y, builddust.visible);
                    this.playNextAction();
                }, this);
                break;

            case "setx":
                var goalx = Maze.SQUARE_SIZE * (tox - Maze.coordoffset_x) + Maze.SQUARE_SIZE / 2;
                Pegman.dposX = tox - Maze.coordoffset_x;
                Pegman.posX = goalx;
                var goaly = Maze.SQUARE_SIZE * toy;
                Pegman.pegmanSprite.visible = false;
                player.x = goalx;
                player.y = Pegman.posY;
                Pegman.pegmanSprite.visible = true;
                this.playNextAction();
                break;

            case "sety":
                var goaly = Maze.SQUARE_SIZE * (-1 * toy + Maze.coordoffset_y) + Maze.SQUARE_SIZE / 2;
                Pegman.posY = goaly;
                Pegman.dposY = -1 * toy + Maze.coordoffset_y;
                // console.log(goalx, goaly);
                Pegman.pegmanSprite.visible = false;
                player.x = Pegman.posX;
                player.y = goaly;
                Pegman.pegmanSprite.visible = true;
                this.playNextAction();
                break;
            case "setxy":
                var goalx = Maze.SQUARE_SIZE * (tox - Maze.coordoffset_x) + Maze.SQUARE_SIZE / 2;
                var goaly = Maze.SQUARE_SIZE * (-1 * toy + Maze.coordoffset_y) + Maze.SQUARE_SIZE / 2;
                // var goalx = Maze.SQUARE_SIZE * tox;
                // var goaly = Maze.SQUARE_SIZE * toy;
                Pegman.dposX = tox - Maze.coordoffset_x;
                Pegman.posX = goalx;
                Pegman.posY = goaly;
                Pegman.dposY = -1 * toy + Maze.coordoffset_y;

                Pegman.pegmanSprite.visible = false;
                player.x = goalx;
                player.y = goaly;
                Pegman.pegmanSprite.visible = true;
                this.playNextAction();
                break;
        }
    },

    turnToInternal: function (newDirection) {
        var d = Maze.directionToString(this.direction);
        this.direction = newDirection;
        d += "_" + Maze.directionToString(this.direction);
        this.turnTo(d);
    },
};



Pegman.textoffset_x = 0;
Pegman.textoffset_y = 45;
Pegman.bulletSpeed = 1000;
Pegman.selected_tileid = 1;

Pegman.preReset = function () {
    if (this.tween) {
        this.tween.stop();
    }
    if (this.anim) {
        this.anim.stop();
    }
};

Pegman.finishPreviousAction = function () { };

Pegman.moveNSWE = function (x, y, stepcount = 1) {
    TopDownGame.game.stage.updateTransform();
    this.pegmanSprite.fresh = false;
    this.animSpeedByStep = 500;
    this.posX = x;
    this.posY = y;
    this.anim = this.pegmanSprite.animations.play("NORTH");
    this.tween = TopDownGame.game.add.tween(this.pegmanSprite);
    this.tween.to({
        x: this.posX,
        y: this.posY,
    }, this.animSpeedByStep * stepcount, Phaser.Easing.Linear.In);
    this.tween.onComplete.addOnce(function () {
        this.pegmanSprite.animations.play("STAND");
        TopDownGame.game.stage.updateTransform();
        this.pegmanSprite.fresh = false;
        this.playNextAction();
    }, this);
    this.tween.start();
},
    Pegman.Shoot = function () {


        TopDownGame.game.time.events.add(200, fadePicture, this);


        function fadePicture() {

            this.anim = this.pegmanSprite.animations.play("SHOOT");
            weapon.fire();
            weapon.onKill.addOnce(function () {
                player.animations.play('STAND');
                this.playNextAction();
            }, this);
            this.anim.onComplete.addOnce(function () {
                player.animations.play('STAND');
            }, this);

        }


    },

    Pegman.checkFinal = function () {
        if (TopDownGame.game.state.getCurrentState().key == "lesson11") {
            var isOverlapping = TopDownGame.game.physics.arcade.overlap(player, pointer, null, null, this);
            if (isOverlapping == true) {
                if (scene == 0) {
                    var messagetext = "Отлично получилось! Теперь попробуй дойди до конца коридора!";
                } else if (scene == 1) {
                    var messagetext = "Превосходно! Сейчас надо дойти до тех бочек!";
                } else if (scene == 2) {
                    var messagetext = "Эти бочки преградили тебе путь. Расстреляй их, чтобы пройти дальше!";
                } else if (scene == 3) {
                    //var messagetext = "А теперь нужно найти 3 бочки с мишенями и подстрелить их. Но не в коем случае не стреляй в бочки с водой!";
                    var messagetext = "А теперь нужно найти 5 бочки с мишенями и подстрелить их";
                }
                $("#modaltext").text(messagetext);
                $("#exampleModal").modal();
                scene += 1;
                this.pegmanSprite.body.enable = false;
                pointer.x = Maze.scenes[scene].endPos[0];
                pointer.y = Maze.scenes[scene].endPos[1];
                this.pegmanSprite.body.enable = true;

                //Copied from reset button code. Resets html button
                var runButton = document.getElementById('runButton');
                runButton.style.display = 'inline';
                document.getElementById('resetButton').style.display = 'none';
                // Prevent double-clicks or double-taps.
                runButton.disabled = false;
                lastSuccessfullPosition.x = player.x;
                lastSuccessfullPosition.y = player.y;
            } else {
                //show modal unsuccessful
                if (scene == 4) {
                    var aliveBarrelsCount = 0;
                    barrels.forEach(function (c) {
                        if (c["sprite"] == "needToHit" && c.health > 60) {
                            aliveBarrelsCount += 1;
                        }
                    });
                    if (aliveBarrelsCount == 0) {
                        $("#modaltext").text("Победа!!!");
                        $("#exampleModal").modal();
                        TopDownGame.game.state.start('lesson21');
                    } else {
                        $("#modaltext").text("Ты убрал не все нужные бочки!");
                        $("#exampleModal").modal();
                    }
                } else {
                    console.log("please try again!");
                }
            }

            //TopDownGame.game.state.getCurrentState().key == "Game" 
        }

        if (TopDownGame.game.state.getCurrentState().key == "lesson21") {

            var aliveChestsCount = 0;
            chests.forEach(function (c) {
                if (c.visible == true) {
                    aliveChestsCount += 1;
                }
            });

            if (aliveChestsCount == 0) {
                // $("#modaltext").text("Задание выполнено! Переходим на уровень 2.2!");
                // $("#exampleModal").modal();
                TopDownGame.game.state.start('lesson22');
                var runButton = document.getElementById('runButton');
                runButton.style.display = 'inline';
                document.getElementById('resetButton').style.display = 'none';
                // Prevent double-clicks or double-taps.
                runButton.disabled = false;
            } else {
                $("#modaltext").text("Ты подобрал не все сундуки!");
                $("#exampleModal").modal();
            }

            //TopDownGame.game.state.getCurrentState().key == "lesson21"
        }
        if (TopDownGame.game.state.getCurrentState().key == "lesson22") {

            var aliveChestsCount = 0;
            chests.forEach(function (c) {
                if (c.visible == true) {
                    aliveChestsCount += 1;
                }
            });
            if (aliveChestsCount == 0) {
                // $("#modaltext").text("Задание выполнено! Переходим на уровень 2.3!");
                // $("#exampleModal").modal();
                TopDownGame.game.state.start('lesson23');
                var runButton = document.getElementById('runButton');
                runButton.style.display = 'inline';
                document.getElementById('resetButton').style.display = 'none';
                // Prevent double-clicks or double-taps.
                runButton.disabled = false;
            } else {
                $("#modaltext").text("Ты подобрал не все сундуки!");
                $("#exampleModal").modal();
            }

            //TopDownGame.game.state.getCurrentState().key == "lesson21"
        }

        if (TopDownGame.game.state.getCurrentState().key == "lesson23") {
            var aliveChestsCount = 0;
            chests.forEach(function (c) {
                if (c.visible == true) {
                    aliveChestsCount += 1;
                }
            });
            if (aliveChestsCount == 0) {
                // $("#modaltext").text("Задание выполнено! Переходим на уровень 2.4!");
                // $("#exampleModal").modal();
                TopDownGame.game.state.start('lesson24');
                var runButton = document.getElementById('runButton');
                runButton.style.display = 'inline';
                document.getElementById('resetButton').style.display = 'none';
                // Prevent double-clicks or double-taps.
                runButton.disabled = false;
            } else {
                $("#modaltext").text("Ты подобрал не все сундуки!");
                $("#exampleModal").modal();
            }
        }
        if (TopDownGame.game.state.getCurrentState().key == "lesson24") {
            //тут уже более сложная логика, так как там две бочки


            var aliveChestsCount = 0;
            chests.forEach(function (c) {
                if (c.visible == true) {
                    aliveChestsCount += 1;
                }
            });
            if (aliveChestsCount == 0) {
                $("#modaltext").text("Победа!!!");
                $("#exampleModal").modal();
                TopDownGame.game.state.start('lesson25');
                var runButton = document.getElementById('runButton');
                runButton.style.display = 'inline';
                document.getElementById('resetButton').style.display = 'none';
                // Prevent double-clicks or double-taps.
                runButton.disabled = false;
            } else {
                $("#modaltext").text("Ты подобрал не все сундуки!");
                $("#exampleModal").modal();
            }
        }
        if (TopDownGame.game.state.getCurrentState().key == "lesson25") {
            var aliveChestsCount = 0;
            chests.forEach(function (c) {
                if (c.visible == true) {
                    aliveChestsCount += 1;
                }
            });
            if (aliveChestsCount == 0) {
                TopDownGame.game.state.start('lesson11');
            } else {
                $("#modaltext").text("Ты собрал не все сундуки!");
                $("#exampleModal").modal();
            }
        }
        if (TopDownGame.game.state.getCurrentState().key == "lesson3") {
            if (setblocks == tilestodraw.length) {
                if (sublevel == 6) {
                    $("#modaltext").text("Поздравляю! Ты закончил уровень №3");
                    $("#exampleModal").modal();
                    sublevel = 1;
                    change_map('lesson3' + sublevel);
                } else {
                    $("#nextButton").show();
                    $('#nextButton').one('click', function () {
                        sublevel += 1;
                        change_map('lesson3' + sublevel);
                        Pegman.reset2();
                        TopDownGame.game.camera.flash(0x000000, 500);
                    });
                }
            }
        }

        if (TopDownGame.game.state.getCurrentState().key == "lesson4") {
            var aliveBarrelsCount = 0;
            barrels.forEach(function (c) {
                if (c.health > 50 && c.scene == scene) {
                    aliveBarrelsCount += 1;
                }
            });
            if (aliveBarrelsCount == 0) {
                if (scene < 5) {
                    lastSuccessfullPosition.x = player.x;
                    lastSuccessfullPosition.y = player.y;
                    scene += 1;
                    load_scene();

                } else if (scene == 5) {
                    scene = 42;
                    load_map("lesson42");
                } else if (scene == 42) {
                    console.log("scene = ", scene);
                    var isOverlapping = TopDownGame.game.physics.arcade.overlap(player, pointer, null, null, this);
                    console.log("isOverlapping = ", isOverlapping);
                    if (isOverlapping == true) {
                        $("#modaltext").text("Поздравляю! Ты закончил уровень №4");
                        $("#exampleModal").modal();
                    }


                }
            }
        }
    };
'use strict';

var Pegman = Pegman || {};

var Pegman = {
    posX: null,
    posY: null,
    dposX: null,
    dposY: null,
    vdposX: null,
    vdposY: null,
    direction: Maze.DirectionType.EAST,
    pegmanActions: [],
    pegmanSprite: null,
    anim: null,
    tween: null,
    isGladeToRight: false,
    isGladeToLeft: false,
    isGladeAbove: false,
    isGladeBelow: false,
    firstName: "Рекрут",
    hasGoldenKey: false,
    flipX: false,


    init: function (pegmanSprite) {
        this.pegmanSprite = pegmanSprite;
        TopDownGame.game.time.events.add(500, delayEnBody, this);
        // getSelfInfo();

        function delayEnBody() {

            // включаем физику с задержкой, из-за переходных процессов в игре
            this.pegmanSprite.body.enable = true;


            if (TopDownGame.game.state.getCurrentState().key == "lesson1" && scene == 0) {


                $("#modaltext").text("Приветствую тебя " + Pegman.firstName + "! Я научу тебя пользоваться твоим экзокостюмом. Для начала попробуй просто сдвинуться с места!");
                $("#exampleModal").modal();
            }
            if (TopDownGame.game.state.getCurrentState().key == "lesson5") {
                TopDownGame.game.world.bringToTop(pointer);
                TopDownGame.game.world.bringToTop(explosion);
                TopDownGame.game.world.bringToTop(player);
            }

            if (TopDownGame.game.state.getCurrentState().key == "lesson0") {
                $("#modaltext").text("Приветствую тебя, кадет! Ты должен дойти до пункта сбора. Управляй робо-костюмом с помощью блоков и доберись до указателя. Используй стрелки для просмотра карты.");
                $("#exampleModal").modal();
            }


        }

        // сделать так чтобы это сообщение не выходило когда игрок начинает со второго уровня

        if (TopDownGame.game.state.getCurrentState().key == "lesson21") {
            $("#modaltext").text(Pegman.firstName + ", тебе нужно собрать все сундуки с золотом. Управляй экзокостюмом с помощью галактической системы координат.");
            $("#exampleModal").modal();
        }
        if (TopDownGame.game.state.getCurrentState().key == "lesson3") {
            $("#modaltext").text("На этом этапе необходимо достроить недостающую часть карты.");
            $("#exampleModal").modal();
        }
        if (TopDownGame.game.state.getCurrentState().key == "lesson4") {
            $("#modaltext").text(Pegman.firstName + ", только что с учебки, а уже сразу на такое опасное задание?!! Сначала докажи, что умеешь стрелять!");
            $("#exampleModal").modal();
        }

        if (TopDownGame.game.state.getCurrentState().key == "lesson5" && scene == 0 && map.key == "lesson51") {
            $("#modaltext").text("Вокруг много подтаявшего льда, сквозь который можно проавлиться. Давай проверим как ты умеешь засыпать полынью снегом. Используй блок засыпать");
            $("#exampleModal").modal();
        }
        this.reset2();
    },

    reset2: function () {
        TopDownGame.game.stage.updateTransform();
        TopDownGame.game.time.events.add(500, delayEnBody, this);
        try {
            this.pegmanSprite.angle = 0;
        } catch (e) {}

        function delayEnBody() {
            // включаем физику с задержкой, из-за переходных процессов в игре
            this.pegmanSprite.body.enable = true;
        }


        // try {
        //     TopDownGame.game.world.bringToTop(pointer);
        //     TopDownGame.game.world.bringToTop(player);
        // } catch (e) { }

        TopDownGame.game.tweens.removeAll();

        this.direction = Maze.DirectionType.EAST;
        this.flipX = false;

        this.posX = lastSuccessfullPosition.x;
        this.posY = lastSuccessfullPosition.y;
        try {
            this.dposX = startPositions['lesson3' + scene][0];
            this.dposY = startPositions['lesson3' + scene][1];
        } catch (e) {

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
        } catch (e) {};
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
        TopDownGame.game.camera.follow(player);
        TopDownGame.game.camera.unfollow(player);

        try {
            weapon.bullets.callAll('kill');
        } catch (e) {}

        if (TopDownGame.game.state.getCurrentState().key == "lesson0" || TopDownGame.game.state.getCurrentState().key == "lesson_test") {

            try {
                map.removeTile(19, 7, flour);
                map.removeTile(20, 7, flour);
                map.removeTile(21, 7, flour);
                map.removeTile(19, 8, flour);
                map.removeTile(20, 8, flour);
                map.removeTile(21, 8, flour);
                map.removeTile(19, 9, flour);
                map.removeTile(20, 9, flour);
                map.removeTile(21, 9, flour);

                map.putTile(145, 19, 7, sinkLayer);
                map.putTile(145, 20, 7, sinkLayer);
                map.putTile(145, 21, 7, sinkLayer);
                map.putTile(134, 19, 8, sinkLayer);
                map.putTile(134, 20, 8, sinkLayer);
                map.putTile(134, 21, 8, sinkLayer);
                map.putTile(134, 19, 9, sinkLayer);
                map.putTile(134, 20, 9, sinkLayer);
                map.putTile(134, 21, 9, sinkLayer);

                map.replace(228, 229, 21, 2, 1, 1, flour);
            } catch (e) {

            }

            player.removeChild(goldenKey);
            TopDownGame.game.world.add(goldenKey);
            goldenKey.reset(goldenKey.realX, goldenKey.realY);
            goldenKey.animations.play('SHADOW');
            Pegman.hasGoldenKey = false;
            if (scene == 4) {
                goldenKey.kill();
            }
        }

        if (TopDownGame.game.state.getCurrentState().key == "lesson1") {
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
                c.visible = true;
            });

            bulletFlag = false;



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

            player.alpha = 0;
            TopDownGame.game.add.tween(player).to({
                alpha: 1
            }, 500, Phaser.Easing.Cubic.InOut, true, 0, -1, true);
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
                $("#modaltext").text("Я так и знал! У нас тут на планете каждый патрон, каждая энергетическая ячейка не счету! Для экономии энергии используй команду «Повтори»!");
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
        if (TopDownGame.game.state.getCurrentState().key == "lesson5") {

            if (map.key != "lesson53") {

                for (var y = 0; y < map.height; ++y) {
                    for (var x = 0; x < map.width; ++x) {
                        //  if (map.getTile(x, y, 'fog')) {
                        map.putTile(232, x, y, "fog");
                        //  }
                    }
                }
                Pegman.dposX = Math.floor(player.x / 64);
                Pegman.dposY = Math.floor(player.y / 64);
                Pegman.vdposX = Pegman.dposX;
                Pegman.vdposY = Pegman.dposY;
                for (var y = Pegman.dposY - 1; y <= Pegman.dposY + 1; ++y) {
                    for (var x = Pegman.dposX - 1; x <= Pegman.dposX + 1; ++x) {
                        map.putTile(244, x, y, fog);
                    }
                }

                for (var y = Pegman.dposY - 2; y <= Pegman.dposY + 2; ++y) {
                    for (var x = Pegman.dposX - 2; x <= Pegman.dposX + 2; ++x) {
                        if ((x >= Pegman.dposX + 1 || x <= Pegman.dposX - 1) || (y >= Pegman.dposY + 1 || y <= Pegman.dposY - 1)) {
                            var t_id = normalize(x, y);
                            map.putTile(t_id, x, y, fog);
                        }
                    }
                }
            } else {
                map.replace(236, 235, 9, 6, 6, 2, flour);
            }
            if (scene == "510") {

            } else if (scene == "511") {
                map.replace(235, 15, 6, 4, 6, 2, map.getLayer());
                map.replace(236, 15, 6, 4, 6, 2, map.getLayer());
                map.replace(15, 235, 6 + getRandomInt(0, 6), 4, 1, 1, map.getLayer());
                map.replace(15, 235, 6 + getRandomInt(0, 6), 5, 1, 1, map.getLayer());
            } else if (scene == "512") {
                this.fillpath(12, 6, 15, 11);
                // this.fillpath(12, 6, 15, 12);
            } else if (scene == "513") {
                this.fillpath(16, 11, 22, 14);
            } else if (scene == "521") {
                this.refillarea(6, 10, 9, 14);
            } else if (scene == "522") {
                this.refillarea(12, 10, 18, 12);
                this.refillarea(16, 3, 19, 9);
                revealArea();
            }
        }

        this.pegmanSprite.animations.play('STAND');

    },
    fillpath: function (x1, y1, x2, y2) {
        var sc11 = getRandomInt(0, 3);
        console.log(sc11);
        for (var y = y1; y <= y2; ++y) {
            for (var x = x1; x <= x2; ++x) {
                // console.log(scene11[sc11][y - y1][x - x1], x - x1, y - y1);
                map.replace(238, 15, x, y, 1, 1, flour);
                if (scene11[sc11][y - y1][x - x1] == 1) {

                    map.replace(15, 238, x, y, 1, 1, flour);
                }


            }
        }
    },

    refillarea: function (x1, y1, x2, y2) {
        map.replace(235, 15, x1, y1, x2 - x1 + 1, y2 - y1 + 1, flour);
        map.replace(236, 15, x1, y1, x2 - x1 + 1, y2 - y1 + 1, flour);

        var arr = shuffle(Array((x2 - x1 + 1) * (y2 - y1 + 1) - 5).fill(0).concat([1, 1, 1, 1, 1]));
        var i = 0;
        for (var y = y1; y <= y2; ++y) {
            for (var x = x1; x <= x2; ++x) {
                if (arr[i]) {
                    map.replace(15, 235, x, y, 1, 1, flour);
                }
                i = i + 1;
            }
        }
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
                try {
                    weapon.fireAngle = Phaser.ANGLE_LEFT;
                } catch (e) {}
                this.moveNSWE(this.posX + Maze.SQUARE_SIZE * step[0] * stepcount, this.posY + Maze.SQUARE_SIZE * step[1] * stepcount, stepcount);
                break;
            case "right":
                this.direction = Maze.DirectionType.EAST;
                var step = Maze.getStepInDirection["EAST"];
                this.pegmanSprite.scale.x = 1;
                try {
                    weapon.fireAngle = Phaser.ANGLE_RIGHT;
                } catch (e) {}
                this.moveNSWE(this.posX + Maze.SQUARE_SIZE * step[0] * stepcount, this.posY + Maze.SQUARE_SIZE * step[1] * stepcount, stepcount);
                break;
            case "uturn":
                if (this.flipX == false) {
                    this.direction = Maze.DirectionType.WEST;
                    var step = Maze.getStepInDirection["WEST"];
                    this.pegmanSprite.scale.x = -1;
                    try {
                        weapon.fireAngle = Phaser.ANGLE_LEFT;
                    } catch (e) {}
                    this.flipX = true;
                } else if (this.flipX == true) {
                    this.direction = Maze.DirectionType.EAST;
                    var step = Maze.getStepInDirection["EAST"];
                    this.pegmanSprite.scale.x = 1;
                    try {
                        weapon.fireAngle = Phaser.ANGLE_RIGHT;
                    } catch (e) {}
                    this.flipX = false;
                }

                this.playNextAction();
                break;
            case "nswe":
                this.pegmanSprite.scale.x = 1;
                try {
                    weapon.fireAngle = Phaser.ANGLE_RIGHT
                } catch (e) {};
                // нужно вычислить в пикселях куда должен попасть игрок.

                var goalx = Maze.SQUARE_SIZE * (tox - Maze.coordoffset_x) + Maze.SQUARE_SIZE / 2;
                var goaly = Maze.SQUARE_SIZE * (-1 * toy + Maze.coordoffset_y) + 14;
                if (goalx < player.x) {
                    this.pegmanSprite.scale.x = -1;
                    try {
                        weapon.fireAngle = Phaser.ANGLE_LEFT
                    } catch (e) {};
                    this.direction = Maze.DirectionType.WEST;

                } else {
                    this.pegmanSprite.scale.x = 1;
                    try {
                        weapon.fireAngle = Phaser.ANGLE_RIGHT
                    } catch (e) {};
                    this.direction = Maze.DirectionType.EAST;
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
            case "fillpit":
                var direction_to_put = stepcount;
                TopDownGame.game.camera.shake(0.003, 100);
                var putx, puty;
                if (direction_to_put == 0) {
                    putx = Pegman.dposX - 1;
                    puty = Pegman.dposY;
                } else if (direction_to_put == 1) {
                    putx = Pegman.dposX + 1;
                    puty = Pegman.dposY;
                } else if (direction_to_put == 2) {
                    putx = Pegman.dposX;
                    puty = Pegman.dposY - 1;
                } else if (direction_to_put == 3) {
                    putx = Pegman.dposX;
                    puty = Pegman.dposY + 1;
                }
                map.replace(235, 236, putx, puty, 1, 1, map.getLayer());
                builddust.x = putx * Maze.SQUARE_SIZE - 16;
                builddust.y = puty * Maze.SQUARE_SIZE - 16;
                builddust.visible = true;
                this.anim = builddust.animations.play("BUILD");
                this.anim.onComplete.addOnce(function () {
                    builddust.visible = false;
                    //console.log(builddust.x, builddust.y, builddust.visible);
                    this.playNextAction();
                }, this);
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
Pegman.selected_tileid = 1;

Pegman.preReset = function () {
    if (this.tween) {
        this.tween.stop();
    }
    if (this.anim) {
        this.anim.stop();
    }
};

Pegman.finishPreviousAction = function () {};

Pegman.moveNSWE = function (x, y, stepcount = 1) {
        TopDownGame.game.stage.updateTransform();
        this.pegmanSprite.fresh = false;
        this.animSpeedByStep = tweenSpeed;
        this.posX = x;
        this.posY = y;


        this.anim = this.pegmanSprite.animations.play("NORTH");
        this.tween = TopDownGame.game.add.tween(this.pegmanSprite);
        this.tween.timeScale = timeScale;
        this.tween.to({
            x: this.posX,
            y: this.posY,
        }, this.animSpeedByStep * stepcount, Phaser.Easing.Linear.In);
        this.tween.onComplete.addOnce(function () {
            this.pegmanSprite.animations.play("STAND");
            this.dposX = Math.floor(x / 64);
            this.dposY = Math.floor(y / 64);
            this.playNextAction();
        }, this);
        this.tween.start();
    },
    Pegman.Shoot = function () {
        TopDownGame.game.time.events.add(200, delayBeforeShoot, this);

        function delayBeforeShoot() {
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

        if (TopDownGame.game.state.getCurrentState().key == "lesson_test") {
            var isOverlapping = TopDownGame.game.physics.arcade.overlap(player, pointer, null, null, this);
            if (isOverlapping == true) {
                if (scene == 0) {
                    var messagetext = "Отлично получилось! Теперь попробуй дойди до следующего указателя!";
                    //modal.setContent(messagetext);
                    var messagetext = `
                    <div class="tingle-demo tingle-demo-tiny">
                    <h1>Отлично получилось!</h1>
                    <p> Теперь попробуй дойди до следующего указателя!</p>
                    </div>`;

                    modal.setContent(messagetext);

                    modal.open();

                    scene = 1;
                    pointer.x = Maze.scenes[scene].endPos[0];
                    pointer.y = Maze.scenes[scene].endPos[1];
                    lastSuccessfullPosition.x = player.x;
                    lastSuccessfullPosition.y = player.y;
                    toogleRunButton();
                    try {
                        setIsCheckedForLesson();
                    } catch (e) {
                        console.log("couldn't set IsChecked For Lesson");
                    }

                } else if (scene == 1) {
                    var messagetext = "Превосходно! Нажми на кнопку, чтобы восстановить мост!";
                    var messagetext = `
                    <div class="tingle-demo tingle-demo-tiny">
                    <h1>Превосходно!</h1>
                    <p>Нажми на кнопку <img src='assets/images/button.png' />, чтобы восстановить мост!</p>
                    </div>`;

                    modal.setContent(messagetext);

                    modal.open();
                    scene = 2;
                    pointer.x = Maze.scenes[scene].endPos[0];
                    pointer.y = Maze.scenes[scene].endPos[1];
                    lastSuccessfullPosition.x = player.x;
                    lastSuccessfullPosition.y = player.y;
                    toogleRunButton();

                } else if (scene == 2) {
                    var messagetext = "Теперь нужно дойти до больших ворот, но они закрыты. Чтобы их открыть нужно взять ключ!";
                    var messagetext = `
                    <div class="tingle-demo tingle-demo-tiny">
                    <h1></h1>
                    <p>Теперь нужно дойти до больших ворот, но они закрыты. Чтобы их открыть нужно взять ключ!</p>
                    </div>`;
                    modal.setContent(messagetext);

                    modal.open();
                    scene = 3;
                    pointer.x = Maze.scenes[scene].endPos[0];
                    pointer.y = Maze.scenes[scene].endPos[1];
                    lastSuccessfullPosition.x = player.x;
                    lastSuccessfullPosition.y = player.y;
                    toogleRunButton();

                } else if (scene == 3) {


                    if (Pegman.hasGoldenKey) {
                        scene = 4;
                        TopDownGame.game.time.events.add(500, openNarrow, this);
                        TopDownGame.game.time.events.add(1000, openWide, this);

                        function openNarrow() {
                            map.replace(196, 198, 31, 8, 1, 1, blockLayer);
                            map.replace(197, 199, 32, 8, 1, 1, blockLayer);

                            map.replace(209, 211, 31, 9, 1, 1, blockLayer);
                            map.replace(210, 212, 32, 9, 1, 1, blockLayer);

                            map.replace(222, 224, 31, 10, 1, 1, blockLayer);
                            map.replace(223, 225, 32, 10, 1, 1, blockLayer);


                        }

                        function openWide() {
                            map.replace(198, 200, 31, 8, 1, 1, blockLayer);
                            map.replace(199, 201, 32, 8, 1, 1, blockLayer);

                            map.replace(211, 213, 31, 9, 1, 1, blockLayer);
                            map.replace(212, 214, 32, 9, 1, 1, blockLayer);

                            map.replace(224, 226, 31, 10, 1, 1, blockLayer);
                            map.replace(225, 227, 32, 10, 1, 1, blockLayer);

                        }
                        pointer.x = Maze.scenes[scene].endPos[0];
                        pointer.y = Maze.scenes[scene].endPos[1];
                        lastSuccessfullPosition.x = player.x;
                        lastSuccessfullPosition.y = player.y;
                        toogleRunButton();
                    }
                } else if (scene == 4) {
                    var messagetext = "Отлично! Все кадеты в сборе! Теперь мы летим в космос! Там вас ждет учебный бой против наших роботов.";
                    var messagetext = `
                    <div class="tingle-demo tingle-demo-tiny">
                    <h1>Отлично!</h1>
                    <p>Все кадеты в сборе! Теперь мы летим в космос! Там вас ждет учебный бой против наших роботов.</p>
                    </div>`;
                    modal.setContent(messagetext);

                    modal.open();
                    lastSuccessfullPosition.x = player.x;
                    lastSuccessfullPosition.y = player.y;
                    pointer.kill();
                    try {
                        setIsCheckedForLesson();
                    } catch (e) {
                        console.log("couldn't set IsChecked For Lesson:" + e);
                    }
                }
            }
        }

        if (TopDownGame.game.state.getCurrentState().key == "lesson0") {
            var isOverlapping = TopDownGame.game.physics.arcade.overlap(player, pointer, null, null, this);
            if (isOverlapping == true) {
                if (scene == 0) {
                    var messagetext = "Отлично получилось! Теперь попробуй дойди до следующего указателя!";
                    $("#modaltext").text(messagetext);
                    $("#exampleModal").modal();

                    scene = 1;
                    pointer.x = Maze.scenes[scene].endPos[0];
                    pointer.y = Maze.scenes[scene].endPos[1];
                    lastSuccessfullPosition.x = player.x;
                    lastSuccessfullPosition.y = player.y;
                    toogleRunButton();
                    try {
                        setIsCheckedForLesson();
                    } catch (e) {
                        console.log("couldn't set IsChecked For Lesson");
                    }

                } else if (scene == 1) {
                    var messagetext = "Превосходно! Нажми на кнопку, чтобы восстановить мост!";
                    $("#modaltext").text(messagetext);
                    $("#exampleModal").modal();
                    scene = 2;
                    pointer.x = Maze.scenes[scene].endPos[0];
                    pointer.y = Maze.scenes[scene].endPos[1];
                    lastSuccessfullPosition.x = player.x;
                    lastSuccessfullPosition.y = player.y;
                    toogleRunButton();

                } else if (scene == 2) {
                    var messagetext = "Теперь нужно дойти до больших ворот, но они закрыты. Чтобы их открыть нужно взять ключ!";
                    $("#modaltext").text(messagetext);
                    $("#exampleModal").modal();
                    scene = 3;
                    pointer.x = Maze.scenes[scene].endPos[0];
                    pointer.y = Maze.scenes[scene].endPos[1];
                    lastSuccessfullPosition.x = player.x;
                    lastSuccessfullPosition.y = player.y;
                    toogleRunButton();

                } else if (scene == 3) {


                    if (Pegman.hasGoldenKey) {
                        scene = 4;
                        TopDownGame.game.time.events.add(500, openNarrow, this);
                        TopDownGame.game.time.events.add(1000, openWide, this);

                        function openNarrow() {
                            map.replace(196, 198, 31, 8, 1, 1, blockLayer);
                            map.replace(197, 199, 32, 8, 1, 1, blockLayer);

                            map.replace(209, 211, 31, 9, 1, 1, blockLayer);
                            map.replace(210, 212, 32, 9, 1, 1, blockLayer);

                            map.replace(222, 224, 31, 10, 1, 1, blockLayer);
                            map.replace(223, 225, 32, 10, 1, 1, blockLayer);


                        }

                        function openWide() {
                            map.replace(198, 200, 31, 8, 1, 1, blockLayer);
                            map.replace(199, 201, 32, 8, 1, 1, blockLayer);

                            map.replace(211, 213, 31, 9, 1, 1, blockLayer);
                            map.replace(212, 214, 32, 9, 1, 1, blockLayer);

                            map.replace(224, 226, 31, 10, 1, 1, blockLayer);
                            map.replace(225, 227, 32, 10, 1, 1, blockLayer);

                        }
                        pointer.x = Maze.scenes[scene].endPos[0];
                        pointer.y = Maze.scenes[scene].endPos[1];
                        lastSuccessfullPosition.x = player.x;
                        lastSuccessfullPosition.y = player.y;
                        toogleRunButton();
                    }
                } else if (scene == 4) {
                    var messagetext = "Отлично! Все кадеты в сборе! Теперь мы летим в космос! Там вас ждет учебный бой против наших роботов.";
                    $("#modaltext").text(messagetext);
                    $("#mood").attr("src", "assets/images/win.png");
                    $("#exampleModal").modal();
                    lastSuccessfullPosition.x = player.x;
                    lastSuccessfullPosition.y = player.y;
                    pointer.kill();
                    try {
                        setIsCheckedForLesson();
                    } catch (e) {
                        console.log("couldn't set IsChecked For Lesson:" + e);
                    }
                }
            }
        }

        //TopDownGame.game.state.getCurrentState().key == "Game" 

        if (TopDownGame.game.state.getCurrentState().key == "lesson1") {

            if (scene == 0) {
                var isOverlapping = TopDownGame.game.physics.arcade.overlap(player, pointer, null, null, this);
                if (isOverlapping == true) {
                    $("#modaltext").text("Отлично получилось! Теперь попробуй дойди до конца коридора!");
                    $("#exampleModal").modal();

                    scene = 1;
                    pointer.x = Maze.scenes[scene].endPos[0];
                    pointer.y = Maze.scenes[scene].endPos[1];

                    lastSuccessfullPosition.x = player.x;
                    lastSuccessfullPosition.y = player.y;

                    toogleRunButton();

                    Blockly.mainWorkspace.clear();
                    Blockly.mainWorkspace.clearUndo();
                    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
                    try {
                        saveWorkspace();
                    } catch (e) {
                        console.log("couldn't save: " + e);
                    }
                }


            } else if (scene == 1) {
                var isOverlapping = TopDownGame.game.physics.arcade.overlap(player, pointer, null, null, this);
                if (isOverlapping == true) {
                    $("#modaltext").text("Превосходно! Сейчас надо дойти до тех бочек!");
                    $("#exampleModal").modal();
                    scene = 2;
                    pointer.x = Maze.scenes[scene].endPos[0];
                    pointer.y = Maze.scenes[scene].endPos[1];

                    lastSuccessfullPosition.x = player.x;
                    lastSuccessfullPosition.y = player.y;

                    toogleRunButton();

                    Blockly.mainWorkspace.clear();
                    Blockly.mainWorkspace.clearUndo();
                    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
                    try {
                        saveWorkspace();
                    } catch (e) {
                        console.log("couldn't save: " + e);
                    }
                }


            } else if (scene == 2) {
                var isOverlapping = TopDownGame.game.physics.arcade.overlap(player, pointer, null, null, this);
                if (isOverlapping == true) {
                    $("#modaltext").text("Эти бочки преградили тебе путь. Расстреляй их, чтобы пройти дальше!");
                    $("#exampleModal").modal();
                    scene = 3;
                    pointer.x = Maze.scenes[scene].endPos[0];
                    pointer.y = Maze.scenes[scene].endPos[1];

                    lastSuccessfullPosition.x = player.x;
                    lastSuccessfullPosition.y = player.y;

                    toogleRunButton();

                    Blockly.mainWorkspace.clear();
                    Blockly.mainWorkspace.clearUndo();
                    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
                    try {
                        saveWorkspace();
                    } catch (e) {
                        console.log("couldn't save: " + e);
                    }
                }


            } else if (scene == 3) {
                var isOverlapping = TopDownGame.game.physics.arcade.overlap(player, pointer, null, null, this);
                if (isOverlapping == true) {
                    $("#modaltext").text("А теперь нужно найти и подстрелить 5 бочек с мишенями. Нельзя стрелять по бочкам с водой. Используй стрелочки, чтобы двигать карту и искать цели.");
                    $("#exampleModal").modal();
                    scene = 4;
                    pointer.x = Maze.scenes[scene].endPos[0];
                    pointer.y = Maze.scenes[scene].endPos[1];

                    lastSuccessfullPosition.x = player.x;
                    lastSuccessfullPosition.y = player.y;

                    toogleRunButton();

                    Blockly.mainWorkspace.clear();
                    Blockly.mainWorkspace.clearUndo();
                    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
                    try {
                        saveWorkspace();
                    } catch (e) {
                        console.log("couldn't save: " + e);
                    }

                    try {
                        setIsCheckedForLesson();
                    } catch (e) {
                        console.log("couldn't set IsChecked For Lesson" + e);
                    }
                }


            } else if (scene == 4) {
                var aliveBarrelsCount = 0;
                barrels.forEach(function (c) {
                    if (c["sprite"] == "needToHit" && c.health > 60) {
                        aliveBarrelsCount += 1;
                    }
                });
                if (aliveBarrelsCount == 0) {
                    $("#modaltext").text("Поздравляю! Ты прошел сложный уровень!");
                    $("#imagecontainer").attr('class', 'hero');
                    $("#mood").attr("src", "assets/images/win.png");
                    $("#exampleModal").modal();
                    lastSuccessfullPosition.x = player.x;
                    lastSuccessfullPosition.y = player.y;

                    Blockly.mainWorkspace.clear();
                    Blockly.mainWorkspace.clearUndo();
                    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);

                    try {
                        saveWorkspace();
                    } catch (e) {
                        console.log("couldn't save: " + e);
                    }


                } else {
                    $("#modaltext").text("Ты убрал не все нужные бочки!");
                    $("#imagecontainer").attr('class', 'hero_fail');
                    $("#mood").attr("src", "assets/images/fail.png");
                    $("#exampleModal").modal();
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
                Blockly.mainWorkspace.clear();
                Blockly.mainWorkspace.clearUndo();
                Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);

                TopDownGame.game.state.start('lesson22');
                scene = 2;
                toogleRunButton();
                try {
                    saveWorkspace();
                } catch (e) {
                    console.log("couldn't save");
                }

            } else {
                $("#modaltext").text("Ты подобрал не все сундуки!");
                $("#mood").attr("src", "assets/images/fail.png");
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
                TopDownGame.game.state.start('lesson23');
                scene = 3;
                toogleRunButton();
                Blockly.mainWorkspace.clear();
                Blockly.mainWorkspace.clearUndo();
                Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
                try {
                    saveWorkspace();
                } catch (e) {
                    console.log("couldn't save");
                }

            } else {
                $("#modaltext").text("Ты подобрал не все сундуки!");
                $("#mood").attr("src", "assets/images/fail.png");
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
                scene = 4;
                toogleRunButton();
                Blockly.mainWorkspace.clear();
                Blockly.mainWorkspace.clearUndo();
                Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
                try {
                    saveWorkspace();
                } catch (e) {
                    console.log("couldn't save");
                }

            } else {
                $("#modaltext").text("Ты подобрал не все сундуки!");
                $("#mood").attr("src", "assets/images/fail.png");
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
                scene = 5;
                TopDownGame.game.state.start('lesson25');
                Blockly.mainWorkspace.clear();
                Blockly.mainWorkspace.clearUndo();
                Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
                toogleRunButton();
                try {
                    saveWorkspace();
                } catch (e) {
                    console.log("couldn't save" + e);
                }
                try {
                    setIsCheckedForLesson();
                    $("#modaltext").text("Поздравляю! Тебе открыт следующий урок!");
                    $("#exampleModal").modal();
                } catch (e) {
                    console.log(e + "couldn't set IsChecked For Lesson");

                }
            } else {
                $("#modaltext").text("Ты подобрал не все сундуки!");
                $("#mood").attr("src", "assets/images/fail.png");
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

                $("#modaltext").text("Поздравляю! Ты прошел сложный уровень!");
                $("#mood").attr("src", "assets/images/win.png");
                $("#exampleModal").modal();
                lastSuccessfullPosition.x = player.x;
                lastSuccessfullPosition.y = player.y;
                Blockly.mainWorkspace.clear();
                Blockly.mainWorkspace.clearUndo();
                Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
                try {
                    saveWorkspace();
                } catch (e) {
                    console.log("couldn't save");
                }
                // try {
                //     setIsCheckedForLesson();
                // }
                // catch (e) {
                //     console.log("couldn't set IsCheckedForLesson");
                // }

            } else {
                $("#modaltext").text("Ты собрал не все сундуки!");
                $("#mood").attr("src", "assets/images/fail.png");
                $("#exampleModal").modal();
            }
        }
        if (TopDownGame.game.state.getCurrentState().key == "lesson3") {
            if (setblocks == tilestodraw.length) {
                if (scene == 6) {
                    $("#modaltext").text("Поздравляю! Ты закончил уровень №3");
                    $("#exampleModal").modal();
                    lastSuccessfullPosition.x = player.x;
                    lastSuccessfullPosition.y = player.y;
                    Blockly.mainWorkspace.clear();
                    Blockly.mainWorkspace.clearUndo();
                    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
                    try {
                        saveWorkspace();
                    } catch (e) {
                        console.log("couldn't save");
                    }
                    try {
                        setIsCheckedForLesson();
                    } catch (e) {
                        console.log("couldn't set IsChecked For Lesson");
                    }
                } else {
                    $("#nextButton").show();
                    $('#nextButton').one('click', function () {
                        scene += 1;

                        change_map('lesson3' + scene);
                        toogleRunButton();
                        try {
                            saveWorkspace();
                        } catch (e) {
                            console.log("couldn't save");
                        }
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
                    toogleRunButton();
                    try {
                        saveWorkspace();
                    } catch (e) {
                        console.log("couldn't save");
                    }
                } else if (scene == 5) {
                    var isOverlapping = TopDownGame.game.physics.arcade.overlap(player, pointer, null, null, this);
                    if (isOverlapping == true) {
                        pointer.visible = false;
                        scene = 42;
                        toogleRunButton();
                        try {
                            saveWorkspace();
                        } catch (e) {
                            console.log("couldn't save");
                        }
                        Blockly.mainWorkspace.clear();
                        Blockly.mainWorkspace.clearUndo();
                        Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);

                        load_map("lesson42");
                    }
                } else if (scene == 42) {
                    console.log("scene = ", scene);
                    var isOverlapping = TopDownGame.game.physics.arcade.overlap(player, pointer, null, null, this);
                    if (isOverlapping == true) {
                        $("#modaltext").text("Ты отлично справился! Альянс может гордится, что в его рядах есть такие умелые и умные рейнджеры как ты!");
                        $("#mood").attr("src", "assets/images/fail.png");
                        $("#exampleModal").modal();
                        lastSuccessfullPosition.x = player.x;
                        lastSuccessfullPosition.y = player.y;
                        Blockly.mainWorkspace.clear();
                        Blockly.mainWorkspace.clearUndo();
                        Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
                        try {
                            saveWorkspace();
                        } catch (e) {
                            console.log("couldn't save");
                        }
                        try {
                            setIsCheckedForLesson();
                        } catch (e) {
                            console.log("couldn't set IsChecked For Lesson");
                        }
                    }
                }
            }
        }
        if (TopDownGame.game.state.getCurrentState().key == "lesson5") {
            if (scene == "510") {
                if (map.getTile(5, 4, flour).index == 236) {

                    scene = "511";
                    load_scene(scene);
                    toogleRunButton();
                    $("#modaltext").text("Теперь доберись до указателя");
                    $("#exampleModal").modal();
                }
            } else {
                var isOverlapping = TopDownGame.game.physics.arcade.overlap(player, pointer, null, null, this);
                if (isOverlapping == true) {
                    if (scene == "511") {
                        lastSuccessfullPosition.x = player.x;
                        lastSuccessfullPosition.y = player.y;
                        scene = "512";
                        toogleRunButton();
                        load_scene(scene);
                        try {
                            saveWorkspace();
                        } catch (e) {
                            console.log("couldn't save");
                        }

                    } else if (scene == "512") {
                        lastSuccessfullPosition.x = player.x;
                        lastSuccessfullPosition.y = player.y;
                        scene = "513";
                        toogleRunButton();
                        load_scene(scene);
                        try {
                            saveWorkspace();
                        } catch (e) {
                            console.log("couldn't save");
                        }

                    } else if (scene == "513") {

                        loadmap('lesson52');
                        scene = "521";
                        toogleRunButton();
                        load_scene(scene);
                        try {
                            saveWorkspace();
                        } catch (e) {
                            console.log("couldn't save");
                        }


                        $("#modaltext").text(" Тут повсюду трупы. Что тут произошло? Надеюсь с отрядом все в порядке.");
                        $("#mood").attr("src", "assets/images/fail.png");
                        $("#exampleModal").modal();
                    } else if (scene == "521") {
                        lastSuccessfullPosition.x = player.x;
                        lastSuccessfullPosition.y = player.y;
                        $("#modaltext").text("Наконец-то пришла помощь! Мы нашли важный след Агносто. Но нас атаковали и мы не можем вернуться. Есть раненные. Помоги нам доставить следы Агносто на базу альянса!");
                        $("#exampleModal").modal();
                        revealArea();
                        scene = "522";
                        load_scene(scene);
                        try {
                            saveWorkspace();
                        } catch (e) {
                            console.log("couldn't save");
                        }
                        toogleRunButton();

                    } else if (scene == "522") {
                        loadmap('lesson53');
                        $("#modaltext").text("Путь к точке эвакуации проходит через реку. Нужно засыпать дорогу для отряда.");
                        $("#exampleModal").modal();
                        scene = "531";
                        load_scene(scene);
                        try {
                            saveWorkspace();
                        } catch (e) {
                            console.log("couldn't save");
                        }
                        toogleRunButton();

                    } else if (scene == "531") {

                        var notfilledblocks = 0;
                        for (var y = 6; y <= 7; ++y) {
                            for (var x = 9; x <= 14; ++x) {
                                if (map.getTile(x, y, 'flour').index == 235) {
                                    notfilledblocks += 1;
                                }
                            }
                        }
                        if (notfilledblocks > 0) {
                            $("#modaltext").text("Нужно засыпать все блоки на мосту");
                            $("#exampleModal").modal();
                        } else {
                            $("#modaltext").text("Поздравляю! Следующий урок разблокирован!");
                            $("#mood").attr("src", "assets/images/win.png");
                            $("#exampleModal").modal();
                            lastSuccessfullPosition.x = player.x;
                            lastSuccessfullPosition.y = player.y;
                            Blockly.mainWorkspace.clear();
                            Blockly.mainWorkspace.clearUndo();
                            Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
                            try {
                                saveWorkspace();
                            } catch (e) {
                                console.log("couldn't save");
                            }

                            try {
                                setIsCheckedForLesson();
                            } catch (e) {
                                console.log("couldn't set IsChecked For Lesson");
                            }
                        }
                    }
                }
            }
        }
    }

function toogleRunButton() {
    $('#play').val() == "play" ? play_int() : play_pause();
    $('#play').find('i:first').toggleClass('fa-play fa-refresh');
    $('#play').toggleClass('play reset');
}

function revealArea() {
    var replaceFill = [
        [7, 3],
        [8, 3],
        [9, 3],
        [10, 3],
        [11, 3],
        [7, 4],
        [8, 4],
        [9, 4],
        [10, 4],
        [11, 4],
        [12, 4],
        [13, 4],
        [7, 5],
        [8, 5],
        [9, 5],
        [10, 5],
        [11, 5],
        [12, 5],
        [13, 5],
        [7, 6],
        [8, 6],
        [9, 6],
        [10, 6],
        [11, 6],
        [12, 6],
        [13, 6],
        [8, 7],
        [9, 7],
        [10, 7],
        [11, 7],
        [12, 7],
        [13, 7],
        [8, 8],
        [9, 8],
        [10, 8],
        [11, 8],
        [12, 8],
    ];
    var replaceContour = [
        [6, 2],
        [7, 2],
        [8, 2],
        [9, 2],
        [10, 2],
        [11, 2],
        [12, 2],
        [13, 3],
        [14, 3],
        [14, 4],
        [14, 5],
        [14, 6],
        [14, 7],
        [14, 8],
        [13, 8],
        [13, 9],
        [12, 9],
        [11, 9],
        [10, 9],
        [9, 9],
        [8, 9],
        [7, 9],
        [7, 8],
        [7, 7],
        [6, 7],
        [6, 6],
        [6, 5],
        [6, 4],
        [6, 3],
    ];

    for (var i = 0; i < replaceFill.length; i++) {
        map.putTile(244, replaceFill[i][0], replaceFill[i][1], fog);
    }

    for (var i = 0; i < replaceContour.length; i++) {
        for (var y = replaceContour[i][1] - 1; y <= replaceContour[i][1] + 1; ++y) {
            for (var x = replaceContour[i][0] - 1; x <= replaceContour[i][0] + 1; ++x) {

                var t_id = normalize(replaceContour[i][0], replaceContour[i][1]);

                map.putTile(t_id, replaceContour[i][0], replaceContour[i][1], fog);
            }
        }
    }
}


function saveWorkspace() {
    var params = location.href.split('?')[1].split('&');
    var urldata = {};
    for (var x in params) {
        urldata[params[x].split('=')[0]] = params[x].split('=')[1];
    }
    urldata.token = decodeURIComponent(urldata.token);
    var newTemp = "";

    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    newTemp = xmlText.replace(/"/g, "'");



    var datatoStore = {};
    datatoStore.code = newTemp;
    datatoStore.scene = scene;
    datatoStore.positionX = lastSuccessfullPosition.x;
    datatoStore.positionY = lastSuccessfullPosition.y;

    $.ajax({
        type: "POST",
        url: "https://backend.it.robooky.ru/api/save",
        headers: {
            "Authorization": urldata.token
        },
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify({
            "data": JSON.stringify(datatoStore),
            "lessonId": urldata["lesson-id"]
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log("saved");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
}

function loadWorkspace(clesson) {

    var params = location.href.split('?')[1].split('&');
    var urldata = {};
    for (var x in params) {
        urldata[params[x].split('=')[0]] = params[x].split('=')[1];
    }
    urldata.token = decodeURIComponent(urldata.token);
    $.ajax({
        type: 'GET',
        url: 'https://backend.it.robooky.ru/api/save?lesson-id=' + urldata["lesson-id"] + '&user-id=' + urldata["student-id"],
        headers: {
            "Authorization": urldata.token
        },
        success: function (data) {
            if (data) {
                try {
                    var code = JSON.parse(data.data).code;
                    scene = JSON.parse(data.data).scene;
                    if (clesson == 'lesson2') {
                        TopDownGame.game.state.start(clesson + scene);
                    } else {
                        lastSuccessfullPosition = {
                            x: JSON.parse(data.data).positionX,
                            y: JSON.parse(data.data).positionY
                        };
                        TopDownGame.game.state.start(clesson);
                    }

                    try {
                        Blockly.mainWorkspace.clear();
                        var xmlDom = Blockly.Xml.textToDom(code);
                        Blockly.Xml.domToWorkspace(xmlDom, Blockly.mainWorkspace);
                    } catch (e) {
                        Blockly.mainWorkspace.clear();

                        Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
                    }


                } catch (e) {
                    console.log(e);
                    if (clesson == 'lesson2') {
                        TopDownGame.game.state.start('lesson21');
                    } else {
                        TopDownGame.game.state.start(clesson);
                    }
                }
            } else {
                if (clesson == 'lesson2') {
                    TopDownGame.game.state.start('lesson21');
                } else {
                    TopDownGame.game.state.start(clesson);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);

        }
    });

}

function getSelfInfo() {

    var params = location.href.split('?')[1].split('&');
    var urldata = {};
    for (var x in params) {
        urldata[params[x].split('=')[0]] = params[x].split('=')[1];
    }
    urldata.token = decodeURIComponent(urldata.token);
    $.ajax({
        type: 'GET',
        url: 'https://backend.it.robooky.ru/api/users/self',
        headers: {
            "Authorization": urldata.token
        },
        success: function (data) {
            if (data) {
                Pegman.firstName = data.firstName;
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}

function setIsCheckedForLesson() {
    console.log("level was complete");
    var params = location.href.split('?')[1].split('&');
    var urldata = {};
    for (var x in params) {
        urldata[params[x].split('=')[0]] = params[x].split('=')[1];
    }
    urldata.token = decodeURIComponent(urldata.token);

    $.ajax({
        type: "POST",
        url: "https://backend.it.robooky.ru/api/courses/" + urldata['course-id'] + "/lessons/" + urldata['lesson-id'] + "?action=set-checked&isChecked=true&studentId=" + urldata['student-id'],
        headers: {
            "Authorization": urldata.token
        },
        success: function (data) {
            window.parent.postMessage({
                fromIframe: true,
                command: 'updateSidebar'
            }, '*');
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });

}

var runProgram = function () {


    var code = Blockly.JavaScript.workspaceToCode(workspace);
    Pegman.vdposX = Pegman.dposX;
    Pegman.vdposY = Pegman.dposY;

    if (TopDownGame.game.state.getCurrentState().key == "lesson5") {

        try {
            var tileLeft = map.getTile(Pegman.vdposX - 1, Pegman.vdposY, map.getLayer());
            Pegman.isGladeToLeft = tileLeft.index == 235;
        } catch (e) {}
        try {
            var tileRight = map.getTile(Pegman.vdposX + 1, Pegman.vdposY, map.getLayer());
            Pegman.isGladeToRight = tileRight.index == 235;
        } catch (e) {}
        try {
            var tileAbove = map.getTile(Pegman.vdposX, Pegman.vdposY - 1, map.getLayer());
            Pegman.isGladeAbove = tileAbove.index == 235;
        } catch (e) {}
    }

    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
    Pegman.play();
    TopDownGame.game.camera.follow(player);
    player.body.enable = true;

    try {
        saveWorkspace();
    } catch (e) {
        console.log("couldn't save: " + e);
    }
}


var resetProgram = function () {
    player.body.enable = false;
    try {
        weapon.fireAngle = Phaser.ANGLE_RIGHT;
    } catch (e) {

    }
    Pegman.reset2();
    TopDownGame.game.camera.unfollow(player);
}


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function findObjectsByType(type, map, layer) {
    var result = new Array();
    var elemid;
    map.objects[layer].forEach(function (element) {
        var i;

        for (i = 0; i < element.properties.length; i++) {

            if (element.properties[i].value === type) {
                elemid = i;
                element.y -= map.tileHeight;
                result.push(element);
            }
        }
    });
    return result;
}
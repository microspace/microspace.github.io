/*
import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles.min.js';
*/
import Player from '../sprites/Player'
import Pointer from '../sprites/Pointer'
import Bullet from '../sprites/Bullet'
import {
    modal
} from '../helpers/modals'
import {
    toogleRunButton
} from '../helpers/utils';





class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        // this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles');
    }

    create() {
        this.subscene = 0;

        // Add the map + bind the tileset
        this.map = this.make.tilemap({
            key: 'map'
        });
        this.tileset = this.map.addTilesetImage('tileSheet04-01', 'tiles');

        // Dynamic layer because we want breakable and animated tiles
        // this.groundLayer = this.map.createDynamicLayer('world', this.tileset, 0, 0);

        this.flour = this.map.createDynamicLayer("flour", this.tileset, 0, 0);
        this.onFlour = this.map.createStaticLayer("onFlour", this.tileset, 0, 0);
        this.blockLayer = this.map.createDynamicLayer("blockLayer", this.tileset, 0, 0);
        this.sinkLayer = this.map.createDynamicLayer("sinkLayer", this.tileset, 0, 0);
        this.onBlockLayer = this.map.createStaticLayer("onBlockLayer", this.tileset, 0, 0);
        this.upperLayer = this.map.createStaticLayer("upperLayer", this.tileset, 0, 0);



        // В Тайлед для тайла нужно добавить такое свойство для столкновений
        this.blockLayer.setCollisionByProperty({
            collide: true
        });

        this.keys = {

            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        };


        // ограничиваем движения камеры под размер карты
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);



        this.cursors = this.input.keyboard.createCursorKeys();
        var controlConfig = {
            camera: this.cameras.main,
            left: this.cursors.left,
            right: this.cursors.right,
            up: this.cursors.up,
            down: this.cursors.down,
            speed: 0.5,
            disableCull: true,

        };
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);




        this.particles = this.add.particles('explosion');

        this.particles.createEmitter({
            frame: 'muzzleflash2',
            lifespan: 200,
            scale: {
                start: .5,
                end: 0
            },
            rotate: {
                start: 0,
                end: 180
            },
            on: false
        });

        this.bullets = this.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true
        });


        this.scale.on('resize', () => {
            //  подгоняем карту под размер канваса
            const canvasH = document.getElementById("phaser-example").offsetHeight;
            const canvasW = document.getElementById("phaser-example").offsetWidth;
            this.cameras.main.setSize(canvasW, canvasH);
            // тут надо поработать.. зум неверно вычисляется
            if (this.cameras.main.displayHeight > this.map.heightInPixels * this.cameras.main.zoom) {
                this.cameras.main.setZoom(this.cameras.main.displayHeight / this.map.heightInPixels);
            }

        });

        let playerXY, pointerXY = {};

        if (this.subscene == 0) {
            playerXY = this.parseObjectLayers('playerStartPosition', this.map, 'playerLayer');
            pointerXY = this.parseObjectLayers('scene1Goal', this.map, 'playerLayer');
        } else if (this.subscene == 1) {
            playerXY = this.parseObjectLayers('scene1Goal', this.map, 'playerLayer');
            pointerXY = this.parseObjectLayers('scene2Goal', this.map, 'playerLayer');
        } else if (this.subscene == 2) {
            playerXY = this.parseObjectLayers('scene2Goal', this.map, 'playerLayer');
            pointerXY = this.parseObjectLayers('scene3Goal', this.map, 'playerLayer');
        } else if (this.subscene == 3) {
            playerXY = this.parseObjectLayers('scene3Goal', this.map, 'playerLayer');
            pointerXY = this.parseObjectLayers('scene4Goal', this.map, 'playerLayer');
        } else if (this.subscene == 4) {
            playerXY = this.parseObjectLayers('scene4Goal', this.map, 'playerLayer');
            pointerXY = this.parseObjectLayers('scene5Goal', this.map, 'playerLayer');
        }
        this.player = new Player(this, playerXY.x, playerXY.y - 10, 'player');
        this.pointer = new Pointer(this, pointerXY.x, pointerXY.y, 'pointer');

        this.player.setDepth(1); // Игрок поверх пуль



        this.destroyBridge();
        this.flour.setTileIndexCallback(229, this.restoreBridge, this);
        this.sinkLayer.setTileIndexCallback([...Array(500).keys()], this.sinkInWater, this);

        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        const resultXY = this.parseObjectLayers('goldenKey', this.map, 'objectLayer');
        this.goldenKey = this.add.sprite(resultXY.x + 16, resultXY.y - 16, 'goldenKey');
        this.goldenKey.play('shadow');
        this.physics.world.enable(this.goldenKey);
        this.goldenKey.body.setSize(30, 30);
        this.goldenKey.body.setOffset(0, 32);


        this.physics.add.collider(this.player, this.flour);
        this.physics.add.collider(this.player, this.blockLayer, this.tileCollision);
      //  this.physics.add.collider(this.player, this.sinkLayer, this.sinkInWater);
        
        this.drownTween = this.tweens.add({
            targets: this.player,
            scaleX: 0.1,
            scaleY: 0.1,
            ease: 'Linear',
            duration: 500,
            delay: 100,
            yoyo: false,
            repeat: 0,
            paused: true,
            onComplete: function () {this.player.alpha = 0},
            callbackScope: this
        });
        this.rotateTween = this.tweens.add({
            targets: this.player,
            ease: 'Linear',
            duration: 1000,
            yoyo: false,
            repeat: 0,
            paused: true,
            angle: 300,
            callbackScope: this
        });
        this.moveTween = this.tweens.add({
            targets: this,
            x: 0,
            y: 0,
            ease: 'Linear',
            duration: 1000,
            yoyo: false,
            repeat: 0,
            paused: true,
            callbackScope: this
        });
    }


    tileCollision(sprite, tile) {
        console.log("collide")
        sprite.stack = [];
        sprite.play('collision');
        sprite.on('animationcomplete', (() => {
            sprite.off('animationcomplete');
            sprite.play('idle')
        }), this.scene);


    }
    update(time, delta) {

        this.controls.update(delta);
        if (this.keys.up.isDown || this.keys.down.isDown || this.keys.left.isDown || this.keys.right.isDown) {
            this.cameras.main.stopFollow();
        }
        if (this.keys.zoomIn.isDown) {
            this.cameras.main.setZoom(this.cameras.main.zoom + 0.01);
        } else if (this.keys.zoomOut.isDown) {
            //     this.cameras.main.setBounds(0, 0, 500, 500)
            if (this.cameras.main.displayHeight < this.map.heightInPixels * this.cameras.main.zoom) {
                this.cameras.main.setZoom(this.cameras.main.zoom - 0.01);
            }
        }
        if (this.player.hasGoldenKey) {
            this.goldenKey.x = this.player.x - 40;
            this.goldenKey.y = this.player.y - 50;
        }
    }

    destroyBridge() {
        this.flour.removeTileAt(19, 7);
        this.flour.removeTileAt(20, 7);
        this.flour.removeTileAt(21, 7);
        this.flour.removeTileAt(19, 8);
        this.flour.removeTileAt(20, 8);
        this.flour.removeTileAt(21, 8);
        this.flour.removeTileAt(19, 9);
        this.flour.removeTileAt(20, 9);
        this.flour.removeTileAt(21, 9);

        this.sinkLayer.putTileAt(145, 19, 7);
        this.sinkLayer.putTileAt(145, 20, 7);
        this.sinkLayer.putTileAt(145, 21, 7);
        this.sinkLayer.putTileAt(134, 19, 8);
        this.sinkLayer.putTileAt(134, 20, 8);
        this.sinkLayer.putTileAt(134, 21, 8);
        this.sinkLayer.putTileAt(134, 19, 9);
        this.sinkLayer.putTileAt(134, 20, 9);
        this.sinkLayer.putTileAt(134, 21, 9);

        this.map.replaceByIndex(228, 229, 21, 2, 1, 1, this.flour);
    }

    restoreBridge() {
        this.sinkLayer.removeTileAt(19, 7);
        this.sinkLayer.removeTileAt(20, 7);
        this.sinkLayer.removeTileAt(21, 7);
        this.sinkLayer.removeTileAt(19, 8);
        this.sinkLayer.removeTileAt(20, 8);
        this.sinkLayer.removeTileAt(21, 8);
        this.sinkLayer.removeTileAt(19, 9);
        this.sinkLayer.removeTileAt(20, 9);
        this.sinkLayer.removeTileAt(21, 9);

        this.flour.putTileAt(107, 19, 7);
        this.flour.putTileAt(107, 20, 7);
        this.flour.putTileAt(107, 21, 7);
        this.flour.putTileAt(107, 19, 8);
        this.flour.putTileAt(107, 20, 8);
        this.flour.putTileAt(107, 21, 8);
        this.flour.putTileAt(107, 19, 9);
        this.flour.putTileAt(107, 20, 9);
        this.flour.putTileAt(107, 21, 9);

        this.map.replaceByIndex(229, 228, 21, 2, 1, 1, this.flour);

    }


    goldenKeyCallback(player, goldenKey) {
        goldenKey.play('noshadow');
        player.hasGoldenKey = true;

    }

    parseObjectLayers(type, map, layer) {
        let t = map.objects.filter(v => v.name == layer);
        let s = t[0].objects.filter(v => v.name == type);
        return {
            x: s[0].x,
            y: s[0].y
        };
    }

    checkFinal() {
        let isOverlapping = this.physics.world.overlap(this.player, this.pointer, null, null, this);
        if (isOverlapping) {
            if (this.subscene == 0) {


                var messagetext = `
                                <div class="tingle-demo tingle-demo-tiny">
                                <h1>Отлично получилось!</h1>
                                <p> Теперь попробуй дойди до следующего указателя!</p>
                                </div>`;

                modal.setContent(messagetext);

                modal.open();

                this.subscene = 1;
                const pointerXY = this.parseObjectLayers('scene2Goal', this.map, 'playerLayer');
                // перемещаем указатель в новую точку
                this.pointer.x = pointerXY.x;
                this.pointer.y = pointerXY.y;
                // записываем 
                this.player.lastPos.x = this.player.x;
                this.player.lastPos.y = this.player.y;


                toogleRunButton(this.game);
                try {
                    setIsCheckedForLesson();
                } catch (e) {
                    console.log("couldn't set IsChecked For Lesson");
                }


            } else if (this.subscene == 1) {
                var messagetext = `
                <div class="tingle-demo tingle-demo-tiny">
                <h1>Превосходно!</h1>
                <p>Нажми на кнопку <img src='assets/images/button.png' />, чтобы восстановить мост!</p>
                </div>`;
                modal.setContent(messagetext);
                modal.open();

                this.subscene = 2;
                const pointerXY = this.parseObjectLayers('scene3Goal', this.map, 'playerLayer');
                // перемещаем указатель в новую точку
                this.pointer.x = pointerXY.x;
                this.pointer.y = pointerXY.y;

                this.player.lastPos.x = this.player.x;
                this.player.lastPos.y = this.player.y;

                toogleRunButton(this.game);

            } else if (this.subscene == 2) {
                var messagetext = "Теперь нужно дойти до больших ворот, но они закрыты. Чтобы их открыть нужно взять ключ!";
                var messagetext = `
                <div class="tingle-demo tingle-demo-tiny">
                <h1></h1>
                <p>Теперь нужно дойти до больших ворот, но они закрыты. Чтобы их открыть нужно взять ключ!</p>
                </div>`;
                modal.setContent(messagetext);

                modal.open();

                this.subscene = 3;
                const pointerXY = this.parseObjectLayers('scene4Goal', this.map, 'playerLayer');
                // перемещаем указатель в новую точку
                this.pointer.x = pointerXY.x;
                this.pointer.y = pointerXY.y;
                this.player.lastPos.x = this.player.x;
                this.player.lastPos.y = this.player.y;
                toogleRunButton(this.game);

            } else if (this.subscene == 3) {


                if (this.player.hasGoldenKey) {
                    this.subscene = 4;

                    this.timer1 = this.time.delayedCall(500, openNarrow, [this.player], this);
                    this.timer2 = this.time.delayedCall(1000, openWide, [this.player], this);



                    function openNarrow() {

                        this.map.replaceByIndex(196, 198, 31, 8, 1, 1, this.blockLayer);
                        this.map.replaceByIndex(197, 199, 32, 8, 1, 1, this.blockLayer);

                        this.map.replaceByIndex(209, 211, 31, 9, 1, 1, this.blockLayer);
                        this.map.replaceByIndex(210, 212, 32, 9, 1, 1, this.blockLayer);

                        this.map.replaceByIndex(222, 224, 31, 10, 1, 1, this.blockLayer);
                        this.map.replaceByIndex(223, 225, 32, 10, 1, 1, this.blockLayer);
                        this.timer1.remove();

                    }

                    function openWide() {
                        this.map.replaceByIndex(198, 200, 31, 8, 1, 1, this.blockLayer);
                        this.map.replaceByIndex(199, 201, 32, 8, 1, 1, this.blockLayer);

                        this.map.replaceByIndex(211, 213, 31, 9, 1, 1, this.blockLayer);
                        this.map.replaceByIndex(212, 214, 32, 9, 1, 1, this.blockLayer);

                        this.map.replaceByIndex(224, 226, 31, 10, 1, 1, this.blockLayer);
                        this.map.replaceByIndex(225, 227, 32, 10, 1, 1, this.blockLayer);
                        this.timer2.remove();
                    }
                    const pointerXY = this.parseObjectLayers('scene5Goal', this.map, 'playerLayer');
                    // перемещаем указатель в новую точку
                    this.pointer.x = pointerXY.x;
                    this.pointer.y = pointerXY.y;
                    this.player.lastPos.x = this.player.x;
                    this.player.lastPos.y = this.player.y;
                    toogleRunButton(this.game);
                }
            } else if (this.subscene == 4) {
                var messagetext = "Отлично! Все кадеты в сборе! Теперь мы летим в космос! Там вас ждет учебный бой против наших роботов.";
                var messagetext = `
                <div class="tingle-demo tingle-demo-tiny">
                <h1>Отлично!</h1>
                <p>Все кадеты в сборе! Теперь мы летим в космос! Там вас ждет учебный бой против наших роботов.</p>
                </div>`;
                modal.setContent(messagetext);

                modal.open();
                this.player.lastPos.x = this.player.x;
                this.player.lastPos.y = this.player.y;
                this.pointer.destroy();
                toogleRunButton(this.game);
                try {
                    setIsCheckedForLesson();
                } catch (e) {
                    console.log("couldn't set IsChecked For Lesson:" + e);
                }
            }
        }
    }


}

export default GameScene;

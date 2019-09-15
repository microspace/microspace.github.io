import {
    config,
    dir2vec
} from '../helpers/config'


export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setSize(50, 13);
        this.body.setOffset(40, 73);

        this.setPosition(x, y);
        this.play('idle');
        this.stack = [];

        this.pos = {
            x: Math.floor(x / config.tileSize),
            y: Math.floor(y / config.tileSize)
        };

        this.lastPos = {
            x: x,
            y: y
        };

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.scene.physics.world.overlap(this, this.scene.goldenKey, this.scene.goldenKeyCallback, null, this.scene);

    }



    fireBullet() {
        let bullet = this.scene.bullets.get();
        if (bullet) {
            bullet.fire(this.x, this.y, this.flipX);
            this.play('fire');
            this.on('animationcomplete', () => {
                this.play('idle');
            }, this);
            this.scene.events.on('bullethit', () => {
                this.executeNext()
            }, this);
        }
    }

    move(vector) {

        if (vector.x < 0) {
            this.flipX = true;
        } else if (vector.x > 0) {
            this.flipX = false;
        }
        this.body.setVelocity(config.speedFactor * config.tileSize * vector.x, config.speedFactor * config.tileSize * vector.y);
        this.play('walk');
        this.timer = this.scene.time.delayedCall(config.stepTime / config.speedFactor, onEvent, [this], this.scene);

        function onEvent(player) {
            player.body.setVelocity(0, 0);
            player.play('idle');
            player.executeNext();
        }
    }

    reset() {
        // очищаем стэк команд
        this.stack = [];
        this.play("idle");
        // останавливаем спрайт
        this.setVelocity(0, 0);
        // удаляем таймер отвещающий за время движения игрока со скоростью
        this.timer.remove();
        // устанавливаем в исходную точку (в пикселях)
        this.setPosition(this.lastPos.x, this.lastPos.y);
        this.scene.destroyBridge();
        if (this.hasGoldenKey) {
            this.hasGoldenKey = false;
            const resultXY = this.scene.parseObjectLayers('goldenKey', this.scene.map, 'objectLayer');
            this.scene.goldenKey.x = resultXY.x + 16;
            this.scene.goldenKey.y = resultXY.y - 16;
        }


        this.scene.drownTween.restart();
        this.scene.rotateTween.restart();
        this.scene.moveTween.restart();
        this.scene.drownTween.pause();
        this.scene.rotateTween.pause();
        this.scene.moveTween.pause();


        this.scaleX = 1;
        this.scaleY = 1;
        this.angle = 0;
        this.alpha = 1;
    }

    schedule(arg) {
        let times = arg.step;
        delete arg.step;
        for (let i = 1; i <= times; i++) {
            this.stack.push(arg);

        }

    }

    execute() {
        //  todo:  убрать время если камера близко к игроку
        this.scene.cameras.main.pan(this.x, this.y, 250, 'Linear')
        //  наводим камеру, затем запускаем код
        this.scene.cameras.main.on(Phaser.Cameras.Scene2D.Events.PAN_COMPLETE, () => {
            this.scene.cameras.main.off(Phaser.Cameras.Scene2D.Events.PAN_COMPLETE) // вознил глюк с двойным срабатыванием события. Пока решение - это удалять его. Поото мнадо придумать что нибуь поулчше
            this.scene.cameras.main.startFollow(this, true, 0.08, 0.08);
            this.executeNext();
        });

    }

    executeNext() {
        if (this.stack.length <= 0) {
            this.scene.checkFinal();
            return;
        }

        // выравнивание по сетке
        let currentTile = this.scene.map.getTileAtWorldXY(this.x, this.y, false, this.scene.cameras.main, this.scene.flour)
        if (!currentTile) {
            currentTile = this.scene.map.getTileAtWorldXY(this.x, this.y, false, this.scene.cameras.main, this.scene.sinkLayer)
        }
        if (this.x - currentTile.pixelX > 1 || this.y - currentTile.pixelY > 1) {
            this.x = currentTile.pixelX + 32;
            this.y = currentTile.pixelY + 19;
        }

        // утонуть 
        let sinkTile = this.scene.map.getTileAtWorldXY(this.x, this.y, false, this.scene.cameras.main, this.scene.sinkLayer)
        if (sinkTile) {
            this.stack = [];
            this.scene.moveTween.x = this.x;
            this.scene.moveTween.y = this.y + 64;
            this.scene.drownTween.restart();
            this.scene.rotateTween.restart();
            this.scene.moveTween.restart();


            return;
        }

        let action = this.stack.shift();

        switch (action.name) {
            case "move":
                this.move(dir2vec[action.direction]);
                break;
            case "fire":
                this.fireBullet();
                break;

        }
    }



}

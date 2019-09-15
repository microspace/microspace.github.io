import {
    config,
    dir2vec
} from '../helpers/config'


export default class Pointer extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setSize(10, 65, 48, 10);

        this.setPosition(x, y);
        this.play('attract');
        this.overlapTriggered = false;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

}

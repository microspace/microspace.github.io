export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene);
        this.setTexture('bullet');
        this.setPosition(0, 0);
        scene.physics.world.enable(this);
        this.body.setSize(8, 8);
        this.body.offset.set(12, 12);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.speed = Phaser.Math.GetSpeed(400, 1);

        this.body.world.on('worldbounds', function (body) {
            // Check if the body's game object is the sprite you are listening for
            if (body.gameObject === this) {
                // Stop physics and render updates for this object
                this.setActive(false);
                this.setVisible(false);
                this.scene.events.emit('bullethit');
            }
        }, this);

    }
    preUpdate(time, delta) {
        this.scene.physics.world.collide(this, this.scene.blockLayer, () => {
            this.body.velocity.y = 0;
            this.setActive(false);
            this.setVisible(false);
            this.scene.particles.emitParticleAt(this.body.x, this.body.y - 10);
            this.scene.events.emit('bullethit');
        });
    }
    fire(x, y, left) {
        this.setPosition(x, y-12);
        this.body.setVelocity(200 * (left ? -1 : 1), 0);
        this.setActive(true);
        this.setVisible(true);
    }
}

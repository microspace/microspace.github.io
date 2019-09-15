export default function makeAnimations(scene) {
    // TONS of animations. Everything animation-related is ugly and stupid below.
    // TODO:  maybe use JSON to load animations
    
    var config = {
        key: 'idle',
        frames: scene.anims.generateFrameNumbers("player", {
            frames: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
        }),
        frameRate: 10,
        repeat: -1
    };

    scene.anims.create(config);

    scene.anims.create({
        key: 'collision',
        frames: scene.anims.generateFrameNumbers("player", {
            frames: [25, 26, 27, 28, 29]
        }),
        frameRate: 10
    });

    scene.anims.create({
        key: 'walk',
        frames: scene.anims.generateFrameNumbers("player", {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }),
        frameRate: 7,
        yoyo: true,
        repeat: -1
    });

    scene.anims.create({
        key: 'fire',
        frames: scene.anims.generateFrameNumbers("player", {
            frames: [20, 21, 22, 23, 24]
        }),
        frameRate: 7,
    });

    scene.anims.create({
        key: 'attract',
        frames: scene.anims.generateFrameNumbers("pointer", {
            frames: [0, 1]
        }),
        frameRate: 2,
        repeat: -1
    });

    scene.anims.create({
        key: 'shadow',
        frames: scene.anims.generateFrameNumbers("goldenKey", {
            frames: [1]
        }),
        frameRate: 1,
        repeat: -1
    });

    scene.anims.create({
        key: 'noshadow',
        frames: scene.anims.generateFrameNumbers("goldenKey", {
            frames: [0]
        }),
        frameRate: 1,
        repeat: -1
    });
/*     player.animations.add('NORTH', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], fps, true);
    player.animations.add('EAST', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], fps, true);
    player.animations.add('SOUTH', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], fps, true);
    player.animations.add('WEST', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], fps, true);
    player.animations.add('WEST_SOUTH', [14], fps, false);
    player.animations.add('SOUTH_WEST', [14], fps, false);
    player.animations.add('WEST_NORTH', [14], fps, false);
    player.animations.add('NORTH_WEST', [14], fps, false);
    player.animations.add('EAST_SOUTH', [14], fps, false);
    player.animations.add('SOUTH_EAST', [14], fps, false);
    player.animations.add('EAST_NORTH', [14], fps, false);
    player.animations.add('NORTH_EAST', [14], fps, false);
    player.animations.add('STAND', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], fps, true);
    player.animations.add('HIT', [25, 26, 27, 28, 29], fps, false);
    player.animations.add('SHOOT', [20, 21, 22, 23, 24], fps, false);
    player.animations.play('STAND'); */
}

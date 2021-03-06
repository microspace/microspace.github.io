var TopDownGame = TopDownGame || {};


var player;
var explosion;
var cp;
var barrels;
var flag = false;
var hitflag = false;
var explosionSound = null;
var hitWallSound = null;
var bubbleSound = null;
var keyPickUpSound = null;
var clickSound = null;
var map;
var drawLayer;
var showflag = true;
Pegman.dposX = 11;
Pegman.dposY = 7;
//var data;
var capacity = 100;
var maxcaps2 = 100;
var myHealthBar;
var velocity = 400;
var sinkflag = false;

var timeSinceLastIncrement = 0;
//title screen
TopDownGame.Lesson4 = function () {};
TopDownGame.Lesson4.prototype = {
    create: function () {

        this.shotSound = this.game.add.audio('shot');
        this.successSound = this.game.add.audio('success');
        explosionSound = this.game.add.audio("explosion");
        hitWallSound = this.game.add.audio('hitwall');
        bubbleSound = this.game.add.audio('bubble');
        keyPickUpSound = this.game.add.audio('keypickup');
        clickSound = this.game.add.audio('click');

        Blockly.mainWorkspace.clear();
        Blockly.mainWorkspace.clearUndo();
        Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);


        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        map = this.game.add.tilemap('lesson41');
        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        map.addTilesetImage('tileSheetWinter', 'gameTiles');
        //create layer
        flour = map.createLayer('flour');
        //this.collision1 = map.createLayer('collision1');
        //this.collision2 = map.createLayer('collision2');


        onBlockLayer = map.createLayer('onBlockLayer');
        blockLayer = map.createLayer('blockLayer');
        sinkLayer = map.createLayer('sinkLayer');
        onFlour = map.createLayer('onFlour');

        pointer = this.game.add.sprite(0, 0, 'pointer');
        pointer.scale.setTo(0.8, 0.8);
        pointer.animations.add('ANIM', [0, 1], 2, /*loop*/ true);
        pointer.visible = false;
        pointer.animations.play('ANIM');

        this.game.physics.arcade.enable(pointer);
        pointer.anchor.setTo(0.5, 0.5);
        pointer.body.setSize(10, 65, 48, 10);

        this.createItems();
        weapon = this.game.add.weapon(20, 'bullet');

        if (scene === undefined || scene === null) {
            scene = 1;
        }

        if (Pegman.lsp.x * Pegman.lsp.y == 0) {
            var result = findObjectsByType('playerStartPosition', map, 'playerLayer');

            if (scene == 1 || scene == 2 || scene == 3) {

                Pegman.lsp.x = result[0].x;
                Pegman.lsp.y = result[0].y;

            } else if (scene == 4) {
                Pegman.lsp.x = Maze.SQUARE_SIZE * (10 + 0.5);
                Pegman.lsp.y = Maze.SQUARE_SIZE * (14 + 0.3);
            } else if (scene == 5) {
                Pegman.lsp.x = Maze.SQUARE_SIZE * (9 + 0.5);
                Pegman.lsp.y = Maze.SQUARE_SIZE * (4 + 0.3);
            }
        }



        player = this.game.add.sprite(Pegman.lsp.x, Pegman.lsp.y, 'pegman');

        upperLayer = map.createLayer('upperLayer');


        player.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.setSize(60, 13, 40, 73);
        flour.resizeWorld();

        var barConfig = {
            width: 150,
            height: 20,
            x: 600,
            y: 30,
            bg: {
                color: '#651828'
            },
            bar: {
                color: '#FEFF03'
            },
            animationDuration: 200,
            flipped: false
        };

        myHealthBar = new HealthBar(TopDownGame.game, barConfig);
        myHealthBar.setFixedToCamera(true);
        myHealthBar.setPercent(capacity);






        //bullets


        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletAngleOffset = 0;
        weapon.bulletSpeed = bulletSpeed;
        weapon.fireAngle = Phaser.ANGLE_RIGHT; // shoot at right direcion by default
        weapon.trackSprite(player, 0, -13, false); //-65 выведено экспериментальным путём
        //weapon.addBulletAnimation("fly", [0, 1, 2, 3, 4, 5, 6, 7], 40, true);

        //explosion
        explosion = this.game.add.sprite(0, 0, 'explosion');
        explosion.visible = false;
        explanim = explosion.animations.add('EXPL', [0, 1, 2, 3, 4, 5], 20, /*loop*/ false);
        explanim.onComplete.add(this.animationStopped, this);

        var fps = 7;
        player.animations.add('NORTH', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], fps, /*loop*/ true);
        player.animations.add('EAST', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], fps, /*loop*/ true);
        player.animations.add('SOUTH', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], fps, /*loop*/ true);
        player.animations.add('WEST', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], fps, /*loop*/ true);
        player.animations.add('WEST_SOUTH', [14], fps, /*loop*/ false);
        player.animations.add('SOUTH_WEST', [14], fps, /*loop*/ false);
        player.animations.add('WEST_NORTH', [14], fps, /*loop*/ false);
        player.animations.add('NORTH_WEST', [14], fps, /*loop*/ false);
        player.animations.add('EAST_SOUTH', [14], fps, /*loop*/ false);
        player.animations.add('SOUTH_EAST', [14], fps, /*loop*/ false);
        player.animations.add('EAST_NORTH', [14], fps, /*loop*/ false);
        player.animations.add('NORTH_EAST', [14], fps, /*loop*/ false);
        player.animations.add('STAND', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], fps, /*loop*/ true);
        player.animations.add('HIT', [25, 26, 27, 28, 29], fps, /*loop*/ false);
        player.animations.add('SHOOT', [20, 21, 22, 23, 24], fps, /*loop*/ false);
        player.animations.play('STAND');
        Pegman.init(player, this);


        if (scene != 42 && scene != 43) {
            load_scene();
        } else if (scene == 42) {
            load_map("lesson42");
        } else if (scene == 43) {

            load_map("lesson42");
            var result = findObjectsByType('scene1Goal', map, 'playerLayer');
            Pegman.lsp.x = result[0].x;
            Pegman.lsp.y = result[0].y;

            player.x = result[0].x;
            player.y = result[0].y;

            pointer.x = 0;
            pointer.y = 0;
            $("#play").prop('disabled', true);

        }
        //the camera will follow the player in the world
        //this.game.camera.follow(player);
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        map.setTileIndexCallback([...Array(500).keys()], sinkInWater, this, sinkLayer);
        map.setTileIndexCallback([...Array(500).keys()], hitEvent, this, blockLayer);
        TopDownGame.game.camera.flash(0x000000, 500);
        /*         h = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
                h.onDown.add(this.h_down, this);
                h.onUp.add(this.h_up, this);
                j = this.game.input.keyboard.addKey(Phaser.Keyboard.J);
                j.onDown.add(this.j_down, this);
                j.onUp.add(this.j_up, this);
                k = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
                k.onDown.add(this.k_down, this);
                k.onUp.add(this.k_up, this);
                l = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
                l.onDown.add(this.l_down, this);
                l.onUp.add(this.l_up, this); */
    },
    animationStopped: function (sprite, animation) {
        explosion.visible = false;
    },
    update: function () {
        this.game.physics.arcade.overlap(barrels, weapon.bullets, this.bulletHitBarrel, null, this);
        this.game.physics.arcade.collide(player, sinkLayer);
        this.game.physics.arcade.collide(player, blockLayer);
        this.game.physics.arcade.collide(player, barrels, hitEvent, null, this);

        if (this.cursors.up.isDown) {
            this.game.camera.unfollow();
            this.game.camera.y -= cameraSpeed;
        } else if (this.cursors.down.isDown) {
            this.game.camera.unfollow();
            this.game.camera.y += cameraSpeed;
        }

        if (this.cursors.left.isDown) {
            this.game.camera.unfollow();
            this.game.camera.x -= cameraSpeed;
        } else if (this.cursors.right.isDown) {
            this.game.camera.unfollow();
            this.game.camera.x += cameraSpeed;
        }
        //camera end



        myHealthBar.setPercent(workspace.remainingCapacity() / (maxcaps2 - 1) * 100);

    },

    createItems: function () {
        //create items
        barrels = this.game.add.group();
        barrels.enableBody = true;
        result = findObjectsByType('barrel', map, 'objectLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, barrels);
        }, this);
    },

    //find objects in a Tiled layer that containt a property called "type" equal to a certain value

    //create a sprite from an object
    createFromTiledObject: function (element, group) {
        var sprite = group.create(element.x, element.y, 'totalsheet', 195);
        //copy all properties to the sprite
        element.properties.forEach(function (element) {


            sprite[element.name] = element.value;
        });
        sprite.health = 100;
        sprite.body.immovable = true;

    },
    bulletHitBarrel: function (sprite, bullet) {
        explosionSound.play();
        var damage = 48;
        sprite.damage(damage);
        if (sprite.health > 50) {
            sprite.frame = 196;
        } else if (sprite.health < 20) {
            sprite.frame = 197;
            sprite.body.enable = false; // отключаем физику чтобы пули пролетали сквозь остатки бочки
        }
        explosion.x = sprite.x;
        explosion.y = sprite.y - 30;
        explosion.visible = true;
        explosion.animations.play('EXPL');
        bullet.kill();
    },
};

function hitEvent() {
    if (!hitflag) {
        hitWallSound.play();
        Pegman.pegmanActions = [];
        if (Pegman.tween) {
            Pegman.tween.stop();
        }
        player.animations.play('HIT');
        hitflag = true;
    }
};

function sinkInWater() {
    if (sinkflag == false) {
        bubbleSound.play();
        sinkflag = true;
        var step = Maze.getStepInDirection[Maze.directionToString(Pegman.direction)];
        //убейте меня!
        if (Pegman.direction === Maze.DirectionType.NORTH) {
            coef = 2;
        } else {
            coef = 1;
        }
        Pegman.pegmanActions = [];
        if (Pegman.tween) {
            Pegman.tween.stop();
        }
        this.tween = TopDownGame.game.add.tween(player).to({
            x: player.x + step[0] * Maze.SQUARE_SIZE,
            y: player.y + step[1] * Maze.SQUARE_SIZE / coef,
        }, 500, Phaser.Easing.Linear.In, true);
        this.tween.onComplete.addOnce(function () {
            player.animations.play("STAND");
            this.tween = TopDownGame.game.add.tween(player.scale).to({
                x: 0.1,
                y: 0.1
            }, 1000, Phaser.Easing.Linear.None, true);
            this.tween.onComplete.addOnce(function () {
                player.visible = false;
            }, this);
        }, this);
    }
};

function load_scene() {
    showflag = true;

    Blockly.mainWorkspace.clear();
    Blockly.mainWorkspace.clearUndo();
    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);

    if (scene == 1) {
        myHealthBar.barSprite.visible = false;
        myHealthBar.bgSprite.visible = false;
        myHealthBar.borderSprite.visible = false;
    } else if (scene == 2) {
        var newTree = `
        <xml id="toolbox" style="display: none; background-color: #4d90fe;">
        

        <block type="fire"></block>
        <block type="uturn"></block>
        <block type="repeat_n_times"></block>
        </xml>`;
        workspace.updateToolbox(newTree);
        maxcaps2 = 2 + 1;
        workspace.options.maxBlocks = maxcaps2;
        myHealthBar.barSprite.visible = true;
        myHealthBar.bgSprite.visible = true;
        myHealthBar.borderSprite.visible = true;

    } else if (scene == 3) {
        var newTree = `
        <xml id="toolbox" style="display: none; background-color: #4d90fe;">
        <block type="maze_up"></block>
        <block type="maze_down"></block>
        <block type="maze_left"></block>
        <block type="maze_right"></block>
        <block type="fire"></block>
        <block type="uturn"></block>
        <block type="repeat_n_times"></block>
        </xml>`;
        workspace.updateToolbox(newTree);
        maxcaps2 = 12 + 1;
        workspace.options.maxBlocks = maxcaps2;
    } else if (scene == 4) {
       
        var newTree = `
        <xml id="toolbox" style="display: none; background-color: #4d90fe;">
        <block type="maze_up"></block>
        <block type="maze_down"></block>
        <block type="maze_left"></block>
        <block type="maze_right"></block>
        <block type="fire"></block>
        <block type="uturn"></block>
        <block type="repeat_n_times"></block>
        </xml>`;
        workspace.updateToolbox(newTree);
        maxcaps2 = 5 + 1;
        workspace.options.maxBlocks = maxcaps2;
    } else if (scene == 5) {
        var newTree = `
        <xml id="toolbox" style="display: none; background-color: #4d90fe;">
        <block type="maze_up"></block>
        <block type="maze_down"></block>
        <block type="maze_left"></block>
        <block type="maze_right"></block>
        <block type="fire"></block>
        <block type="uturn"></block>
        <block type="repeat_n_times"></block>
        </xml>`;
        workspace.updateToolbox(newTree);
        maxcaps2 = 17 + 1;
        workspace.options.maxBlocks = maxcaps2;

        var result = findObjectsByType('scene5Goal', map, 'playerLayer');
        pointer.x = result[0].x;
        pointer.y = result[0].y;
        pointer.visible = true;
        pointer.animations.play('ANIM');

    }
    barrels.forEach(function (c) {
        if (c.scene == scene) {
            c.revive();
        } else {
            c.kill();
        }
    });
    Pegman.reset2();
}


function load_map(name) {
    var newTree = `
    <xml id="toolbox" style="display: none; background-color: #4d90fe;">
    <block type="maze_up"></block>
    <block type="maze_down"></block>
    <block type="maze_left"></block>
    <block type="maze_right"></block>
    <block type="fire"></block>
    <block type="uturn"></block>
    <block type="repeat_n_times"></block>
    </xml>`;
    workspace.updateToolbox(newTree);
    TopDownGame.game.camera.flash(0x000000, 1000);
    maxcaps2 = 15 + 1;
    workspace.options.maxBlocks = maxcaps2;
    try {
        map.destroy();
        flour.destroy();
        onFlour.destroy();
        blockLayer.destroy();
        onBlockLayer.destroy();
        sinkLayer.destroy();
        upperLayer.destroy();
        barrels.callAll('kill');
    } catch (e) {}


    map = TopDownGame.game.add.tilemap(name); //add tileset image     
    map.addTilesetImage('tileSheetWinter', 'gameTiles');
    flour = map.createLayer('flour');
    onFlour = map.createLayer('onFlour');
    blockLayer = map.createLayer('blockLayer');
    onBlockLayer = map.createLayer('onBlockLayer');

    var result = findObjectsByType('playerStartPosition', map, 'playerLayer');
    // player.x = result[0].x;
    // player.y = result[0].y;
    Pegman.lsp.x = result[0].x;
    Pegman.lsp.y = result[0].y;
    Pegman.reset2();




    var result = findObjectsByType('scene1Goal', map, 'playerLayer');

    pointer.x = result[0].x;
    pointer.y = result[0].y;
    pointer.visible = true;

    TopDownGame.game.time.events.add(500, fadePicture, this);
    barrels.removeAll();

    result = findObjectsByType('barrel', map, 'objectLayer');


    result.forEach(function (element) {
        createFromTiledObject2(element, barrels);
    }, this);


    function fadePicture() {
        if (scene == 42) {
            $("#imagecontainer").attr('class', "hero");
            $("#modaltext").text(get_l10n("game4", "m6"));
            $("#exampleModal").modal();
        }

        // загнал сюда, потому что глюк возникает когда плеер не успевает успеть
        sinkLayer = map.createLayer('sinkLayer');
        map.setTileIndexCallback([...Array(500).keys()], sinkInWater, this, sinkLayer);
        map.setTileIndexCallback([...Array(500).keys()], hitEvent, this, blockLayer);
        upperLayer = map.createLayer('upperLayer');
        try {
            TopDownGame.game.world.bringToTop(pointer);
            TopDownGame.game.world.bringToTop(barrels);
            TopDownGame.game.world.bringToTop(explosion);

            TopDownGame.game.world.bringToTop(weapon.bullets);
            TopDownGame.game.world.bringToTop(player);
            TopDownGame.game.world.bringToTop(myHealthBar.borderSprite);
            TopDownGame.game.world.bringToTop(myHealthBar.bgSprite);
            TopDownGame.game.world.bringToTop(myHealthBar.barSprite);

        } catch (e) {

        }


    }
    //scene1Goal



}


function createFromTiledObject2(element, group) {
    var sprite = group.create(element.x, element.y, 'totalsheet', 195);
    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function (key) {
        sprite[key] = element.properties[key];
    });
    sprite.health = 100;
    sprite.body.immovable = true;


}
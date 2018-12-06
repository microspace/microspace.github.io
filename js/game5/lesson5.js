var TopDownGame = TopDownGame || {};


var player;
var explosion;
var cp;
var flag = false;
var hitflag = false;
var scene;
var map;
var drawLayer;
var showflag = true;
var fog;
//var data;
var capacity = 100;
var maxcaps2 = 100;
var myHealthBar;
var velocity = 400;
var sinkflag = false;

var bmd;
var fringe;
var fogCircle;


var lastSuccessfullPosition = {
    x: Maze.SQUARE_SIZE * (4 + 0.5),
    y: Maze.SQUARE_SIZE * (3 + 0.5)
};
var dlastSuccessfullPosition = {
    x: null,
    y: null
};
var timeSinceLastIncrement = 0;
//title screen
TopDownGame.Lesson5 = function () { };
TopDownGame.Lesson5.prototype = {
    create: function () {

        Blockly.mainWorkspace.clear();
        Blockly.mainWorkspace.clearUndo();
        Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);


        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        map = this.game.add.tilemap('lesson51');
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

        pointer.animations.play('ANIM');
    
        this.game.physics.arcade.enable(pointer);
        pointer.anchor.setTo(0.5, 0.5);
        pointer.body.setSize(10, 65, 48, 10);
        var result = findObjectsByType('scene1Goal', map, 'playerLayer');

        pointer.x = result[0].x;
        pointer.y = result[0].y;

        this.createItems();
        weapon = this.game.add.weapon(20, 'bullet');
        

        // var glades = this.game.add.group();
        // glades.create((7 + getRandomInt(0, 4)) * 64, 3 * 64, 'water');
        // glades.create((7 + getRandomInt(0, 4)) * 64, 4 * 64, 'water');

        // map.replace(15, 154, 8 + getRandomInt(0, 4), 4, 1, 1, map.getLayer());
        // map.replace(15, 154, 8 + getRandomInt(0, 4), 5, 1, 1, map.getLayer());

        var result = findObjectsByType('playerStartPosition', map, 'playerLayer');
        
        
        lastSuccessfullPosition = {
            x: result[0].x,
            y: result[0].y
        };
        dlastSuccessfullPosition = {
            x: Math.floor(result[0].x / 64),
            y: Math.floor(result[0].y / 64)
        };        
        Pegman.dposX = dlastSuccessfullPosition.x;
        Pegman.dposY = dlastSuccessfullPosition.y;
        player = this.game.add.sprite(result[0].x, result[0].y, 'pegman');

        upperLayer = map.createLayer('upperLayer');
        fog = map.createLayer('fog');

        
        //map.setLayer(fog);
        //map.removeTile(9, 5, fog);
        

        player.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(player);
        player.body.setSize(60, 13, 40, 73);
        flour.resizeWorld();



        Pegman.init(player);
        scene = 1;
        load_scene();

        builddust = this.game.add.sprite(0, 0, 'build');
        builddust.visible = false;
        builddust.animations.add('BUILD', [0, 1, 2, 3, 4, 5], 20, false);
        //bullets


        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletAngleOffset = 0;
        weapon.bulletSpeed = 250;
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

        //the camera will follow the player in the world
        //this.game.camera.follow(player);
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        map.setTileIndexCallback([...Array(500).keys()], sinkInWater, this, sinkLayer);
        map.setTileIndexCallback(235, sinkInWater, this, flour);
        map.setTileIndexCallback([...Array(500).keys()], hitEvent, this, blockLayer);
        TopDownGame.game.camera.flash(0x000000, 500);
        h = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
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
        l.onUp.add(this.l_up, this);
    },
    animationStopped: function (sprite, animation) {
        explosion.visible = false;
    },
    h_down: function () {
        player.body.velocity.x = -1 * velocity;
    },
    h_up: function () {
        player.body.velocity.x = 0;
    },
    j_down: function () {
        player.body.velocity.y = -1 * velocity;
    },
    j_up: function () {
        player.body.velocity.y = 0;
    },
    k_down: function () {
        player.body.velocity.y =  velocity;
    },
    k_up: function () {
        player.body.velocity.y = 0;
    },
    l_down: function () {
        console.log(map.getTileRight(map.getLayer(), Pegman.dposX, Pegman.dposY));
    },
    l_up: function () {
        player.body.velocity.x = 0;
    },

    update: function () {
        
         map.removeTileWorldXY(player.x, player.y, Maze.SQUARE_SIZE, Maze.SQUARE_SIZE, fog);
         map.removeTileWorldXY(player.x - 64, player.y - 64, Maze.SQUARE_SIZE, Maze.SQUARE_SIZE, fog);
         map.removeTileWorldXY(player.x + 64, player.y + 64, Maze.SQUARE_SIZE, Maze.SQUARE_SIZE, fog);
         map.removeTileWorldXY(player.x - 64, player.y + 64, Maze.SQUARE_SIZE, Maze.SQUARE_SIZE, fog);
         map.removeTileWorldXY(player.x + 64, player.y - 64, Maze.SQUARE_SIZE, Maze.SQUARE_SIZE, fog);
         map.removeTileWorldXY(player.x - 64, player.y, Maze.SQUARE_SIZE, Maze.SQUARE_SIZE, fog);
         map.removeTileWorldXY(player.x + 64, player.y, Maze.SQUARE_SIZE, Maze.SQUARE_SIZE, fog);
         map.removeTileWorldXY(player.x, player.y - 64, Maze.SQUARE_SIZE, Maze.SQUARE_SIZE, fog);
         map.removeTileWorldXY(player.x, player.y + 64, Maze.SQUARE_SIZE, Maze.SQUARE_SIZE, fog);

        this.game.physics.arcade.overlap(barrels, weapon.bullets, this.bulletHitBarrel, null, this);
        this.game.physics.arcade.collide(player, sinkLayer);
        this.game.physics.arcade.collide(player, flour);
        this.game.physics.arcade.collide(player, blockLayer);
        this.game.physics.arcade.collide(player, barrels, hitEvent, null, this);

        //player.body.velocity.x = 0;
        // var velocity = 400;
        // if (this.cursors.up.isDown) {
        //     if (player.body.velocity.y == 0)
        //         player.body.velocity.y -= velocity;

        // } else if (this.cursors.down.isDown) {
        //     if (player.body.velocity.y == 0)
        //         player.body.velocity.y += velocity;
        // } else {
        //     player.body.velocity.y = 0;
        // }
        // if (this.cursors.left.isDown) {
        //     player.body.velocity.x -= velocity;
        // } else if (this.cursors.right.isDown) {
        //     player.body.velocity.x += velocity;
        // }
        //camera start
        if (this.cursors.up.isDown) {
            this.game.camera.unfollow();
            this.game.camera.y -= 10;
        }
        else if (this.cursors.down.isDown) {
            this.game.camera.unfollow();
            this.game.camera.y += 10;
        }

        if (this.cursors.left.isDown) {
            this.game.camera.unfollow();
            this.game.camera.x -= 10;
        }
        else if (this.cursors.right.isDown) {
            this.game.camera.unfollow();
            this.game.camera.x += 10;
        }
        //camera end


        try {
            myHealthBar.setPercent(workspace.remainingCapacity() / (maxcaps2 - 1) * 100);
        } catch { };
         
    },
    createItems: function () {
        //create items
        barrels = this.game.add.group();
        barrels.enableBody = true;
        result = this.findObjectsByType('barrel', map, 'objectLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, barrels);
        }, this);
    },

    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
    findObjectsByType: function (type, map, layer) {
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

            if (element.properties[elemid].value === type) {

            }

        });
        
        return result;
    },
    //create a sprite from an object
    createFromTiledObject: function (element, group) {
        var sprite = group.create(element.x, element.y, 'totalsheet', 234);
        //copy all properties to the sprite
        element.properties.forEach(function (element) {
            

            

            sprite[element.name] = element.value;
        });
        sprite.health = 100;
        sprite.body.immovable = true;
        //sprite.scale.set(2 , 2 );
        if (sprite["sprite"] === "needToHit") {
            sprite.frame = 195;
        }
        if (sprite["scene"] < scene) {
            sprite.frame = 197
        } else if (sprite["scene"] > scene) {
            sprite.kill();
        }
    },
    bulletHitBarrel: function (sprite, bullet) {
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
        Pegman.pegmanActions = [];
        if (Pegman.tween) {
            Pegman.tween.stop();
        }
        player.animations.play('HIT');
        hitflag = true;
    }
};

function sinkInWater() {
    console.log("s");
    if (sinkflag == false) {
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
    var runButton = document.getElementById('runButton');
    runButton.style.display = 'inline';
    document.getElementById('resetButton').style.display = 'none';
    // Prevent double-clicks or double-taps.
    runButton.disabled = false;
    Blockly.mainWorkspace.clear();
    Blockly.mainWorkspace.clearUndo();
    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);

    if (scene == 1) {

    }
    else if (scene == 2) {
        var newTree = `
        <xml id="toolbox" style="display: none; background-color: #4d90fe;">
        <block type="fire"></block>
        <block type="maze_up"></block>
        <block type="maze_down"></block>
        <block type="maze_left"></block>
        <block type="maze_right"></block>
        <block type="uturn"></block>
        <block type="repeat_n_times"></block>
        </xml>`;
        workspace.updateToolbox(newTree);
        //maxcaps2 = 2 + 1;
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
        <block type="repeat_n_times"></block>
        </xml>`;
        workspace.updateToolbox(newTree);
        //maxcaps2 = 11 + 1 + 1;
        workspace.options.maxBlocks = maxcaps2;
    } else if (scene == 4) {
        console.log(scene);
        var newTree = `
        <xml id="toolbox" style="display: none; background-color: #4d90fe;">
        <block type="maze_up"></block>
        <block type="maze_down"></block>
        <block type="maze_left"></block>
        <block type="maze_right"></block>
        <block type="fire"></block>
        <block type="repeat_n_times"></block>
        </xml>`;
        workspace.updateToolbox(newTree);
        //maxcaps2 = 5 + 1 + 10;
        workspace.options.maxBlocks = maxcaps2;
    } else if (scene == 5) {
        var newTree = `
        <xml id="toolbox" style="display: none; background-color: #4d90fe;">
        <block type="maze_up"></block>
        <block type="maze_down"></block>
        <block type="maze_left"></block>
        <block type="maze_right"></block>
        <block type="fire"></block>
        <block type="repeat_n_times"></block>
        </xml>`;
        workspace.updateToolbox(newTree);
        //maxcaps2 = 12 + 1 + 3;
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
    TopDownGame.game.camera.flash(0x000000, 1000);

    try {
        map.destroy();
        flour.destroy();
        onFlour.destroy();
        blockLayer.destroy();
        onBlockLayer.destroy();
        sinkLayer.destroy();
        upperLayer.destroy();
        barrels.callAll('kill');
    } catch { }


    map = TopDownGame.game.add.tilemap(name); //add tileset image     
    map.addTilesetImage('tileSheetWinter', 'gameTiles');
    flour = map.createLayer('flour');
    onFlour = map.createLayer('onFlour');
    blockLayer = map.createLayer('blockLayer');
    onBlockLayer = map.createLayer('onBlockLayer');

    var result = findObjectsByType('playerStartPosition', map, 'playerLayer');
    // player.x = result[0].x;
    // player.y = result[0].y;
    lastSuccessfullPosition.x = result[0].x;
    lastSuccessfullPosition.y = result[0].y;
    Pegman.reset2();

    //Copied from reset button code. Resets html button
    var runButton = document.getElementById('runButton');
    runButton.style.display = 'inline';
    document.getElementById('resetButton').style.display = 'none';
    // Prevent double-clicks or double-taps.
    runButton.disabled = false;


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
        // загнал сюда, потому что глюк возникает когда плеер не успевает успеть
        sinkLayer = map.createLayer('sinkLayer');
        map.setTileIndexCallback([...Array(500).keys()], sinkInWater, this, sinkLayer);
        map.setTileIndexCallback([...Array(500).keys()], hitEvent, this, blockLayer);
        try {
            TopDownGame.game.world.bringToTop(pointer);
            TopDownGame.game.world.bringToTop(barrels);
            TopDownGame.game.world.bringToTop(explosion);
            
            TopDownGame.game.world.bringToTop(weapon.bullets);
            TopDownGame.game.world.bringToTop(player);
        } catch { }

        upperLayer = map.createLayer('upperLayer');
    }
    //scene1Goal



}

function findObjectsByType(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function (element) {
        
        if (element.properties[0].value === type) {
            //Phaser uses top left, Tiled bottom left so we have to adjust
            //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
            //so they might not be placed in the exact position as in Tiled
            element.y -= map.tileHeight;
            result.push(element);
        }
    });

    return result;
}

function createFromTiledObject2(element, group) {
    var sprite = group.create(element.x, element.y, 'totalsheet', 234);
    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function (key) {
        sprite[key] = element.properties[key];
    });
    sprite.health = 100;
    sprite.body.immovable = true;
    //sprite.scale.set(2 , 2 );
    if (sprite["sprite"] === "needToHit") {
        sprite.frame = 195;
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
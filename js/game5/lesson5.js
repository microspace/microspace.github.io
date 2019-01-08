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
var updateFog;
var bmd;
var fringe;
var fogCircle;
var ccellx, xcelly;

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


        Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
        
        loadmap("lesson51");





        
    


        // pointer.visible = true;

        // var result = findObjectsByType('playerStartPosition', map, 'playerLayer');


        // lastSuccessfullPosition = {
        //     x: result[0].x,
        //     y: result[0].y
        // };
        // dlastSuccessfullPosition = {
        //     x: Math.floor(result[0].x / 64),
        //     y: Math.floor(result[0].y / 64)
        // };
        // Pegman.dposX = dlastSuccessfullPosition.x;
        // Pegman.dposY = dlastSuccessfullPosition.y;
        player = this.game.add.sprite(0, 0, 'pegman');




        //map.setLayer(fog);
        //map.removeTile(9, 5, fog);


        player.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(player);
        player.body.enable = false;
        player.body.setSize(60, 13, 40, 73);
        flour.resizeWorld();
        

        //fog.resizeWorld();

        pointer = this.game.add.sprite(0, 0, 'pointer');
        pointer.scale.setTo(0.8, 0.8);
        pointer.animations.add('ANIM', [0, 1], 2, /*loop*/ true);

        pointer.animations.play('ANIM');

        this.game.physics.arcade.enable(pointer);
        pointer.anchor.setTo(0.5, 0.5);
        pointer.body.setSize(10, 65, 48, 10);

        scene = 0;
        Pegman.init(player);

        load_scene(scene);

        builddust = this.game.add.sprite(0, 0, 'build');
        builddust.visible = false;
        builddust.animations.add('BUILD', [0, 1, 2, 3, 4, 5], 20, false);
        //bullets




        //explosion
        explosion = this.game.add.sprite(0, 0, 'explosion');
        explosion.visible = false;
        explanim = explosion.animations.add('EXPL', [0, 1, 2, 3, 4, 5], 20, /*loop*/ false);
        explanim.onComplete.add(this.animationStopped, this);
        
            this.game.world.bringToTop(pointer);
    
            this.game.world.bringToTop(explosion);
    
    
            this.game.world.bringToTop(player);
        
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


        if (map.key != "lesson53") {
        map.putTile(244, Pegman.dposX, Pegman.dposY, fog);
        updateFog = new Phaser.Signal();
        updateFog.add(function () {
            
           
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
        }, this.game);

        updateFog.dispatch();
    }
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
        player.body.velocity.y = velocity;
    },
    k_up: function () {
        player.body.velocity.y = 0;
    },
    l_down: function () {
        player.body.velocity.x = velocity;
    },
    l_up: function () {
        player.body.velocity.x = 0;
    },

    update: function () {


        if (map.key != "lesson53") {
        var cposx = Math.floor(player.x / 64);
        var cposy = Math.floor(player.y / 64);
        if (cposx != Pegman.dposX || cposy != Pegman.dposY) {
            Pegman.dposX = cposx;
            Pegman.dposY = cposy;
            updateFog.dispatch();
        }
    }




        this.game.physics.arcade.collide(player, sinkLayer);
        this.game.physics.arcade.collide(player, flour);
        this.game.physics.arcade.collide(player, blockLayer);


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




    },
    // render: function () {
    //     this.game.debug.bodyInfo(player, 32, 32);
    //     this.game.debug.body(player);
    // },
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

};

function hitEvent() {
    if (!hitflag) {
        console.log("hit");
        player.body.enable = false;
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
        player.body.enable = false;
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

function normalize(x, y) {
    var cTile;
    cTile = map.getTile(x - 1, y - 1, fog);
    if (cTile) {
        a11 = cTile.index == 244 ? 0 : 1
    } else {
        a11 = 1
    }
    cTile = map.getTile(x, y - 1, fog);
    if (cTile) {
        a12 = cTile.index == 244 ? 0 : 1
    } else {
        a12 = 1
    }
    cTile = map.getTile(x + 1, y - 1, fog);
    if (cTile) {
        a13 = cTile.index == 244 ? 0 : 1
    } else {
        a13 = 1
    }

    cTile = map.getTile(x - 1, y, fog);
    if (cTile) {
        a21 = cTile.index == 244 ? 0 : 1
    } else {
        a21 = 1
    }
    cTile = map.getTile(x, y, fog);
    if (cTile) {
        a22 = cTile.index == 244 ? 0 : 1
    } else {
        a22 = 1
    }
    cTile = map.getTile(x + 1, y, fog);
    if (cTile) {
        a23 = cTile.index == 244 ? 0 : 1
    } else {
        a23 = 1
    }

    cTile = map.getTile(x - 1, y + 1, fog);
    if (cTile) {
        a31 = cTile.index == 244 ? 0 : 1
    } else {
        a31 = 1
    }
    cTile = map.getTile(x, y + 1, fog);
    if (cTile) {
        a32 = cTile.index == 244 ? 0 : 1
    } else {
        a32 = 1
    }
    cTile = map.getTile(x + 1, y + 1, fog);
    if (cTile) {
        a33 = cTile.index == 244 ? 0 : 1
    } else {
        a33 = 1
    }
    if (a22 == '0' || a11 + a12 + a13 + a21 + a23 + a31 + a32 + a33 <= 2 || (!a12 && !a32) || (!a21 && !a23)) {
        return 244;
    } else if (a11 + a12 + a21 + a22 == 4 && (!a13 || !a23) && (!a31 || !a32)) {
        return 218;
    } else if (a12 + a13 + a22 + a23 == 4 && (!a11 || !a21) && (!a32 || !a33)) {
        return 218;
    } else if (a22 + a23 + a32 + a33 == 4 && (!a12 || !a13) && (!a21 || !a31)) {
        return 218;
    } else if (a21 + a22 + a31 + a32 == 4 && (!a11 || !a12) && (!a23 || !a33)) {
        return 218;
    } else {
        return Maze.tile_SHAPES[String(a11) + String(a12) + String(a13) + String(a21) + String(a22) + String(a23) + String(a31) + String(a32) + String(a33)];
    }
}


Maze.tile_SHAPES = {

    '111111110': 229,
    '111111011': 230,
    '011111111': 243,
    '110111111': 242,

    '111111101': 245,
    '111111100': 245,
    '111111001': 245,
    '111111000': 245,
    '111111010': 245,

    '111011111': 231,
    '111011011': 231,
    '011011111': 231,
    '011011011': 231,
    '011111011': 231,

    '101111111': 219,
    '100111111': 219,
    '001111111': 219,
    '000111111': 219,
    '010111111': 219,

    '111110111': 233,
    '110110111': 233,
    '111110110': 233,
    '110110110': 233,
    '110111110': 233,

    '110111011': 218,
    '011111110': 218,

};



function load_scene(scene) {

    if (scene == 1) {
        var result = findObjectsByType('scene1Goal', map, 'playerLayer');
        pointer.x = result[0].x;
        pointer.y = result[0].y;
    }
    else if (scene == 2) {
        var result = findObjectsByType('scene2Goal', map, 'playerLayer');
        pointer.x = result[0].x;
        pointer.y = result[0].y;
    }
    else if (scene == 3) {
        var result = findObjectsByType('scene3Goal', map, 'playerLayer');
        pointer.x = result[0].x;
        pointer.y = result[0].y;
    } else if (scene == 0) {
        
    }

Pegman.reset2();
}


function loadmap(name) {
    try {player.body.enable = false; } catch {}
    
    TopDownGame.game.camera.flash(0x000000, 1000);

    try {
        map.destroy();
        flour.destroy();
        onFlour.destroy();
        blockLayer.destroy();
        onBlockLayer.destroy();
        sinkLayer.destroy();
        upperLayer.destroy();
        fog.destroy();

    } catch { }


    map = TopDownGame.game.add.tilemap(name); //add tileset image     
    map.addTilesetImage('tileSheetWinter', 'gameTiles');
    flour = map.createLayer('flour');
    onFlour = map.createLayer('onFlour');
    sinkLayer = map.createLayer('sinkLayer');
    blockLayer = map.createLayer('blockLayer');
    onBlockLayer = map.createLayer('onBlockLayer');
    
    var result = findObjectsByType('playerStartPosition', map, 'playerLayer');
    // player.x = result[0].x;
    // player.y = result[0].y;
    lastSuccessfullPosition.x = result[0].x;
    lastSuccessfullPosition.y = result[0].y;
    try {Pegman.reset2(); } catch {}

    //Copied from reset button code. Resets html button


    sinkLayer = map.createLayer('sinkLayer');
    map.setTileIndexCallback([...Array(500).keys()], sinkInWater, this, sinkLayer);
    map.setTileIndexCallback([...Array(500).keys()], hitEvent, this, blockLayer);
    

    upperLayer = map.createLayer('upperLayer');
    
    if (map.key != "lesson53") {
        fog = map.createLayer('fog');
        
    }
 

    TopDownGame.game.time.events.add(500, fadePicture, this);



    function fadePicture() {
        // загнал сюда, потому что глюк возникает когда плеер не успевает успеть
 
        
    }
    //scene1Goal

    try {
        TopDownGame.game.world.bringToTop(pointer);

        TopDownGame.game.world.bringToTop(explosion);


        TopDownGame.game.world.bringToTop(player);
    } catch { }

}
var TopDownGame = TopDownGame || {};

var builddust;
var player;
var cp;
var flag = false;
var setblocks;
var tilestodraw = [];
var scene;
var map;
var drawLayer;
Pegman.dposX = 11;
Pegman.dposY = 7;
var explosionSound = null;
var hitWallSound = null;
var bubbleSound = null;
var keyPickUpSound = null;
var clickSound = null;
//var data;
var crosses;
var tileid_pairs = {
    260: 13,
    261: 26,
    262: 39,
    263: 1,
    264: 2,
    265: 5,
    266: 55,
    267: 133,
    268: 31,
    269: 18
};
var startPositions = {
    'lesson31': [8, 10],
    'lesson32': [13, 9],
    'lesson33': [16, 11],
    'lesson34': [13, 5],
    'lesson35': [11, 10],
    'lesson36': [10, 9],


};
var lastSuccessfullPosition = {
    x: Maze.SQUARE_SIZE * (startPositions['lesson31'][0] + 0.5),
    y: Maze.SQUARE_SIZE * (startPositions['lesson31'][1] + 0.5)
}; //хранит положение какое было у спрайта когда он в последний раз соверлаппился с целью
//title screen
TopDownGame.Lesson3 = function() {};
TopDownGame.Lesson3.prototype = {
    create: function() {


        this.shotSound = this.game.add.audio('shot');
        this.successSound = this.game.add.audio('success');
        this.fillSound = this.game.add.audio('fill');
        explosionSound = this.game.add.audio("explosion");
        hitWallSound = this.game.add.audio('hitwall');
        bubbleSound = this.game.add.audio('bubble');
        keyPickUpSound = this.game.add.audio('keypickup');
        clickSound = this.game.add.audio('click');

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        sl1 = this.input.keyboard.addKey(Phaser.KeyCode.A);
        sl2 = this.input.keyboard.addKey(Phaser.KeyCode.S);
        sl3 = this.input.keyboard.addKey(Phaser.KeyCode.D);
        sl4 = this.input.keyboard.addKey(Phaser.KeyCode.F);
        sl5 = this.input.keyboard.addKey(Phaser.KeyCode.G);
        sl6 = this.input.keyboard.addKey(Phaser.KeyCode.H);

        if (scene === undefined || scene === null) {
            scene = 1;
        }
        


        //buildAnimation

        change_map('lesson3' + scene);


        crosses = this.game.add.group();

        player = this.game.add.sprite(0, 0, 'totalsheet', Pegman.selected_tileid);
        player.tint = 0xAADDDD;
        player.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(player);
        player.body.collideWorldBounds=true;
        player.body.setSize(60, 13, 40, 73);
        flour.resizeWorld();
        
        Pegman.init(player, this);

        builddust = this.game.add.sprite(0, 0, 'build');
        builddust.visible = false;
        builddust.animations.add('BUILD', [0, 1, 2, 3, 4, 5], 20, false);
        //built_anim.onComplete.add(this.animationStopped, this);


        player.alpha = 0;
        this.game.add.tween(player).to({
            alpha: 1
        }, 500, Phaser.Easing.Cubic.InOut, true, 0, -1, true);

        //the camera will follow the player in the world
        this.game.camera.follow(player);
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        TopDownGame.game.camera.flash(0x000000, 500);


    },

    update: function() {

        if (this.cursors.up.isDown) {
            this.game.camera.unfollow();
            this.game.camera.y -= cameraSpeed;
        }
        else if (this.cursors.down.isDown) {
            this.game.camera.unfollow();
            this.game.camera.y += cameraSpeed;
        }

        if (this.cursors.left.isDown) {
            this.game.camera.unfollow();
            this.game.camera.x -= cameraSpeed;
        }
        else if (this.cursors.right.isDown) {
            this.game.camera.unfollow();
            this.game.camera.x += cameraSpeed;
        }

/*         if (sl1.isDown) {
            scene = 1;
            change_map('lesson3' + scene);
            Pegman.reset2();
        }
        if (sl2.isDown) {
            scene = 2;
            change_map('lesson3' + scene);
            Pegman.reset2();
        }
        if (sl3.isDown) {
            scene = 3;
            change_map('lesson3' + scene);
            Pegman.reset2();
        }
        if (sl4.isDown) {
            scene = 4;
            change_map('lesson3' + scene);
            Pegman.reset2();
        }
        if (sl5.isDown) {
            scene = 5;
            change_map('lesson3' + scene);
            Pegman.reset2();
        }
        if (sl6.isDown) {
            scene = 6;
            change_map('lesson3' + scene);
            Pegman.reset2();
        } */
        //  this.game.debug.body(player);
        // this.game.debug.physicsGroup(barrels);
        // this.game.debug.bodyInfo(player, 32, 50);
    },
    /*    animationStopped: function(sprite, animation) {
            builddust.visible = false;
        },*/
};



function change_map(name) {

    Blockly.mainWorkspace.clear();
    Blockly.mainWorkspace.clearUndo();
    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);

    try {
        map.destroy();
        flour.destroy();
        blockLayer.destroy();
        onBlockLayer.destroy();
        drawLayer.destroy();
    } catch (e) {

    }

    map = TopDownGame.game.add.tilemap(name); //add tileset image     
    map.addTilesetImage('tileSheets01-10', 'gameTiles');
    flour = map.createLayer('flour');
    blockLayer = map.createLayer('blockLayer');
    onBlockLayer = map.createLayer('onBlockLayer');
    drawLayer = map.createLayer('drawLayer');

    try {
        TopDownGame.game.world.bringToTop(builddust);
        TopDownGame.game.world.bringToTop(crosses);
        TopDownGame.game.world.bringToTop(player);


        Pegman.selected_tileid = 1;
        Pegman.pegmanSprite.frame = Pegman.selected_tileid;
    } catch (e) {

    }
    cp = TopDownGame.game.add.sprite(0, 0, 'coordinateplane');
    tilestodraw = [];
    for (var y = 0; y < map.height; ++y) {
        for (var x = 0; x < map.width; ++x) {
            var tile = map.getTile(x, y, drawLayer);
            if (tile) {
                tilestodraw.push({
                    x: x,
                    y: y,
                    id: tile.index
                });
            }
        }
    }
    lastSuccessfullPosition.x = Maze.SQUARE_SIZE * (startPositions[name][0] + 0.5);
    lastSuccessfullPosition.y = Maze.SQUARE_SIZE * (startPositions[name][1] + 0.5);



    if (scene == 1 || scene == 2) {
        //cp.visible = true;

        var newTree = `
    <xml id="toolbox" style="display: none; background-color: #4d90fe;">
        <block type="changex"></block>
        <block type="changey"></block>
        <block type="changeskin"></block>
        <block type="build"></block>
    </xml>`;
    } else if (scene == 3 || scene == 4) {
        //cp.visible = true;
        var newTree = `
    <xml id="toolbox" style="display: none; background-color: #4d90fe;">
        <block type="setx"></block>
        <block type="sety"></block>
        <block type="changeskin"></block>
        <block type="build"></block>
    </xml>`;
    } else if (scene == 5 || scene == 6) {
        //cp.visible = true;
        var newTree = `
    <xml id="toolbox" style="display: none; background-color: #4d90fe;">
        <block type="setxy"></block>
        <block type="changeskin"></block>
        <block type="build"></block>
    </xml>`;
    }

    workspace.updateToolbox(newTree);
    



}

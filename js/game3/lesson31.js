var TopDownGame = TopDownGame || {};
var player;

var flag = false;

var tilestodraw = [];

var map;
var drawLayer;
Pegman.dposX = 12;
Pegman.dposY = 7;

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

var lastSuccessfullPosition = {
    x: Maze.SQUARE_SIZE * (Pegman.dposX + 0.5),
    y: Maze.SQUARE_SIZE * (Pegman.dposY + 0.5)
}; //хранит положение какое было у спрайта когда он в последний раз соверлаппился с целью
//title screen
TopDownGame.Lesson31 = function() {};
TopDownGame.Lesson31.prototype = {
    create: function() {

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        map = this.game.add.tilemap('lesson31');
        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        map.addTilesetImage('tileSheets', 'gameTiles');

        //create layers
        this.flour = map.createLayer('flour');
        this.blockLayer = map.createLayer('blockLayer');
        this.onBlockLayer = map.createLayer('onBlockLayer');
        drawLayer = map.createLayer('drawLayer');

        //this.createItems();

        player = this.game.add.sprite(0, 0, 'totalsheet', Pegman.selected_tileid);

        player.anchor.setTo(0.5, 0.5);

        this.game.physics.arcade.enable(player);
        //this.game.physics.arcade.enable(pointer);
        player.body.setSize(60, 13, 40, 73);

        //collision on blockedLayer

        //map.setTileIndexCallback([...Array(500).keys()], this.hitWall, this, 'blockLayer');
        //map.setTileIndexCallback([17, 18, 30, 31], this.hitWall, this, this.blockLayer);
        //map.setCollisionBetween(1, 4000, true, 'blockLayer');
        //resizes the game world to match the layer dimensions
        this.flour.resizeWorld();
        Pegman.init(player);

        player.alpha = 0;

        this.game.add.tween(player).to({
            alpha: 1
        }, 500, Phaser.Easing.Cubic.InOut, true, 0, 500, true);

        //the camera will follow the player in the world
        this.game.camera.follow(player);
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        //console.log(map);

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
    },

    update: function() {

        player.body.velocity.x = 0;
        var velocity = 400;

        if (this.cursors.up.isDown) {
            if (player.body.velocity.y == 0)
                player.body.velocity.y -= velocity;

        } else if (this.cursors.down.isDown) {
            if (player.body.velocity.y == 0)
                player.body.velocity.y += velocity;

        } else {
            player.body.velocity.y = 0;
        }
        if (this.cursors.left.isDown) {
            player.body.velocity.x -= velocity;
        } else if (this.cursors.right.isDown) {
            player.body.velocity.x += velocity;
        }

        if (fireButton.isDown) {
            var tile = map.getTile(12, 6, drawLayer);
            tile.alpha = 1;

        }
        /*
                if (this.cursors.up.isDown) {
                    this.game.camera.y -= 4;
                } else if (this.cursors.down.isDown) {
                    this.game.camera.y += 4;
                }
                if (this.cursors.left.isDown) {
                    this.game.camera.x -= 4;
                } else if (this.cursors.right.isDown) {
                    this.game.camera.x += 4;
                }
        */
        // this.game.debug.body(player);
        // this.game.debug.physicsGroup(barrels);
        // this.game.debug.bodyInfo(player, 32, 50);

    },

    setTile: function(x, y) {
        var tile = map.getTile(x, y, this.drawLayer);
        if (tile) {
            console.log(tile);
            tile.alpha = 1;
        }

    }

};
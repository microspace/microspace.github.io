import 'phaser';

import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import {
    toogleRunButton
} from './helpers/utils';

/* import 'blockly/blockly_compressed.js'
import 'blockly/blocks_compressed.js'
import 'blockly/javascript_compressed.js'
import 'blockly/msg/js/ru.js' */



//simport tingle from 'tingle'
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: '100%',
        height: '100%'
    },
    autoResize: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    pixelArt: true,
    scene: [
        BootScene,
        GameScene
    ]
};

const game = new Phaser.Game(config);

$(function () {
    $('#play').click(() => toogleRunButton(game));
});





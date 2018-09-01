'use strict';

Blockly.Blocks['maze_moveForward'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'Вперёд',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'Maze_moveForwardTooltip'
        });
    }
};

Blockly.JavaScript['maze_moveForward'] = function(block) {
    // Generate JavaScript for moving forward.
    return 'Pegman.nextAction("forward");\n';
};




Blockly.Blocks['maze_turnLeft'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'Налево',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'Maze_turnLeftTooltip'
        });
    }
};

Blockly.JavaScript['maze_turnLeft'] = function(block) {
    // Generate JavaScript for moving forward.
    return 'Pegman.nextAction("right");\n';
};





Blockly.Blocks['maze_turnRight'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'Направо',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'maze_turnRightTooltip'
        });
    }
};

Blockly.JavaScript['maze_turnRight'] = function(block) {
    // Generate JavaScript for moving forward.
    return 'Pegman.nextAction("left");\n';
};






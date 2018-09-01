'use strict';

Blockly.Blocks['maze_up'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'Вверх %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'maze_turnRightTooltip',
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 2
            }]
        });
    }
};

Blockly.JavaScript['maze_up'] = function(block) {
    // Generate JavaScript for moving forward.
    var operator = block.getFieldValue('STEPCOUNT');
    return 'Pegman.nextAction("up", ' + operator + ');\n';
};




Blockly.Blocks['maze_down'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'Вниз %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'maze_turnRightTooltip',
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 2
            }]
        });
    }
};

Blockly.JavaScript['maze_down'] = function(block) {
    // Generate JavaScript for moving forward.
    var operator = block.getFieldValue('STEPCOUNT');
    return 'Pegman.nextAction("down", ' + operator + ');\n';
};





Blockly.Blocks['maze_right'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'Направо %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'maze_turnRightTooltip',
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 2
            }]
        });
    }
};

Blockly.JavaScript['maze_right'] = function(block) {
    // Generate JavaScript for moving forward.
    var operator = block.getFieldValue('STEPCOUNT');
    return 'Pegman.nextAction("right", ' + operator + ');\n';
};



Blockly.Blocks['maze_left'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'Налево %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'maze_turnRightTooltip',
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 2
            }]
        });
    }
};

Blockly.JavaScript['maze_left'] = function(block) {
    // Generate JavaScript for moving forward.
    var operator = block.getFieldValue('STEPCOUNT');
    return 'Pegman.nextAction("left", ' + operator + ');\n';
};
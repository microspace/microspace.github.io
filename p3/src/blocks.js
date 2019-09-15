'use strict';

Blockly.Blocks['factory_base'] = {

    init: function () {
        this.jsonInit({
            "type": "block_type",
            "message0": "Нажмите %1",
            "args0": [{
                "type": "field_image",
                "src": "assets/images/play_icon.png",
                "width": 17,
                "height": 17,
                "alt": "▶"
            }],
            "message1": "для запуска %1",
            "args1": [{
                "type": "input_statement",
                "name": "STACK"
            }],
            "colour": 120,
            "tooltip": "",
            "helpUrl": ""
        });
    }
};


Blockly.JavaScript['factory_base'] = function (block) {
    var statements_stack = Blockly.JavaScript.statementToCode(block, 'STACK');
    return statements_stack;
};


Blockly.Blocks['maze_up'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": 'Вверх %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'maze_turnRightTooltip',
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 1,

            }]
        });
    }
};

Blockly.JavaScript['maze_up'] = function (block) {
    // Generate JavaScript for moving forward.
    var operator = block.getFieldValue('STEPCOUNT');
    var code = `
    thisGame.player.schedule({
        name: "move",
        direction: "up",
        step: ${operator}
    });
    `
    return code;
};


Blockly.Blocks['maze_down'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": 'Вниз %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'maze_turnRightTooltip',
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 1
            }]
        });
    }
};

Blockly.JavaScript['maze_down'] = function (block) {
    // Generate JavaScript for moving forward.
    var operator = block.getFieldValue('STEPCOUNT');
    var code = `
    thisGame.player.schedule({
        name: "move",
        direction: "down",
        step: ${operator}
    });
    `
    return code;
};

Blockly.Blocks['maze_right'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": 'Направо %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'maze_turnRightTooltip',
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 1
            }]
        });
    }
};

Blockly.JavaScript['maze_right'] = function (block) {
    // Generate JavaScript for moving forward.
    var operator = block.getFieldValue('STEPCOUNT');
    var code = `
    thisGame.player.schedule({
        name: "move",
        direction: "right",
        step: ${operator}
    });
    `
    return code;
};

Blockly.Blocks['maze_left'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": 'Налево %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'maze_turnRightTooltip',
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 1
            }]
        });
    }
};

Blockly.JavaScript['maze_left'] = function (block) {
    // Generate JavaScript for moving forward.
    var operator = block.getFieldValue('STEPCOUNT');
    var code = `
    thisGame.player.schedule({
        name: "move",
        direction: "left",
        step: ${operator}
    });
    `
    return code;
};
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
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 1,

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
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 1
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
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 1
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
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 1
            }]
        });
    }
};

Blockly.JavaScript['maze_left'] = function(block) {
    // Generate JavaScript for moving forward.
    var operator = block.getFieldValue('STEPCOUNT');
    return 'Pegman.nextAction("left", ' + operator + ');\n';
};


Blockly.Blocks['fire'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'Огонь!',
            "previousStatement": null,
            "nextStatement": null,
            "colour": 0,
            "tooltip": 'Выстрел'
        });
    }
};

Blockly.JavaScript['fire'] = function(block) {
    // Generate JavaScript for moving forward.
    return 'Pegman.nextAction("fire");\n';
};



Blockly.Blocks['factory_base'] = {

    init: function() {
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
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        });
    }
};


Blockly.JavaScript['factory_base'] = function(block) {
    var statements_stack = Blockly.JavaScript.statementToCode(block, 'STACK');
    return statements_stack;
};




Blockly.Blocks['floatto'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "type": "floatto",
            "message0": "Плыть%1 секунду в точку x:%2 y:%3",
            "args0": [{
                    "type": "field_number",
                    "name": "seconds",
                    "value": 3,
                    "min": 2,
                    "max": 20
                },

                {
                    "type": "field_number",
                    "name": "tox",
                    "value": 0,
                    "min": -20,
                    "max": 20
                },

                {
                    "type": "field_number",
                    "name": "toy",
                    "value": 0,
                    "min": -20,
                    "max": 20
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "Плыть в точку на карте в течение определенного времени. Остерегайся препятствий!",
            "helpUrl": ""
        });
    }
};

Blockly.JavaScript['floatto'] = function(block) {
    var number_seconds = block.getFieldValue('seconds');
    var number_tox = block.getFieldValue('tox');
    var number_toy = block.getFieldValue('toy');

    return 'Pegman.nextAction("nswe", ' + number_seconds + ', ' + number_tox + ', ' + number_toy + ');\n';
};


Blockly.Blocks['changeskin'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'сменить костюм на %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'Сменить костюм',
            "colour": 160,
            "args0": [{
                "type": "field_dropdown",
                "name": "TILES",
                "options": [
                    [{
                        "src": "assets/images/tile_id1.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id1"
                    }, "1"],
                    [{
                        "src": "assets/images/tile_id2.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id2"
                    }, "2"],
                    [{
                        "src": "assets/images/tile_id5.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id5"
                    }, "5"]
                ]

            }]
        });
    }
};

Blockly.JavaScript['changeskin'] = function(block) {
    // Сгенерировать код для смены костюма
    var tile_id = block.getFieldValue('TILES');
    //console.log('Pegman.nextAction("changeskin", ' + tile_id + ');\n');
    return 'Pegman.nextAction("changeskin", ' + tile_id + ');\n';



};


Blockly.Blocks['changex'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'Изменить х на %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'Увеличить или уменьшить координату',
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "dx",
                "value": 1,
                "min": -20,
                "max": 20
            }]
        });
    }
};

Blockly.JavaScript['changex'] = function(block) {
    // Generate JavaScript for moving forward.
    var dx = block.getFieldValue('dx');
    var number_seconds = dx;
    return 'Pegman.nextAction("changex", ' + number_seconds + ', ' + dx + ', ' + 0 + ');\n';
};


Blockly.Blocks['changey'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'Изменить y на %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'Увеличить или уменьшить координату',
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "dy",
                "value": 1,
                "min": -20,
                "max": 20
            }]
        });
    }
};

Blockly.JavaScript['changey'] = function(block) {
    // Generate JavaScript for moving forward.
    var dy = block.getFieldValue('dy');
    var number_seconds = dy;
    return 'Pegman.nextAction("changey", ' + number_seconds + ', ' + 0 + ', ' + dy + ');\n';
};




Blockly.Blocks['build'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'Построить',
            "previousStatement": null,
            "nextStatement": null,
            "colour": 0,
            "tooltip": 'Устанавливает выделенный блок на карту'
        });
    }
};

Blockly.JavaScript['build'] = function(block) {
    // Generate JavaScript for moving forward.
    return 'Pegman.nextAction("build");\n';
};
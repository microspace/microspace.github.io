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
                        "src": "assets/images/build/tileid_02.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id2"
                    }, "1"],
                    [{
                        "src": "assets/images/build/tileid_03.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id3"
                    }, "2"],
                    [{
                        "src": "assets/images/build/tileid_06.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id6"
                    }, "5"],
                    [{
                        "src": "assets/images/build/tileid_14.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id14"
                    }, "13"],
                    [{
                        "src": "assets/images/build/tileid_19.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id19"
                    }, "18"],
                    [{
                        "src": "assets/images/build/tileid_27.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id27"
                    }, "26"],
                    [{
                        "src": "assets/images/build/tileid_32.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id32"
                    }, "31"],
                    [{
                        "src": "assets/images/build/tileid_40.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id40"
                    }, "39"],
                    [{
                        "src": "assets/images/build/tileid_56.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id56"
                    }, "55"],
                    [{
                        "src": "assets/images/build/tileid_134.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id134"
                    }, "133"],
                ]

            }]
        });
    }
};

Blockly.JavaScript['changeskin'] = function(block) {
    // Сгенерировать код для смены костюма
    var tile_id = block.getFieldValue('TILES');
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
    var number_seconds = Math.abs(dx);
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
    var number_seconds = Math.abs(dy);
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


Blockly.Blocks['setx'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'Установить x в %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'Перейти в х координату',
            "colour": 60,
            "args0": [{
                "type": "field_number",
                "name": "setx",
                "value": 1,
                "min": -20,
                "max": 20
            }]
        });
    }
};

Blockly.JavaScript['setx'] = function(block) {
    // Generate JavaScript for moving forward.
    var setx = block.getFieldValue('setx');
    return 'Pegman.nextAction("setx", ' + 1 + ', ' + setx + ', ' + Pegman.dposY + ');\n';
};


Blockly.Blocks['sety'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'Установить y в %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'Перейти в х координату',
            "colour": 60,
            "args0": [{
                "type": "field_number",
                "name": "sety",
                "value": 1,
                "min": -20,
                "max": 20
            }]
        });
    }
};

Blockly.JavaScript['sety'] = function(block) {
    // Generate JavaScript for moving forward.
    var sety = block.getFieldValue('sety');
    return 'Pegman.nextAction("sety", ' + 1 + ', ' + Pegman.dposX + ', ' + sety + ');\n';
};



Blockly.Blocks['setxy'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'перейти в х: %1 у: %2',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'Перейти в х координату',
            "colour": 60,
            "args0": [{
                "type": "field_number",
                "name": "setx",
                "value": 1,
                "min": -20,
                "max": 20
            }, {
                "type": "field_number",
                "name": "sety",
                "value": 1,
                "min": -20,
                "max": 20
            }]
        });
    }
};

Blockly.JavaScript['setxy'] = function(block) {
    // Generate JavaScript for moving forward.
    var setx = block.getFieldValue('setx');
    var sety = block.getFieldValue('sety');
    return 'Pegman.nextAction("setxy", ' + 1 + ', ' + setx + ', ' + sety + ');\n';
};



Blockly.Blocks['repeat_n_times'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
           
            "message0": "Повтори %1 раз",
            "args0": [
                {
                    "type": "field_number",
                    "name": "times",
                    "value": 4
                  }
            ],
            "message1": "выполнить %1",
            "args1": [
              {"type": "input_statement", "name": "DO"}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 120
          });
    }
};
var i = 0;
Blockly.JavaScript['repeat_n_times'] = function(block) {
    // Generate JavaScript for moving forward.
    var stc = Blockly.JavaScript.statementToCode(block, 'DO');
    var times = block.getFieldValue('times');
    i++;
    var vn = 'ip' + i;

    return 'for (var ' + vn + ' = 0; ' + vn + ' < ' + times + ';  ' + vn + '++){\n'+ stc +'\n}\n';
};








Blockly.Blocks['uturn'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": 'Разворот',
            "previousStatement": null,
            "nextStatement": null,
            "colour": 100,
            "tooltip": 'Развернуться на месте кругом!'
        });
    }
};

Blockly.JavaScript['uturn'] = function(block) {
    // Generate JavaScript for moving forward.
    return 'Pegman.nextAction("uturn");\n';
};